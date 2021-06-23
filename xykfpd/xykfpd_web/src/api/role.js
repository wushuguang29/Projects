import { get, post } from "@/utils/axios";
//获取角色列表
export const getRoleList = (params) => get("/index/role/getList", params);
//添加角色
export const addRole = (params) => post("/index/role/create", params);
//编辑角色
export const editRole = (params) => post("/index/role/update", params);
//删除角色
export const deleteRole = (params) => get("/index/role/delete", params);
//添加角色人员
export const addRoleStaff = (params) =>
  post("/index/roleUsers/addPersonnel", params);
//编辑角色人员
export const editRoleStaff = (params) =>
  get("/index/role/editAccessPermissions", params);
//删除角色人员
export const deleteRoleStaff = (params) =>
  get("/index/roleUsers/delPersonnel", params);
//获取人员列表
export const getRoleGroupList = (params) =>
  get("/index/role/rolePersonnel", params);
//编辑角色访问权限
export const editRoleAccess = (params) =>
  post("/index/role/editAccessPermissions", params);
//获取单条角色信息
export const getRoleById = (params) => get("/index/role/getInfo", params);
//获取角色权限设置回写
export const getRoleTreeById = (params) =>
  get("/index/role/getRolePrivilegesTree", params);
//获取角色可选择机构下拉数据
export const getOrganizationList = (params) =>
  get("/index/organization/getList", params);
