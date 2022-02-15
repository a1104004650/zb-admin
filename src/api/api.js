// API接口统一管理
var https = require("./httpService");

module.exports = {
  /**
   * @description 登录接口
   * @param userName 用户名
   * @param password 密码
   */
  SYS_LOGIN: function (data) {
    return https.default.doPost("/login", data);
  },
  /**
  * @description 根据用户ID获取菜单
  * @param userId 用户id
  */
  SYSM_MENU_GETMENUS: function (data) {
    return https.default.doGet("/sysm/menu/getMenus", data);
  },
  /**
  * @description 修改菜单内容
  * @param menuCode 主菜单code
  * @param menuName 主菜单名称
  * @param menuIconPath 主菜单icon
  * @param childMenus 子菜单
  * @param    menuName 子菜单名称
  * @param    linkUrl  子菜单链接
  * 
  */
  SYSM_MENU_SAVEMENUS: function (data) {
    return https.default.doPost("/sysm/menu/saveMenus", data);
  },
  /**
  * @description 获取所有父级菜单以及详情
  */
  SYSM_MENU_QUERYMENUS: function (data) {
    return https.default.doGet("/sysm/menu/queryMenus", data);
  },
  /**
   * @description 获取所有用户管理列表
   * 
   */
  SYS_QUERY_USER:function (data) {
    return https.default.doPost("/sysm/user/queryUsers",data);
  },
  /**
   * @description 获取所有用户管理列表
   * @param userId 用户id
   */
  SYS_QUERY_EDITUSER:function (data) {
    return https.default.doGet("/sysm/user/queryEditUser",data);
  },
  /**
   * 删除当前选中用户
   * @param userId 用户id
   */
  SYSM_USER_DELETEUSERDATA:function (data) {
    return https.default.doGet("/sysm/user/deleteUserData",data);
  },
  /**
  * @description 获取父级菜单详细
  * @param menuId 菜单id
  */
  SYSM_MENU_GETEDITMENUS: function (data) {
    return https.default.doGet("/sysm/menu/getEditMenu", data);
  },
  /**
  * @description 添加修改用户信息
  * @param user 用户信息
  */
  SYSM_USER_SAVEUSER: function (data) {
    return https.default.doPost("/sysm/user/saveUser", data);
  },
  SYSM_USER_MODDIFYPWD: function (data) {
    return https.default.doPost("/sysm/user/moddifyPwd", data);
  },
  SYSM_USER_QUERYEDITUSER: function (data) {
    return https.default.doPost("/sysm/user/queryEditUser", data);
  },
  /**
  * @description 	主菜单删除操作
  * @param menuId 菜单id
  */
  SYSM_MENU_DELETEMAINMENU: function (data) {
    return https.default.doGet("/sysm/menu/deleteMainMenu", data);
  },
  /**
   * @description 查询角色列表
   */
  SYS_QUERY_ROLES:function(data){
    return https.default.doGet("/sysm/role/queryRoles", data);
  },
  /**
   * @description 修改角色操作
   */
  SYS_QUERY_EDITROLE:function(data){
    return https.default.doGet("/sysm/role/getEditRole", data);
  },
  /**
   * @description 删除角色操作
   * @param roleId 角色id
   */
  SYS_DELETE_ROLE:function(data){
    return https.default.doGet("/sysm/role/deleteRole", data);
  },
  /**
   *  @description 保存修改角色操作
   *  @param roleId 角色id roleName 角色名称
   */
  SYS_SAVE_ROLE:function(data){
    return https.default.doPost("/sysm/role/saveRole", data);
  },
  /**
   * @description 查询系统预设角色
   */
  SYS_GET_DEfFINE_ROLE:function(data){
    return https.default.doGet("/sysm/role/getDefineRole",data);
  }
};
