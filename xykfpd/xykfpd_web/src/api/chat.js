/*
 * @Author: your name
 * @Date: 2020-12-26 13:48:32
 * @LastEditTime: 2021-02-04 12:00:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_web\src\api\chat.js
 */
import { get, post } from "@/utils/axios";
export const boundClient = (params) =>  post("/chat/boundClient", params);
export const sendMessage = (params) =>  post("/chat/sendMessage", params);
export const getUserMessage = (params) =>  get("/chat/getUserMessage", params);
export const getUserList = (params) =>  get("/chat/getUserList", params);
export const markRead = (params) =>  post("/chat/markRead", params);
export const getUserMemberList = (params) =>  get("/chat/getUserMemberList", params);
export const getAutoMessage = (params) =>  get("/chat/getAutoMessage", params);