import { SYS_LOGIN } from '@/api/api.js';
import util from '@/libs/util.js';
import { getAsideMenu } from '@/menu';
import { dbSet } from '@/libs/util.db';
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        token: '',
        role: {},
        userInfo: {}
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLE: (state, role) => {
            state.role = role
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },
    getters: {
      userInfo: state => state.userInfo,
      token: state => state.token,
      roles: state => state.roles
    },
    actions: {
        async login ({ commit, dispatch }, {
            userName = '',
            password = ''
          } = {}) {
            // 通过用户名密码调用登录接口
            let res = await SYS_LOGIN({ userName, password });


            util.cookies.set('token', res.token);
            util.cookies.set('userInfo', { 'userId':res.userId , 'userName':res.userName });

            // 根据用户名查询菜单 传菜单直接生成菜单。
            // 这一块要移到manage页面新开一个用户查菜单的接口。
            let menu = await getAsideMenu(res.userId);
            // createAsideMenu
            commit('storeModules/menu/asideSet', menu , { root: true });

            dbSet({ path:'userInfo', value:res , user:true });
            dbSet({ path:'asideSet', value:menu , user:true });
           
        },
        logout ({ commit, dispatch }, {  } = {}) {
            /**
             * @description 注销
             */
            async function logout () {
              // 删除cookie
              util.cookies.remove('token');
              util.cookies.remove('role');
              util.cookies.remove('userInfo');
              await dispatch('storeModules/page/closeAll', {} , { root: true });
              window.location.reload();
            }
            // 判断是否需要确认
            util.message.confirm({ message:"确定要注销当前用户吗？",title:"退出登录",confirmButtonText:"确认",cancelButtonText:"取消",confirmCallback:function() {
              logout()
            },type:"warning"});

          }
    }
}