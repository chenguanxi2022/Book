const mongoose = require("mongoose");
const { getMeta, preSave } = require("../../utils");

const DiaryResponseSchema = mongoose.Schema({
  diaryId: String,
  data: String,
  meta: getMeta()
})

DiaryResponseSchema.pre("save", preSave)
mongoose.model("DiaryResponse", DiaryResponseSchema)