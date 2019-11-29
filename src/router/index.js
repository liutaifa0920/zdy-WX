import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/layout/home"
  },
  {
    // 默认layout布局，可定制layout布局，layout路由可修改
    // 布局路由下为视图文件
    path: "/layout",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue")
      },
      {
        path: "msg",
        name: "Msg",
        component: () => import("@/views/message/msg.vue")
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/user/user.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
