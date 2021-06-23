import { get, post } from "@/utils/axios";
//图形验证码
export const verifyPic = (params) => get("/index/login/getCaptcha", params);
//登录等需要配置url的api
export const login = (params) => post("/index/login/login", params);
//基本配置
export const getBaseConfig = (params) => get("/index/config/getConfig", params);
//刷新基本配置
export const refreshConfig = (params) =>
  get("/index/config/configRefresh", params);
//发送短信验证码
export const getMessageCode = (params) =>
  get("/index/login/sendMessages", params);
//登出
export const logout = (params) => get("/index/login/logout", params);
//获取用户列表
export const getUserList = (params) => get("/index/user/getList", params);
//添加用户
export const addUser = (params) => post("/index/user/create", params);
//编辑用户
export const editUser = (params) => post("/index/user/edit", params);
//删除用户
export const deleteUser = (params) => get("/index/user/delete", params);
//解锁用户
export const unlockUser = (params) => get("/index/user/unlockUser", params);
//添加用户
export const resetUser = (params) => get("/index/user/reset", params);
//修改密码
export const changePassword = (params) => get("/index/user/change", params);
//获取系统相关配置
export const getSystemConfig = (params) =>
  get("/index/config/getConfig", params);
//添加系统配置
export const addSystemConfig = (params) => post("/index/config/create", params);
//编辑系统配置
export const editSystemConfig = (params) => post("/index/config/edit", params);
//设置：获取组织机构绑定列表
export const getUserOrgList = (params) =>
  get("/index/user/getOrganizationByUser", params);
//设置：用户绑定组织机构
export const bindUserOrg = (params) =>
  post("/index/user/userBindOrganization", params);
//设置：获取角色列表
export const getUserRoleList = (params) =>
  get("/index/user/getRoleDataByUser", params);
//设置：用户绑定角色
export const bindUserRole = (params) => post("/index/user/bindRole", params);
//设置：用户解绑角色
export const unbindUserRole = (params) => get("/index/user/unbindRole", params);
//设置：访问权限树
export const getUserAceessList = (params) =>
  get("/index/user/getUserPrivilegesTree", params);
//设置：用户绑定操作权限
export const bindUserAceess = (params) =>
  post("/index/user/bindAccessPermission", params);
//设置：获取用户数据树
export const getUserDataList = (params) =>
  get("/index/data/getResourcesTree", params);
//设置：查看用户数据权限
export const getUserDataAccess = (params) =>
  get("/index/user/getUserDataPemissionData", params);
//获取单条用户信息
export const getUserById = (params) => get("/index/user/getUser", params);
//获取菜单
export const getMenu = (params) => get("/index/resource/getTree", params);
//获取区域
export const getRegion = (params) => get("get/regionList", params);
//获取项目
export const getRegionProject = (params) => get("get/projectList", params);
//设置用户区域和项目
export const setRegionProject = (params) => get("setUserRegionProject", params);
