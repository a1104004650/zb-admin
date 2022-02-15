import Vue from "vue";
import VueRouter from "vue-router";

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import store from '@/store/index'
import util from '@/libs/util.js'
import routes from './routes'

// fix vue-router NavigationDuplicated
// VueRouterpush方法重写 使用push()、replace()进行导航时，不能重复导航到当前路由。
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.PUBLIC_PATH,
  routes
});



// 路由拦截
router.beforeEach((to, from, next) => {
  // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
  // await store.dispatch('storeModules/page/isLoaded')
  // 进度条
  NProgress.start()

  if (to.matched.some(r => r.meta.auth)) {

    const token = util.cookies.get('token')
    if (token && token !== 'undefined'){
      // 进入afterEach的管道
      next()
    }else{
      next({name: 'Login',query: { redirect: to.fullPath }})
      NProgress.done()
    }

  }else{
    // 进入afterEach的管道
    next()
  }

})

// 路由加载结束
router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('storeModules/page/open', to)
})

export default router;