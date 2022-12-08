const koa = require('koa')

const { koaBody } = require('koa-body')
const connect = require('./db')
const registerRouter = require('./router')
const { middleWare: JwtMiddleWare, cacheTokenError} = require("./token")
const { diaryMiddleWare } = require("./diary")
const cors = require('@koa/cors')

const app = new koa()

connect().then(() => {
  // cors 跨域
  app.use(cors())

  // router 前使用 koaBody()
  app.use(koaBody({
    // 支持文件上传
    multipart: true,
    // 尺寸大小
    formidable: {
      // 文件最大内存
      maxFileSize: 200 * 1024 * 200
      // 200M
    }
  }))
  
  app.use(cacheTokenError)
  // koa-jwt 鉴权
  JwtMiddleWare(app)

  // diary 中间件
  app.use(diaryMiddleWare)

  registerRouter(app)

  app.listen(3000,() => {
    console.log('服务启动成功')
  })
})