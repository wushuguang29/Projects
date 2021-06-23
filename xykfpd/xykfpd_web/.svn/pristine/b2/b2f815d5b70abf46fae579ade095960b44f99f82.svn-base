
import {get,post} from '@/utils/axios'
//获取机构列表
export const getOrganizationList=(params) =>get('/index/organization/getList',params)
//添加机构
export const addOrganization=(params) =>post('/index/organization/save',params)
//编辑机构
export const editOrganization=(params) =>post('/index/organization/update',params)
//删除机构
export const deleteOrganization=(params) =>post('/index/organization/delete',params)
//编辑机构访问权限
export const editOrganizationAccess=(params) =>post('/index/organization/editAccessPermissions',params)
//机构绑定人员
export const addOrganizationStaff=(params) =>post('/index/organization/addPersonnel',params)
//机构解绑人员
export const deleteOrganizationStaff=(params) =>post('/index/organization/delPersonnel',params)
//查看机构绑定人员或未绑定人员 用type区分 1表示已绑定人员  2 未绑定人员
export const getOrganizationGroupList =(params) =>get('/index/organization/organizationPersonnel',params)
//获取权限树
export const getOrganizationTree=(params) => get('/index/organization/getOrganizationPrivilegesTree',params)
//获取单条机构数据
export const getOrganizationById=(params) => get('/index/organization/getInfo',params)