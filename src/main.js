import Vue from "vue";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// flex 布局库
import 'flex.css'

import App from "./App.vue";
import router from "./router";
import store from "./store";

import { frameInRoutes } from '@/router/routes';
import xDate from './libs/xdate';
Vue.prototype.dateUtil = xDate;

// 过滤器引入
import filters from './filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.config.productionTip = false;
Vue.use(ElementUI);

console.log("当前运行环境：" + process.env.NODE_ENV);
console.log("当前环境APP_BASE_API：" + process.env.VUE_APP_BASE_API);

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('storeModules/page/init', frameInRoutes)
    
    this.$store.dispatch('storeModules/page/openedLoad', null, { root: true })
  }
}).$mount("#app");
