const Router = require("@koa/router")
// const mongoose = require('mongoose')
const path = require("path")
const { getUploadFileExt } = require("../../utils")
const { v4:uuid } = require("uuid")

const { saveFileToDisk } = require("../../upload")
const { UPLOAD_DIR } = require("../../config")

const router = new Router({
  prefix: '/upload'
})

router.post("/file", async(ctx) => {
  // 拿到文件后缀名
  const ext = getUploadFileExt(ctx) 

  // 文件重新命名
  const filename = `${uuid()}.${ext}`

  await saveFileToDisk(ctx, path.resolve(UPLOAD_DIR, filename))

  ctx.body = {
    data: filename,
    code: 1,
    msg: ''
  }
})

module.exports = router