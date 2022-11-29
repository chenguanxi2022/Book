const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../utils')
const Book = mongoose.model('Book')

const router = new Router({
  prefix: '/book'
})

// add 添加
router.post('/add',async (ctx) => {
  const {
    name,
    price,
    author,
    date,
    classify,
  } = getBody(ctx)

  // 同步 mongoDB
  const book = new Book({
    name,
    price,
    author,
    date,
    classify
  })
  const res = await book.save()

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res
  }
})

// list 渲染
router.get('/list',async (ctx) => {
  // 获取列表
  const list = await Book.find().exec()

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: list
  }
})

module.exports = router