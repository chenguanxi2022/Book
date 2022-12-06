const path = require("path")

/**
 * 获得 key
 * @returns String
 */
const getKey = () => {
  return 'guanxi-Book'
}

const getPwd = () => {
  return '12345'
}

module.exports = {
  getKey, getPwd, 
  // 当前位置，相对路径
  UPLOAD_DIR: path.resolve(__dirname, '../upload')
}