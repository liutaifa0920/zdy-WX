// 路由守卫
import router from "./router";

// 白名单
// const whiteList = ["/login", "/auth-redirect"];

router.beforeEach(async (to, from, next) => {
  // 可根据页面修改title值
  // document.title = getPageTitle(to.meta.title);

  // ...

  next();
});

router.afterEach(() => {});
