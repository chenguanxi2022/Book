const koa = require('koa')

const { koaBody } = require('koa-body')
const cors = require('@koa/cors')
const { middleWare: JwtMiddleWare, cacheTokenError} = require("./token")

const app = new koa()

const connect = require('./db')
const registerRouter = require('./router')

connect().then(() => {
  // cors 跨域
  app.use(cors())

  // router 前使用 koaBody()
  app.use(koaBody())
  
  app.use(cacheTokenError)
  // koa-jwt 鉴权
  JwtMiddleWare(app)

  registerRouter(app)

  app.listen(3000,() => {
    console.log('服务启动成功')
  })
})