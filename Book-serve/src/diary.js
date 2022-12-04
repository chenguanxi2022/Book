const { verify, getToken } = require("./token")
const mongoose = require("mongoose")

const Diary = mongoose.model('Diary')
const DiaryResponse = mongoose.model('DiaryResponse')

const diaryMiddleWare = async (ctx, next) => {
  // 开始时间
  const startTime = Date.now()

  await next()

  // 用户信息
  let payload = {};
  try {
    payload = await verify(getToken(ctx));
  } catch {
    payload = {
      account: '未知用户',
      id: '',
    };
  }
  // url
  const url = ctx.url;
  const method = ctx.method
  const status = ctx.status
  let show = true

  if(url === '/diary/delete') {
    show = false
  }

  // responseBody
  let responseBody = ''
  if(typeof ctx.body === 'string') {
    responseBody = ctx.body
  } else {
    try {
      responseBody = JSON.stringify(ctx.body)
    } catch {
      responseBody = ''
    }
  }

  const endTime = Date.now()

  const diary = new Diary({
    user: {
      account: payload.account,
      id: payload.id
    },
    request: {
      url,
      method,
      status
    },
    startTime,
    endTime,
    show,
  })

  diary.save()

  const Diaryres = await new DiaryResponse({
    diaryId: diary._id,
    data: responseBody
  })

  Diaryres.save()
}

module.exports = {
  diaryMiddleWare
}