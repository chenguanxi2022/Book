const Router = require('@koa/router');
const mongoose = require('mongoose');

const { getBody } = require("../../utils")
const { getPwd } = require("../../config")

const User = mongoose.model('User')

const router = new Router({
  prefix: '/user'
})

// 查询账户信息
router.get('/list', async(ctx) => {
  let { page, size, keyWord } = ctx.query
  
  page = Number(page)
  size = Number(size)

  const query = {}
  if(keyWord) {
    query.account = keyWord
  }

  const list = await User.find(query).sort({_id:-1}).skip((page - 1) * size).limit(size).exec()

  const total = await User.countDocuments()

  ctx.body = {
    data: {
      list,
      total,
      page,
      size
    },
    code: 1,
    msg: "获取列表成功"
  }
  
})

// 删除
router.delete('/:id',async (ctx) => {
  const { id } = ctx.params

  const res = await User.deleteOne({
    _id: id
  }).exec()

  ctx.body = {
    data: res,
    msg: "删除成功",
    code: 1
  }
})

// 添加
router.post('/add', async(ctx) => {
  const { account, password } = getBody(ctx)

  const user = new User({
    account,
    password: password || '12345'
  })

  const res = await user.save()

  ctx.body = {
    data: res,
    msg: "添加成功",
    code: 1
  }
})

// 重置密码
router.post('/reset/password', async(ctx) => {
  const { id } = getBody(ctx)

  const one = await User.findOne({_id:id}).exec()

  if(!one) {
    ctx.body = {
      code: 0,
      data: null,
      msg: "查无此账户"
    }
    return;
  }

  one.password = getPwd()

  await one.save()

  const res = await one.save()

  ctx.body = {
    msg: '修改成功',
    data: {
      account: res.account,
      _id: res._id,
    },
    code: 1
  }
})

module.exports = router