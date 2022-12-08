import { createRouter, createWebHistory } from "vue-router";

import { useCharacterStore } from "../stores/character";
import { useUserStore } from "../stores/user";
import { useBookClassifyStore } from "../stores/bookClassify";
import { user } from "../service";
import { message } from "ant-design-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/Auth/index.vue"),
    },
    {
      path: "/",
      name: "BasicLayout",
      redirect: "/auth",
      component: () => import("../layout/BasicLayout/index.vue"),
      children: [
        {
          path: "book",
          name: "Book",
          component: () => import("../views/Book/index.vue"),
        },
        {
          path: "book/:id",
          name: "BookDetail",
          component: () => import("../views/BookDetail/index.vue"),
        },
        {
          path: "user",
          name: "User",
          component: () => import("../views/User/index.vue"),
        },
        {
          path: "diary",
          name: "Diary",
          component: () => import("../views/Diary/index.vue"),
        },
        {
          path: "reset/password",
          name: "ResetPassword",
          component: () => import("../views/ResetPassword/index.vue"),
        },
        {
          path: "inviteCode",
          name: "InviteCode",
          component: () => import("../views/InviteCode/index.vue"),
        },
        {
          path: "bookClassify",
          name: "BookClassify",
          component: () => import("../views/BookClassify/index.vue"),
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import("../views/Profile/index.vue"),
        },
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("../views/Dashboard/index.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let res = {};
  try {
    res = await user.info();
  } catch (e) {
    if (e.message.includes("code 401")) {
      res.code = 401;
    }
  }

  const { code } = res;

  if (code === 401) {
    if (to.path === "/auth") {
      next();
      return;
    }

    message.error("认证失败，请重新登陆");
    next("/auth");
    return;
  }

  const { characterInfo, getList } = useCharacterStore();
  const { userInfo, getUserInfo } = useUserStore();
  const { getBookClassify } = useBookClassifyStore();
  if (!characterInfo.length) {
    await getList();
  }
  if (!userInfo.account) {
    await getUserInfo();
  }

  await getBookClassify();

  if (to.path === "/auth") {
    next("/book");
    return;
  }

  next();
});

export default router;
