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
        path: "address",
        name: "Address",
        component: () => import("@/views/address/addressList.vue")
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/user/user.vue")
      }
    ]
  },
  {
    path: "/noticeList",
    name: "noticeList",
    component: () => import("@/views/message/msgOther/noticeList.vue")
  },
  {
    path: "/noticeInfo",
    name: "noticeInfo",
    component: () => import("@/views/message/msgOther/noticeInfo.vue")
  },
  // noticeReadInfo
  {
    path: "/noticeReadInfo",
    name: "noticeReadInfo",
    component: () => import("@/views/message/msgOther/noticeReadInfo.vue")
  },
  {
    path: "/addressInfo",
    name: "addressInfo",
    component: () => import("@/views/address/addressItem.vue")
  },
  {
    path: "/userInfo",
    name: "userInfo",
    component: () => import("@/views/user/userOther/userInfo.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
