import {get,post} from '@/utils/axios'
//获取路由列表
export const getResourcesList=(params) =>get('/getResourcesList',params);
//添加路由
export const addResources = (params) =>post('/resources/create',params)
//编辑路由
export const editResources = (params) =>post('resources/update',params)
//删除路由
export const deleteResources =(params) =>get('resources/destroy',params);
//获取路由下拉列表
export const getParentList=(params)=>get('/resources/getParentList',params)