const getMeta = () => {
  return {
    createdAt: {
      type: Number,
      default: (new Date()).getTime()
    },
    updatedAt: {
      type: Number,
      default: (new Date()).getTime()
    }
  }
}

const getBody = (ctx) => {
  return ctx.request.body || {}
}

module.exports = {
  getMeta,getBody
}