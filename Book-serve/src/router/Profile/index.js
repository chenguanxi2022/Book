const Router = require("@koa/router")
const mongoose = require("mongoose")

const User = mongoose.model("User")

const { getBody } = require("../../utils")
const { verify, getToken } = require("../../token")

const router = new Router({
  prefix: "/profile",
})

router.post('/update/password', async(ctx) => {
  const { password, oldPwd } = getBody(ctx)

  const {_id} = await verify(getToken(ctx))

  const user = await User.findOne({
    _id
  }).exec()

  // 用户不存在
  if(!user) {
    ctx.body = {
      code: 0,
      msg: "用户不存在",
      data: null
    }
    return;
  }
 
  // 密码校验失败
  if(user.password !== oldPwd) {
    ctx.body = {
      code: 0,
      msg: "密码校验失败",
      data: null
    }
    return;
  }

  user.password = password;
  await user.save();

  ctx.body = {
    code: 1,
    msg: "修改成功"
  }
})

module.exports = router