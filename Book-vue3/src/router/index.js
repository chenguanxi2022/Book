import { createRouter, createWebHistory } from "vue-router";

import { useCharacterStore } from "../stores/character";
import { useUserStore } from "../stores/user";

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
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const storeC = useCharacterStore();
  const storeU = useUserStore();
  if (!storeC.characterInfo.length) {
    await storeC.getList();
  }
  if (!storeU.userInfo.account) {
    await storeU.getUserInfo();
  }
  next();
});

export default router;
