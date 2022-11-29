const mongoose = require('mongoose')

const { getMeta } = require('../../utils')

const BookSchema = mongoose.Schema({
  /**
   * 书名、价格、作者、出版日期、分类、库存
   */
  name: String,
  price: Number,
  author: String,
  date: String,
  classify: String,
  count: Number,
  meta: getMeta()
})

mongoose.model('Book',BookSchema)