import {get,post} from '@/utils/axios'
// 登录等需要配置url的api
export const login=(params) =>post('/index/login',params);