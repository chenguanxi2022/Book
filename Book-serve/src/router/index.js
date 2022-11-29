const auth = require('./Auth')
const invite = require('./InviteCode')
const book = require('./Book')

module.exports = (app) => {
  app.use(auth.routes())
  app.use(invite.routes())
  app.use(book.routes())
} 