const tag = {
  state: {
    // 当前激活tag项
    activeName: "user",
    // tag数组
    tagArr: [
      // {
      //   path: "/Desktop",
      //   title: "工作桌面",
      //   name: "Desktop",
      // },
    ],
  },
  getters: {
    activeName: (state) => state.activeName,
    tagArr: (state) => state.tagArr,
    tagNames(state) {
      return state.tagArr.map(function (item) {
        return item.name;
      });
    },
  },
  mutations: {
    setActiveName: (state, activeName) => {
      state.activeName = activeName;
    },
    setTagArr: (state, arr) => {
      state.tagArr = arr;
    },
    //添加tag
    addTag: (state, options) => {
      console.log(options);
      state.tagArr.push({
        ...options,
      });
    },
    delTag: (state, tabIndex) => {
      console.log(state, tabIndex);
      if (typeof tabIndex == "string") {
        tabIndex = state.tagArr.findIndex((value) => value.name == tabIndex);
      }
      state.tagArr.splice(tabIndex, 1);
      console.log(state.tagArr);
    },
    // 删除其他或全部tab
    delTags(state, routeName) {
      if (routeName) {
        state.tagArr = state.tagArr.filter((v) => {
          return v.name == "Desktop" || v.name === routeName;
        });
      } else {
        state.tagArr = state.tagArr.filter((v) => {
          return v.name == "Desktop";
        });
      }
    },
  },
  actions: {
    createTagPanel({ state, commit }, options) {
      let s = state.tagArr.filter(function (item, index) {
        if (item.name === options.name) {
          return item;
        }
      });
      if (s.length) {
        commit("setActiveName", options.name);
      } else {
        commit("addTag", {
          ...options,
        });
        commit("setActiveName", options.name);
      }
      if (options.vm) {
        options.vm.$router.push({
          name: options.name,
          params: options.params,
          query: options.query,
        });
      }
    },
    delOtherTagPanel({ state, commit }, option) {
      //关闭tabPanel
      let { vm, routeName } = option;
      commit("delTags", routeName);
      commit("setActiveName", routeName);
      vm.$router.push({
        name: routeName,
      });
    },
    delAllTabPanel({ state, commit }, vm) {
      //关闭tabPanel
      commit("delTags");
      vm.$router.push({
        path: "/desktop",
      });
    },
  },
};
export default tag;
