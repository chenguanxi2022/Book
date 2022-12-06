const router = require('@koa/router')
const moogoose = require('mongoose')
// const { getBody } = require('../../utils')
const { v4: uuid } = require('uuid');
const { getBody } = require('../../utils');

const InviteCode = moogoose.model('InviteCode')

const InviteRouter = new router({
  prefix: '/invite'
})

// 添加邀请码
InviteRouter.post('/add',async (ctx) => {

  const { count = 1 } = getBody(ctx)

  const arr = []

  for(let i = 0; i < count; i++) {
    arr.push({
      code: uuid(),
      // user 首先为空
      user: ''
    })
  }

  // 写入 mongoDB
  const res = await InviteCode.insertMany(arr)

  // 响应体
  ctx.body = {
    code: 1,
    msg: '创建成功',
    data: res
  }
})

InviteRouter.get('/list', async(ctx) => {
  let { page, size } = ctx.request.query

  page = Number(page)
  size = Number(size)

  const list = await InviteCode.find().sort({_id:-1}).skip((page - 1) * size).limit(size).exec()

  const total = await InviteCode.countDocuments().exec()

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

InviteRouter.delete('/:id', async(ctx) => {
  const { id } = ctx.params

  const invite = InviteCode.deleteOne({
    _id:id
  }).exec()

  ctx.body = {
    msg: "删除成功",
    data: invite,
    code: 1
  }
})

module.exports = InviteRouter