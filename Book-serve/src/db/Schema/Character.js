const mongoose = require('mongoose')

const { getMeta, preSave } = require('../../utils')

const CharacterSchema = new mongoose.Schema({
  name: String,
  title: String,
  power: Object,
  meta:getMeta()
})

CharacterSchema.pre("save", preSave)

mongoose.model('Character',CharacterSchema)