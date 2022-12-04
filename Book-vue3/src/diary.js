const DIARY_MAP = [
  ["/character/list", "获取角色列表"],
  ["/log/list", "获取出入库操作信息"],
  ["/user/info", "获取自己的登陆信息"],
  ["/user/list", "获取用户列表"],
  ["/book/list", "获取图书列表"],
  ["/diary/list", "获取日志列表"],
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
