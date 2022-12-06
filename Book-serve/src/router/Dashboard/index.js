const Router = require("@koa/router")
const mongoose = require("mongoose")

const User = mongoose.model("User")
const Book = mongoose.model("Book")
const Diary = mongoose.model("Diary")

const router = new Router({
  prefix: "/dashboard"
})

router.get("/baseInfo", async (ctx) => {
  const bookTotal = await Book.countDocuments();
  const userTotal = await User.countDocuments();
  const diaryTotal = await Diary.find({show:true}).countDocuments();

  ctx.body = {
    code: 1,
    msg: "获取成功",
    data: {
      book: bookTotal,
      user: userTotal,
      diary: diaryTotal
    }
  }
});

module.exports = router