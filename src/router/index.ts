// 导入路由配置方法
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 导入Home组件
import Home from "../views/Home.vue";
// 导入Container组件
import Container from "../components/container/src/index.vue";

// 配置路由对象
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/chooseIcon",
        component: () => import("../views/chooseIcon/index.vue"),
      },
      {
        path: "/chooseArea",
        component: () => import("../views/chooseArea/index.vue"),
      },
      {
        path: "/menu",
        component: () => import("../views/menu/index.vue"),
      },
      {
        path: "/form",
        component: () => import("../views/form/index.vue"),
      },
      {
        path: "/table",
        component: () => import("../views/table/index.vue"),
      },
      {
        path: "/testTable",
        component: () => import("../views/testTable/index.vue"),
      },
    ],
  },
];

// 创建路由
const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 导出路由
export default router;
