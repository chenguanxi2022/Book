const xlsx = require("node-xlsx")

// 解析 excel
const loadExcel = (path) => {
  return xlsx.parse(path)
}

// 获取第一页
const getSheet1 = (sheets) => {
  return sheets[0].data
}

module.exports = {
  loadExcel,getSheet1
}
