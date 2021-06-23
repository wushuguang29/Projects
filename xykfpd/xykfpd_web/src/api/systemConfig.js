import { get, post } from '@/utils/axios'
//获取角色列表
export const getSystemConfig = (params) => get('/index/config/getList', params);
//编辑配置
export const editSystemConfig = (params) => get('/index/config/editConfig', params)