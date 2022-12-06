export default [
  {
    title: "书籍管理",
    url: "/book",
    onlyAdmin: false,
  },
  {
    title: "用户管理",
    url: "/user",
    onlyAdmin: true,
  },
  {
    title: "操作日志",
    url: "/diary",
    onlyAdmin: true,
  },
  {
    title: "杂项",
    onlyAdmin: false,
    children: [
      {
        title: "重置密码",
        url: "/reset/password",
        onlyAdmin: true,
      },
      {
        title: "邀请码管理",
        url: "/inviteCode",
        onlyAdmin: true,
      },
      {
        title: "图书分类",
        url: "/bookClassify",
        onlyAdmin: true,
      },
    ],
  },
  {
    title: "个人信息",
    url: "/profile",
    onlyAdmin: false,
  },
];
