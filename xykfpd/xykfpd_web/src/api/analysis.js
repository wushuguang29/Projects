/*
 * @Author: your name
 * @Date: 2021-01-19 10:50:45
 * @LastEditTime: 2021-01-19 10:51:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_web\src\api\analysis.js
 */
import { get, post } from "@/utils/axios";
export const getList = (params) =>  get("index/StatisticalAnalysis/getList", params);
//方面
export const getSideList = (params) =>  get("index/StatisticalAnalysis/getSideList", params);