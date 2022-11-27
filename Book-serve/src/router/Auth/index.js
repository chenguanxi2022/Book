const router = require('@koa/router')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const { getKey } = require('../../config')

const { getBody } = require('../../utils')

const User = mongoose.model('User')

const Authrouter = new router({
  prefix:'/auth'
})

Authrouter.post('/register',async (ctx) => {
  const { account, password } = getBody(ctx)

  // 判断是否为空
  if(account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null
    }
    return
  }
  // 去数据库中查找
  const one = await User.findOne({
    account
  }).exec()
  // exec 使用正则表达式查找

  if(one) {
    ctx.body = {
      code: 0,
      msg: '已存在该用户',
      data: null
    }
    // 记得 return 出去
    return
  }

  const user = new User({
    account,
    password
  })

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }
})

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

  // 去数据库中查找
  const one = await User.findOne({
    account
  }).exec()
  
  // 如果不存在
  if(!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data:null
    }
    return
  }
  
  // 保存 account + _id
  const user = {
    account: one.account,
    _id: one._id
  }

  // 存在且密码正确
  if(one.password==password) {
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