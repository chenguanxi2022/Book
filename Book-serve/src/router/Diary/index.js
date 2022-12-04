const Router = require('@koa/router');
const mongoose = require('mongoose');

const { getBody } = require("../../utils")

const Diary = mongoose.model('Diary')

const router = new Router({
  prefix: '/diary'
})

router.get('/list', async(ctx) => {
  let { page, size } = ctx.query
  
  page = Number(page)
  size = Number(size)

  const list = await Diary.find({show:true}).sort({_id:-1}).skip((page - 1) * size).limit(size).exec()

  const total = await Diary.countDocuments().exec()

  ctx.body = {
    data: {
      list,
      page,
      size,
      total
    },
    code: 1,
    msg: "获取成功"
  }
})

router.post('/delete', async(ctx) => {
  const { id } = getBody(ctx)

  const one = await Diary.findOne({
    _id: id
  }).exec()

  if(!one) {
    ctx.body = {
      code: 0,
      msg: "删除成功",
      data: null
    }
    return;
  }
  
  one.show = false

  await one.save()

  ctx.body = {
    msg: "删除成功",
    code: 1
  }
})

module.exports = router