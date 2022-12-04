const mongoose = require("mongoose")
const { getMeta, preSave } = require("../../utils")

const ForgetPasswordSchema = mongoose.Schema({
  account: String,

  // 1 待处理
  // 2 已重置
  // 3 已忽略
  status: Number,
  meta: getMeta()
})

ForgetPasswordSchema.pre("save", preSave)
mongoose.model("ForgetPassword", ForgetPasswordSchema)