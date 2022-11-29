const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../utils')
const Book = mongoose.model('Book')

const router = new Router({
  prefix: '/book'
})

const BOOK_CONST = {
  IN: 1,
  OUT: 0
}

// add 添加
router.post('/add',async (ctx) => {
  const {
    name,
    price,
    author,
    date,
    classify,
    count
  } = getBody(ctx)

  // 同步 mongoDB
  const book = new Book({
    name,
    price,
    author,
    date,
    classify,
    count
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
  const { page = 1, size = 10, keyWord = '' } = ctx.query
  const query = {}
  // 判断 keyWord 是否为空
  if(keyWord) {
    query.name = keyWord
  }

  // 获取列表（+分页）
  /**
   * 2 20
   * 20 20
   * (page -1) * size
   */
  const list = await Book
    // find；查询数据列
    .find(query)
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

// delete 删除
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params

  // 删除该 id书籍
  const delMsg = await Book.deleteOne({
    _id: id
  })

  ctx.body = {
    data: delMsg,
    msg: '删除成功',
    code: 1
  }
})

// 入库、出库
router.post('/updateCount',async (ctx) => {
  const { id, type } = getBody(ctx)

  let { num } = getBody(ctx);

  num = Number(num);

  const book = await Book.findOne({
    _id: id,
  });

  // 没找到该书
  if(!book) {
    ctx.body = {
      code: 0,
      msg: '没有找到该书籍'
    }
    return;
  }
  // 找到了书
  if(type === BOOK_CONST.IN) {
    // 绝对值，取正数
    num = Math.abs(num)
  } else {
    num = - Math.abs(num)
  }

  book.count = num + book.count

  if(book.count < 0) {
    ctx.body = {
      code: 0,
      msg: '出库失败'
    }
    return;
  }

  const res = await book.save();

  ctx.body = {
    code: 1,
    data: res,
    msg: '操作成功'
  }
});

module.exports = router