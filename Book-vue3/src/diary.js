const DIARY_MAP = [
  ["/character/list", "获取角色列表"],
  ["/log/list", "获取出入库操作信息"],
  ["/user/info", "获取自己的登陆信息"],
  ["/user/list", "获取用户列表"],
  ["/book/list", "获取图书列表"],
  ["/diary/list", "获取日志列表"],
  ["/forgetPassword/list", "重置密码列表"],
  ["/book/detail", "获取数据详情"],
  ["/invite/list", "邀请码管理"],
  ["/bookClassify/list", "图书分类列表"],
  ["/book", "书籍详情"],
  ["/bookClassify", "书籍分类"],
  ["/dashboard/baseInfo", "页面总览"],
];

export const getDiaryInfoByPath = (path) => {
  let title = "";

  DIARY_MAP.forEach((item) => {
    if (path.includes(item[0])) {
      title = path.replace(item[0], item[1]);
    }
  });

  return title || path;
};
