// 记录创建、更新时间
const getMeta = () => {
  return {
    createdAt: {
      type: Number,
      default: (new Date()).getTime()
    },
    updatedAt: {
      type: Number,
      default: (new Date()).getTime()
    }
  }
}

// 解析 post 请求体
const getBody = (ctx) => {
  return ctx.request.body || {}
}

// 入库前时间更新
const preSave = function(next) {
  if(this.isNew) {
    const ts = Date.now();

    this['meta'].createdAt = ts;
    this['meta'].updatedAt = ts;
  } else {
    this['meta'].updatedAt = Date.now()
  }

  next();
}

// 拿到上传文件名后缀
const getUploadFileExt = (ctx) => { 
  // 没有就为 '空'
  const { originalFilename = '' } = ctx.request.files.file

  // . 进行分隔并 pop 出来（删除数组最后一个元素并返回）
  return originalFilename.split('.').pop()
}

module.exports = {
  getMeta,getBody,preSave,getUploadFileExt
}