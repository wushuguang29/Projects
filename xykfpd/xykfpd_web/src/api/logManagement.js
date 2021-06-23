import {get,post} from '@/utils/axios'

// 登录日志
export const getLoginLog=(params) =>get('/index/log/login',params);
// 操作日志
export const getOperateLog=(params) =>get('/index/log/operate',params);