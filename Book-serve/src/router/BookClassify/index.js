const Router = require("@koa/router")
const mongoose = require("mongoose")

const { getBody } = require("../../utils")

const BookClassify = mongoose.model("BookClassify")

const router = new Router({
  prefix: '/bookClassify'
})

// 列表
router.get('/list', async (ctx) => {
  const list = await BookClassify.find().exec()

  ctx.body = {
    data: list,
    msg: "获取成功",
    code: 1
  }
})

// 增
router.post('/add', async (ctx) => {
  const { title } = getBody(ctx)

  const one = await BookClassify.findOne({
    title
  }).exec()

  if(one) {
    ctx.body = {
      code: 0,
      msg: "出错啦",
      data: null
    }
    return;
  }

  const bookClassify = new BookClassify({
    title,
  })

  const res = await bookClassify.save()

  ctx.body = {
    msg: "添加成功",
    code: 1,
    data: res
  }
})

// 删
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params

  const res = await BookClassify.deleteOne({
    _id: id
  }).exec()

  ctx.body = {
    code: 1,
    msg: "删除成功",
    data: res
  }
})

// 改
router.post('/update/title', async (ctx) => {
  const { id, title } = getBody(ctx)
  
  const one = await BookClassify.findOne({
    _id:id
  })

  if(!one) {
    ctx.body = {
      code: 0,
      msg: "资源不存在",
      data: null
    }
    return;
  }

  one.title = title

  const res = await one.save()

  ctx.body = {
    data: res,
    code: 1,
    msg: "资源存在"
  }
})

module.exports = router