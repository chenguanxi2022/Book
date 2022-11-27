const mongoose = require('mongoose')

const { getMeta } = require('../../utils')

const UserSchema = mongoose.Schema({
  account:String,
  password:String,
  meta:getMeta()
})

mongoose.model('User',UserSchema)