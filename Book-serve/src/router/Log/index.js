const Router = require('@koa/router');
const mongoose = require('mongoose');

const log = mongoose.model('Log')

const router = new Router({
  prefix: '/log'
})

// 入库、出库信息查询
router.get('/list',async (ctx) => {
  const { type } = ctx.query

  let { size, page } = ctx.query

  size = Number(size)
  page = Number(page)


  const list = await log.find({type})
    .sort({ _id: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  // 获取当前 type 类型的总数
  const total = await log.find({type}).countDocuments().exec()
  
  ctx.body = {
    data: {
      list,
      total,
      page,
      size
    },
    code: 1,
    msg: '获取信息成功'
  }
  
})

module.exports = router