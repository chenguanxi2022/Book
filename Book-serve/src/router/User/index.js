const Router = require('@koa/router');
const mongoose = require('mongoose');

const { getBody } = require("../../utils")
const { getPwd, UPLOAD_DIR } = require("../../config")
const { verify, getToken } = require("../../token");
const { loadExcel, getSheet1 } = require("../../excel")

const User = mongoose.model('User')
const Character = mongoose.model('Character')

const router = new Router({
  prefix: '/user'
})

// 查询账户信息
router.get('/list', async(ctx) => {
  let { page, size, keyWord } = ctx.query
  
  page = Number(page)
  size = Number(size)

  const query = {}
  if(keyWord) {
    query.account = keyWord
  }

  const list = await User.find(query).sort({_id:-1}).skip((page - 1) * size).limit(size).exec()

  const total = await User.countDocuments()

  ctx.body = {
    data: {
      list,
      total,
      page,
      size
    },
    code: 1,
    msg: "获取列表成功"
  }
  
})

// 删除
router.delete('/:id',async (ctx) => {
  const { id } = ctx.params

  const res = await User.deleteOne({
    _id: id
  }).exec()

  ctx.body = {
    data: res,
    msg: "删除成功",
    code: 1
  }
})

// 添加
router.post('/add', async(ctx) => {
  const { account, password, character } = getBody(ctx)

  const char = Character.findOne({
    _id: character
  })

  // 查看库中是否存在
  if(!char) {
    ctx.body = {
      code: 0,
      data: null,
      msg: "出错了"
    }
    return;
  }

  const user = new User({
    account,
    password: password || '12345',
    character
  })

  const res = await user.save()

  ctx.body = {
    data: res,
    msg: "添加成功",
    code: 1
  }
})

// 重置密码
router.post('/reset/password', async(ctx) => {
  const { id } = getBody(ctx)

  const one = await User.findOne({_id:id}).exec()

  if(!one) {
    ctx.body = {
      code: 0,
      data: null,
      msg: "出错了"
    }
    return;
  }

  one.password = getPwd()

  await one.save()

  const res = await one.save()

  ctx.body = {
    msg: '修改成功',
    data: {
      account: res.account,
      _id: res._id,
    },
    code: 1
  }
})

router.get('/info', async(ctx) => {
  // Authorization：Bearer $%^78623frgrgsd
  ctx.body = {
    data: await verify(getToken(ctx)),
    msg: "获取成功",
    code: 1
  }
})

router.post('/addMany', async(ctx) => {
  const {
    key
  } = getBody(ctx)

  const path = `${UPLOAD_DIR}/${key}`

  // 拿到 excel
  const excel = loadExcel(path)

  // 拿到这个数据
  const sheet = getSheet1(excel)

  // 空数组
  const arr = []

  // 找到 name = member 的
  const character = await Character.find().exec()
  const member = character.find((item) => item.name === 'member')

  for(let i = 0; i < sheet.length; i++) {
    let record = sheet[i]

    // 解构出 账号、密码
    const [account, password] = record

    // 账号是否存在
    const one = await User.findOne({
      account
    })
    if(one) {
      ctx.body = {
        code: 0,
        msg: "出错啦",
        data: null
      }
      return;
    }

    arr.push({
      account,
      password: password || getPwd(),
      character: member._id
    })

  }

  await User.insertMany(arr)
  
  ctx.body = {
    code: 1,
    msg: "",
    data: null
  }
})

module.exports = router