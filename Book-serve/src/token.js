const jwt = require("jsonwebtoken");
const { getKey } = require("./config");
const koaJwt = require("koa-jwt");

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
]
  }))
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
  getToken,middleWare,cacheTokenError
}