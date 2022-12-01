const auth = require('./Auth')
const invite = require('./InviteCode')
const book = require('./Book')
const log = require('./Log')
const user = require('./User')

module.exports = (app) => {
  app.use(auth.routes())
  app.use(invite.routes())
  app.use(book.routes())
  app.use(log.routes())
  app.use(user.routes())
} 