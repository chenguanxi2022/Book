const Router = require("@koa/router");
const mongoose = require("mongoose");

const { getBody } = require("../../utils");

const Character = mongoose.model("Character");
const User = mongoose.model("User");

const router = new Router({
  prefix: '/character'
})

router.get('/list', async (ctx) => {
  const list = await Character.find().exec()

  ctx.body = {
    data: list,
    msg: '获取列表成功',
    code: 1
  }
})

router.post('/update', async(ctx) => {
  const { character, userId } = getBody(ctx)

  const char = Character.findOne({
    _id: character
  }).exec()

  // 查看库中是否存在
  if(!char) {
    ctx.body = {
      code: 0,
      data: null,
      msg: "出错了"
    }
    return;
  }

  const user = await User.findOne({
    _id: userId
  }).exec()

  if(!user) {
    ctx.body = {
      code: 0,
      data: null,
      msg: "出错了"
    }
    return;
  }

  user.character = character

  const res = await user.save()

  ctx.body = {
    data: res,
    msg: "修改成功",
    code: 1
  }
})

module.exports = router