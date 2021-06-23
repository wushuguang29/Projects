
import {get,post} from '@/utils/axios'
//获取机构列表
export const getBaseDataList=(params) =>get('/index/data/getResourcesTree',params)
//获取共享数据列表
export const getShareList=(params)=>get('/index/data/getShareList',params)
//获取共享权限下拉接口
export const getShareSelectList=(params)=>get('/index/data/getShareSelectData',params)
//获取共享权限下拉搜索接口
export const getShareTargetList=(params)=>get('/index/data/getSearchTargetData',params)
//保存共享数据
export const saveShareData=(params)=>post('/index/data/setShareData',params)
//删除共享
export const deleteShare=(params)=>post('/index/data/delete',params)
//设置公共权限
export const saveCommonPermission=(params)=>post('/index/data/saveCommon',params)