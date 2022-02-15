// 设置文件
import setting from '@/setting.js'

export default {
    namespaced: true,
    state: {
        // 头部栏位
        header: [],
        // 侧边栏
        aside: [],
        // 默认侧边栏收缩
        asideCollapse: setting.menu.asideCollapse
    },
    actions: {
      toggle ({ state }) {
        state.asideCollapse = !state.asideCollapse
      }
    },
    getters: {
      aside: state => state.aside
    },
    mutations: {
        /**
         * @description 设置顶栏菜单
         * @param {Object} state state
         * @param {Array} menu menu setting
         */
        headerSet (state, menu) {
          // store 赋值
          state.header = menu
        },
        /**
         * @description 设置侧边栏菜单
         * @param {Object} state state
         * @param {Array} menu menu setting
         */
        asideSet (state, menu) {
          // store 赋值
          state.aside = menu
        }
      }
}