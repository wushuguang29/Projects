// 此处可放置grid公共操作逻辑 列表请求、删除等
import { MessageBox, Message } from "element-ui";
const grid = {
  namespaced: true,
  state() {
    return {
      gridData: [],
      total: 0,
      requestFun: null,
      loading: true,
    };
  },
  getters: {
    gridData: (state) => state.gridData,
    total: (state) => state.total,
    requestFun: (state) => state.requestFun,
    loading: (state) => state.loading,
  },
  mutations: {
    setGridData: (state, res) => {
      if (res instanceof Array) {
        state.gridData = res;
      } else {
        state.gridData = res.data;
        state.total = res.total;
      }
    },
    setListFun: (state, fun) => {
      state.requestFun = fun;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    initGridData: (state) => {
      state.gridData = [];
    },
  },
  actions: {
    getGridData({ commit, state }, config) {
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        // list为请求api方法，params为请求参数
        const pageParams = {
          page: 1,
          limit: 25,
          start: 0,
        };
        let list = config && config.list ? config.list : state.requestFun;
        let params = config.list ? config.params : config;
        if (!params || !params.page) {
          params = Object.assign(params || {}, pageParams);
        }
        if (config && config.list) {
          commit("setListFun", config.list);
        }
        list(params ? params : {}).then((res) => {
          if (res.code == 0) {
            commit("setGridData", res.data);
            commit("setLoading", false);
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    },
    deleteGrid({ commit, state }, config) {
      if (!config || !config.deleteFun || !config.params) return false;
      return new Promise((resolve, reject) => {
        let msg = config.msg ? config.msg : "此操作将永久删除该数据, 是否继续?";
        MessageBox.confirm(msg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            config.deleteFun(config.params).then((res) => {
              resolve(res);
            });
          })
          .catch(() => {
            Message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
  },
};
export default grid;
