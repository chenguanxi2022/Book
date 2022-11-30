const mongoose = require('mongoose')

const { getMeta, preSave } = require('../../utils')

const UserSchema = mongoose.Schema({
  account:String,
  password:String,
  meta:getMeta()
})

UserSchema.pre("save", preSave)

mongoose.model('User',UserSchema)