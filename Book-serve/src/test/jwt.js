const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
console.log(token)

// header
// 加密的算法 sha256
// jwt

// payload
// 加密的数据

// signature
// 加盐

jwt.verify(token,'shhhhh',(err,payload) => {
  console.log(err,payload)
})