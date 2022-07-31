import { createRouter, createWebHistory } from "vue-router";

import TodoView from "@/views/TodoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "todo",
      component: TodoView,
    },
  ],
});

export default router;
