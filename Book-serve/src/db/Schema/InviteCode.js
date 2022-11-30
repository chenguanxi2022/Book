const mongoose = require('mongoose')

const { getMeta, preSave } = require('../../utils')

const InviteCodeSchema = mongoose.Schema({
  // 邀请码
  code: String,
  // 用来注册那个账户
  user: String,
  meta: getMeta()
})

InviteCodeSchema.pre("save", preSave)

mongoose.model('InviteCode',InviteCodeSchema)