const previewImage = {
  state: {
    previewFolderList: [],
    previewCacheFolderId: [],
    previewImageList: [],
    previewFileListParams: {},
    loadData: false,
  },
  getters: {
    getPreviewFolderList: (state) => state.previewFolderList,
    getPreviewCacheFolderId: (state) => state.previewCacheFolderId,
    getPreviewImageList: (state) => state.previewImageList,
    getPreviewFileListParams: (state) => state.previewFileListParams,
    getLoadData: (state) => state.loadData,
  },
  mutations: {
    setPreviewFolderList: (state, previewFolderList) => {
      state.previewFolderList = previewFolderList;
    },
    setPreviewCacheFolderId: (state, previewCacheFolderId) => {
      state.previewCacheFolderId.push(previewCacheFolderId);
    },
    setPreviewImageList: (state, previewImageList) => {
      state.previewImageList = previewImageList;
    },
    setMorePreviewImageList: (state, previewImageList) => {
      state.previewImageList = state.previewImageList.concat(previewImageList);
    },
    setPreviewFileListParams: (state, previewFileListParams) => {
      state.previewFileListParams = previewFileListParams;
    },
    resetPreviewCacheFolderId: (state, previewCacheFolderId) => {
      state.previewCacheFolderId = [];
    },
    setLoadData: (state, loadData) => {
      state.loadData = loadData;
    },
  },
};
export default previewImage;
