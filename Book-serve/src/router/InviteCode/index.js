const router = require('@koa/router')
const moogoose = require('mongoose')
// const { getBody } = require('../../utils')
const { v4: uuid } = require('uuid');

const InviteCode = moogoose.model('InviteCode')

const InviteRouter = new router({
  prefix: '/invite'
})

// 添加邀请码
InviteRouter.get('/add',async (ctx) => {
  const code = new InviteCode({
    code: uuid(),
    // user 首先为空
    user: ''
  })

  // 写入 mongoDB
  const saved = await code.save()

  // 响应体
  ctx.body = {
    code: 1,
    msg: '创建成功',
    data: saved
  }
})

module.exports = InviteRouter