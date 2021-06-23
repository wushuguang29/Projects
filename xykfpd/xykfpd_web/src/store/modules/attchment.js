import {
  getAttachmentFolderList,
  getAttachmentFileList,
} from "@/api/attachment.js";
const attachment = {
  state: {
    attachmentIsFolderView: true,
    attachmentFolderList: [],
    attachmentFolderFileList: [],
    attachmentFolderParams: {
      resources_id: 0,
      target_id: 0,
      affiliation_type: 0,
      folder_id: 0,
      target_id: 0,
    },
  },
  getters: {
    getAttachmentIsFolderView: (state) => state.attachmentIsFolderView,
    getAttachmentFolderListStore: (state) => state.attachmentFolderList,
    getAttachmentFolderListParams: (state) => state.attachmentFolderParams,
    getAttachmentFolderFileListStore: (state) => state.attachmentFolderFileList,
  },
  mutations: {
    setAttachmentIsFolderView: (state, attachmentIsFolderView) => {
      state.attachmentIsFolderView = attachmentIsFolderView;
    },
    setAttachmentFolderList: (state, attachmentFolderList) => {
      state.attachmentFolderList = attachmentFolderList;
    },
    setAttachmentFolderListParams: (state, attachmentFolderParams) => {
      Object.assign(state.attachmentFolderParams, attachmentFolderParams);
    },
    setAttchamentFolderFileList: (state, attachmentFolderFileList) => {
      state.attachmentFolderFileList = attachmentFolderFileList;
    },
    setPushAttachmentFolderFileList: (state, attachmentFolderFileList) => {
      state.attachmentFolderFileList = state.attachmentFolderFileList.concat(
        attachmentFolderFileList
      );
    },
  },
  actions: {
    getAttachmentFolderListData({ commit }, params) {
      return new Promise((resolve, reject) => {
        getAttachmentFolderList(params).then((res) => {
          commit("setAttachmentFolderList", [...res.data]);
          resolve();
        });
      });
    },
    getAttachmentFileListData({ commit }, params) {
      return new Promise((resolve, reject) => {
        getAttachmentFileList(params).then((res) => {
          if (params.needPush) {
            commit("setPushAttachmentFolderFileList", [...res.data.data]);
          } else {
            commit("setAttchamentFolderFileList", [...res.data.data]);
          }
          resolve();
        });
      });
    },
  },
};
export default attachment;
