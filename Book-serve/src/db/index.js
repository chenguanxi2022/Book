const mongoose = require('mongoose')

require('./Schema/User')

const connect = () => {
  return new Promise((resolve,reject) => {
    mongoose.connect('mongodb://127.0.0.1:27017/book')

    mongoose.connection.on('open',() => {
      console.log('连入数据库成功')
      resolve()
    })
  })
}

module.exports = connect