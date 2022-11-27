const auth = require('./Auth')
const invite = require('./InviteCode')

module.exports = (app) => {
  app.use(auth.routes())
  app.use(invite.routes())
} 