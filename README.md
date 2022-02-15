# admin-v2
# vue-Cli3( vue2 + vuex + vueRoute + sass) + webpack + elementUI + d2Admin
# nodeJS 9以上

## V1.0 WechatAdminWeb 工程名
## 左侧菜单新增logo
## V1.0.1 
## 完善菜单管理功能

## 全局配置 setting.js
## 环境配置 .env.development .env.production （也可自行新增）

## ------------------------------------------------------------------------------------------------------------------------------------------------
## 存储数据篇              |                    生命周期                                  |                     场景
## ------------------------------------------------------------------------------------------------------------------------------------------------
## Vuex                    | 存储于电脑内存中，浏览器刷新或者关闭则消失。                  |        组件数据交互
## lowDB                   | 存储于电脑内存中，是一个轻量级的JSON数据库。（40MB）          |        前端敏感数据存储，持久化数据存储
## Cookie                  | 存储于http请求头，需要用户手动清除或者设置过期时间。（4kb）   |        存储用户登录信息，购物车...，会消耗http性能。         
## localStorage            | 永久，除非自行删除。（5MB）                                   |        与cookie类似。明文存储。
## sessionStorage          | 存储于浏览器会话中，关闭浏览器则消失。（5MB）                 |        存储不要紧的数据。明文存储。
## ------------------------------------------------------------------------------------------------------------------------------------------------

## 目录介绍
## node_modules 依赖
## public 单页面
## src
##  api 接口API
##  assets 静态资源（font，image，css）
##  components 组件
##  filter 全局过滤器
##  libs 插件
##  menus 菜单的工具类
##  router 路由，路由的工具类
##  store 数据持久化层
##  views 页面
##  .browserslistrc 浏览器支持说明
##  .env####### 分环境配置
##  babel.config.js 编译规则类
##  package-lock.json 架包依赖版本以及下载地址
##  package.json 打包命令，依赖，项目信息
##  vue.config.js  打包规则

## 项目功能
## 基于elementUI + d2Admin 项目进行二次开发
## 支持同时缓存多个菜单tab

## 版本更新 v0.0.1

## Project setup
## 常见问题
## 1.启动报错Cannot find module ‘vue-loader-v16/package.json?
## Q：删除node_modules，使用命令重新安装依赖cnpm -- install。
##
## 2.vue-cli3 一直发送sockjs-node/info 请求?
## Q：sockjs-node 是一个JavaScript库，提供跨浏览器JavaScript的API，创建了一个低延迟、全双工的浏览器和web服务器之间通信通道。 
## /node_modules/sockjs-client/dist/sockjs.js  1605行  注释即可（可能会导致热更新失效）
##
## 3.env.*文件?
## Q：创建多个文件可以对多个环境进行分环境配置
## 
## 4.公共样式路径（可选）?
## Q:\assets\style\common.scss
## 
## 5.image-webpack-loader缺少或者缺少依赖?
## Q:到项目夹子下面执行 install image-webpack-loader --save-dev