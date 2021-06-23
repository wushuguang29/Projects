import { get, post } from "@/utils/axios";
/* 附件 */
//获取附件文件夹列表
export const getAttachmentFolderList = (params) =>
  get("/index/attachment/getFolders", params);
//获取附件文件夹内文件列表
export const getAttachmentFileList = (params) =>
  get("/index/attachment/getFiles", params);
//获取附件文件夹内上传文件
export const uploadFile = (params) => post("/index/attachment/upload", params);
//删除附件文件夹内文件
export const deleteFile = (params) => get("/index/attachment/delete", params);
//附件文件下载
export const downloadFile = (params) =>
  get("/index/attachment/download", params);
//附件文件夹内文件重命名
export const renameFile = (params) => post("/index/attachment/rename", params);
/* 预览 */
//获取预览图片
export const getPreviewImageList = (params) =>
  get("/index/archives/imagePreview", params);
