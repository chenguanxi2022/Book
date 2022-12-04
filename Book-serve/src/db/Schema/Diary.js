// 完整日志
const mongoose = require('mongoose');
const { getMeta, preSave } = require('../../utils')

const DiarySchema = new mongoose.Schema({
  user: {
    account: String,
    id: String
  },
  request: {
    method: String,
    url: String,
    status: Number
  },
  startTime: Number,
  endTime: Number,
  show: Boolean,

  meta: getMeta(),
});

DiarySchema.pre("save", preSave)

mongoose.model('Diary', DiarySchema);