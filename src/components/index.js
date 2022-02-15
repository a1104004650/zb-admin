import Vue from 'vue'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
