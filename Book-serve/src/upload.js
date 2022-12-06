const fs = require('fs')

// 保存文件到磁盘
const saveFileToDisk = (ctx, filename) => {
  return new Promise((resolve, reject) => {
    // 拿到 file
    const file = ctx.request.files.file
    // console.log(file)
    // 读取 file
    const reader = fs.createReadStream(file.filepath)
    // 写入 file
    const writeStream = fs.createWriteStream(filename)

    // 开始写入
    reader.pipe(writeStream)

    // 监听写入结束
    reader.on('end', () => {
      resolve(filename)
    })

    // 监听读取出错
    reader.on('error', (err) => {
      reject(err)
    })
  })
}

module.exports = {
  saveFileToDisk,
}