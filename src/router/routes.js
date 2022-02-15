const frameIn = [
    {
      path: "/",
      name: "Manage",
      redirect: { name: 'portal' },
      component: () => import( "@/views/manage/index"),
      children: [
        // 首页
        {
          path: 'portal',
          name: 'portal',
          meta: {
            title: '首页',
            auth: true
          },
          component: () => import( "@/views/portal/index")
        },
        {
          path: 'role',
          name: 'role',
          meta: {
            title: '角色管理',
            auth: true
          },
          component: () => import( "@/views/role/index")
        },
        {
          path: 'menu',
          name: 'menu',
          meta: {
            title: '菜单管理',
            auth: true
          },
          component: () => import( "@/views/menu/index")
        },
        {
          path: 'editPwd',
          name: 'editPwd',
          meta: {
            title: '修改密码',
            auth: true
          },
          component: () => import( "@/views/editPwd/index")
        },
        {
          path: 'userManager',
          name: 'userManager',
          meta: {
            title: '用户管理',
            auth: true
          },
          component: () => import( "@/views/userManager/index")
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          meta: {
            title: '用户信息',
            auth: true
          },
          component: () => import( "@/views/userInfo/index")
        },
        {
          path: 'wxSendMessageInfo',
          name: 'wxSendMessageInfo',
          meta: {
            title: '消息推送汇总查询',
            auth: true
          },
          component: () => import( "@/views/wxSendMessageInfo/index")
        },
        // 刷新页面 必须保留
        {
          path: 'refresh',
          name: 'refresh',
          hidden: true,
          component: () => import( "@/views/function/refresh")
        },
        // 页面重定向 必须保留
        {
          path: 'redirect/:route*',
          name: 'redirect',
          hidden: true,
          component: () => import( "@/views/function/redirect")
        }
      ]
      
    }
];



/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    {
      path: "/login",
      name: "Login",
      component: () => import( "@/views/login/index")
    }
  ]

/**
 * 错误页面
 */
 const errorPage = [
  // 登录
  {
    path: "*",
    name: "error",
    component: () => import( "@/views/error/index")
  }
]


// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
    ...frameIn,
    ...frameOut,
    ...errorPage
  ]
  