const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name:String,
  passWord:String,
  age:Number
})

const UserModel = mongoose.model('User',UserSchema)

const connect = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/book')

  mongoose.connection.on('open',() => {
    console.log('连入成功')
  })

  const user = new UserModel({
    name:'冠希',
    age:18,
    passWord:'12345'
  })

  user.save()
}

connect()