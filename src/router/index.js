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
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "msg",
        name: "Msg",
        component: () => import("@/views/message/msg.vue"),
        meta: {
          title: "消息"
        }
      },
      {
        path: "address",
        name: "Address",
        component: () => import("@/views/address/addressList.vue"),
        meta: {
          title: "通讯录"
        }
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/user/user.vue"),
        meta: {
          title: "我的"
        }
      }
    ]
  },
  // -------------------- 首 页 ------------------------
  // 习惯打卡
  {
    path: "/habitClockIn",
    name: "habitClockIn",
    component: () => import("@/views/home/homeClockIn/habitClockIn.vue"),
    meta: {
      title: "知点云"
    }
  },
  // 打卡详情
  {
    path: "/habitClockInInfo",
    name: "habitClockInInfo",
    component: () => import("@/views/home/homeClockIn/habitClockInInfo.vue"),
    meta: {
      title: "知点云"
    }
  },
  // 排行榜
  {
    path: "/rankingList",
    name: "rankingList",
    component: () => import("@/views/home/homeClockIn/rankingList.vue"),
    meta: {
      title: "知点云"
    }
  },
  // 打卡统计
  {
    path: "/clockInStatistics",
    name: "clockInStatistics",
    component: () => import("@/views/home/homeClockIn/clockInStatistics.vue"),
    meta: {
      title: "知点云"
    }
  },


  // -------------------- 消 息 ------------------------
  {
    path: "/noticeList",
    name: "noticeList",
    component: () => import("@/views/message/msgOther/noticeList.vue"),
    meta: {
      title: "知点云"
    }
  },
  {
    path: "/noticeInfo",
    name: "noticeInfo",
    component: () => import("@/views/message/msgOther/noticeInfo.vue"),
    meta: {
      title: "知点云"
    }
  },
  // noticeReadInfo
  {
    path: "/noticeReadInfo",
    name: "noticeReadInfo",
    component: () => import("@/views/message/msgOther/noticeReadInfo.vue"),
    meta: {
      title: "知点云"
    }
  },
  // -------------------- 通讯录 ------------------------
  {
    path: "/addressInfo",
    name: "addressInfo",
    component: () => import("@/views/address/addressItem.vue"),
    meta: {
      title: "知点云"
    }
  },
  // -------------------- 我 的 ------------------------
  {
    path: "/userInfo",
    name: "userInfo",
    component: () => import("@/views/user/userOther/userInfo.vue"),
    meta: {
      title: "知点云"
    }
  },
  {
    path: "/userSetting",
    name: "userSetting",
    component: () => import("@/views/user/userOther/userSetting.vue"),
    meta: {
      title: "知点云"
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
