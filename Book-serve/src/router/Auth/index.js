const router = require('@koa/router')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const { getKey } = require('../../config')

const { getBody } = require('../../utils')

const User = mongoose.model('User')
const InviteCode = mongoose.model('InviteCode')

const Authrouter = new router({
  prefix:'/auth'
})

// 注册
Authrouter.post('/register',async (ctx) => {
  const { account, password, inviteCode } = getBody(ctx)

  // 判断是否为空
  if(account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null
    }
    return
  }
  // 去数据库中查找 inviteCode
  const codeFind = await InviteCode.findOne({
    inviteCode
  }).exec()
  // 判断邀请码是否存在，以及 user 是否存在
  if(!codeFind || codeFind.user) {
    ctx.body = {
      code: 0,
      msg: '邀请码无效',
      data: null
    }
    return;
  }

  // 去数据库中查找 account
  const userFind = await User.findOne({
    account
  }).exec()
  // exec 使用正则表达式查找

  // 存在该用户
  if(userFind) {
    ctx.body = {
      code: 0,
      msg: '已存在该用户',
      data: null
    }
    // 记得 return 出去
    return
  }

  // mongoDB 的 model
  const user = new User({
    account,
    password
  })

  // 数据同步 moogoDB
  const res = await user.save()

  // 将邀请码与用户ID 绑定
  codeFind.user = res._id
  codeFind.meta.updatedAt = new Date().getTime()

  // 同步数据
  await codeFind.save()

  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }
})

// 登陆
Authrouter.post('/login',async (ctx) => {
  const { account,password } = getBody(ctx)

  // 判断是否为空
  if(account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null
    }
    // return 出去
    return
  }

  // 去数据库中查找 account
  const userFind = await User.findOne({
    account
  }).exec()
  
  // 如果不存在
  if(!userFind) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data:null
    }
    return
  }
  
  // 保存 account + _id
  const user = {
    account: userFind.account,
    _id: userFind._id
  }

  // 存在且密码正确
  if(userFind.password==password) {
    ctx.body = {
      code: 1,
      msg: '登陆成功',
      data: {
        data: user,
        token: jwt.sign(user,getKey())
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null
    }
  }
})

module.exports = Authrouter