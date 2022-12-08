const jwt = require("jsonwebtoken");
const { getKey } = require("./config");
const koaJwt = require("koa-jwt");

const mongoose = require("mongoose");
const User = mongoose.model("User");

const getToken = (ctx) => {
  let { authorization } = ctx.header;

  authorization = authorization.replace("Bearer ","").replace("bearer ","")

  return authorization;
}

const verify = (token) => {
  return new Promise((resolve,reject) => {
    jwt.verify(token, getKey(),(err,payload) => {
      if(err) {
        reject(err);
        return;
      }

      resolve(payload);
    })
  })
}

// koa-jwt 鉴权
const middleWare = (app) => {
  app.use(koaJwt({
    secret: getKey()
  }).unless({
    path: [
      /^\/auth\/login/,
      /^\/auth\/register/,
      /^\/forgetPassword\/add/,
]
  }))
}

// response 401
const res401 = (ctx) => {
  ctx.status = 401,
  ctx.body = {
    code: 0,
    msg: "用户校验失败"
  }
}

// 检查用户 中间件
const checkUser = async(ctx, next) => {
  const { path } = ctx
  if (path === '/auth/login' || path === '/auth/register' || path === '/forgetPassword/add') {
    await next()
    return;
  }

  const { _id, account, character } = await verify(getToken(ctx))
  
  const user = await User.findOne({
    _id,
  }).exec()

  if(!user) {
    res401(ctx);
    return;
  }
  if(user.account !== account) {
    res401(ctx);
    return;
  }
  if(user.character !== character) {
    res401(ctx);
    return;
  }

  await next()
}

// 拦截 koa-jwt 错误中间件
const cacheTokenError = async(ctx, next) => {
  return next().catch((error) => {
    if(error.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        msg: 'token error',
      };
    } else {
      throw error;
    }
  })
}

module.exports = {
  verify,
  getToken,middleWare,cacheTokenError,
  checkUser
}