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
  // https://aa.cc.com/user?page=2&size=20&#fdsafds
  const { page = 1, size = 10 } = ctx.query
  // 获取列表（+分页）
  /**
   * 2 20
   * 20 20
   * (page -1) * size
   */
  const list = await Book
    // find；查询数据列
    .find()
    // skip: 过滤掉前（page -1）页数据（忽略）
    .skip((page - 1) * size)
    // limit：限制查询 size 条
    .limit(size)
    // 确保执行
    .exec()

  // 查询数据总数（聚合）
  const total = await Book.countDocuments()
  
  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      list,
      total,
      page,
      size
    }
  }
})

module.exports = router