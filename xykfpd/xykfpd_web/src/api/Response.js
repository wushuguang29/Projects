/*
 * @Author: your name
 * @Date: 2021-01-25 16:09:21
 * @LastEditTime: 2021-01-25 16:36:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_web\src\api\information.js
 */
import {get,post} from '@/utils/axios'

// 获取列表
export const getList=(params) =>get('index/AutoResponse/getList',params);
//添加
export const create=(params) =>post('index/AutoResponse/create',params);

//修改
export const update=(params) =>post('index/AutoResponse/update',params);
//删除
export const deleteData=(params) =>get('index/AutoResponse/delete',params);

 