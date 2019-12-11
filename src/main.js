import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入element日历组件
import { Calendar } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Calendar);

// vant组件按需引入;
import "@/utils/vant.js";

// date对象日期时间格式化
import "@/utils/format.js";

// 全局过滤器引入
import * as filters from "./filters";

// 全局注册自定义指令-水波纹效果
import waves from "./directive/waves/index";
Vue.use(waves);

// svg-icon组件注册，svg图标自动加载
import "./icons/index";

// 权限控制-路由守卫
import "./permission";

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 动态标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
