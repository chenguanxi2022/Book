const Router = require("@koa/router")
const mongoose = require("mongoose")

const ForgetPassword = mongoose.model("ForgetPassword")
const User = mongoose.model("User")

const { getBody } = require("../../utils")
const { getPwd } = require("../../config")

const router = new Router({
  prefix: '/forgetPassword'
})

router.get('/list', async(ctx) => {
  let { page, size } = ctx.request.query

  page = Number(page)
  size = Number(size)

  const total = await ForgetPassword.find({status: 1}).countDocuments().exec()

  const list = await ForgetPassword.find({
    status: 1
  }).skip((page - 1) * size).limit(size).exec()

  ctx.body = {
    data: {
      list,
      page,
      size,
      total
    },
    msg: "获取成功",
    code: 1
  }
})

router.post('/add', async(ctx) => {
  const { account } = getBody(ctx)

  // 1.是否存在  2.是否状态为 1
  const user = await User.findOne({
    account
  }).exec()

  if(!user) {
    ctx.body = {
      data: null,
      code: 0,
      msg: "申请成功了"
    }
    return;
  }

  // 在 ForgetPassword 中是否存在 status 为 1
  const one = await ForgetPassword.findOne({
    account,
    status: 1
  }).exec()

  if(one) {
    ctx.body = {
      data: null,
      code: 0,
      msg: "申请成功了"
    }
    return;
  }

  const forgetPwd = new ForgetPassword({
    account,
    status: 1
  })

  await forgetPwd.save()

  ctx.body = {
    code: 1,
    msg: "申请成功了"
  }
})

router.post('/update/status', async(ctx) => {
  const { id, status } = getBody(ctx)

  const one = await ForgetPassword.findOne({
    _id: id,
  })

  if(!one) {
    ctx.body = {
      msg: '找不到这条申请',
      code: 0
    }
    return;
  }

  one.status = status;

  if(one.status === 2) {
    const user = await User.findOne({
      account: one.account
    }).exec()

    if(user) {
      user.password = getPwd()
      await user.save()
    }
  }

  await one.save()

  ctx.body = {
    code: 1,
    msg: "处理成功"
  }
})

module.exports = router