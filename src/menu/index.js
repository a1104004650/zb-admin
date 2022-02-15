import { uniqueId } from 'lodash'
import util from '@/libs/util'
import { SYSM_MENU_GETMENUS } from '@/api/api.js'

/**
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

/**
 * @description 通过后台结果集组装侧边栏菜单
 * @param {Array} menu 菜单集合
 */
function createAsideMenuData (menu) {
  return menu.map((e) => ({
    path: e.path || e.linkUrl ||  uniqueId('empty-'),
    title: e.title || e.resourceName || e.menuName,
    icon: e.icon || e.menuIconPath,
    children: e.children || e.childMenus ? createAsideMenuData(e.children || e.childMenus) : undefined
  }));
}

/**
 * @description 获取侧边栏菜单列表
 * @param {String} accountId 登录id
 * @param {Array} asideMenus 菜单集合
 */
export const getAsideMenu = async function (accountId, asideMenus) {

  if(asideMenus) {
    var menu = createAsideMenuData(asideMenus);
    return menu;
  }
  // 通过用户名获取菜单列表
  const userId = accountId || util.cookie.get('userInfo').userId;
  return createAsideMenuData(await SYSM_MENU_GETMENUS({ userId }));
}


export const menuAside = supplementPath([
  { path: '/portal', title: '首页', icon: 'el-icon-s-home' },
  {
    title: '系统管理',
    icon: 'el-icon-user',
    children: [
      { path: '/menu', title: '菜单管理' },
      { path: '/role', title: '角色管理' },
      { path: '/editPwd', title: '修改密码' },
      { path: '/userManager', title: '用户管理' }
    ]
  }
])
