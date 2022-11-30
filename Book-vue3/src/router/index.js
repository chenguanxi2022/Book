import { createRouter, createWebHistory } from "vue-router";

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
      ],
    },
  ],
});

export default router;
