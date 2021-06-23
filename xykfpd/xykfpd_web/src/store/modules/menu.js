import { getMenu } from "@/api/user";
const menu = {
  state: {
    menu: [],
    currentMenu: [],
    topMenu: [],
    currentIndex: 0,
    defaultActiveMenu: "0",
  },
  getters: {
    menu: (state) => state.menu,
    currentMenu: (state) => state.currentMenu,
    topMenu: (state) => state.topMenu,
    currentIndex: (state) => state.currentIndex,
    defaultActiveMenu: (state) => state.defaultActiveMenu,
  },
  mutations: {
    setMenu: (state, menu) => {
      state.menu = menu;
      let topMenu = [];
      menu.forEach((element) => {
        topMenu.push({
          title: element.title,
          name: element.front_router_name,
        });
      });
      state.topMenu = topMenu;
    },
    setCurrentMenu: (state, index) => {
      state.currentMenu = state.menu[index].children
        ? state.menu[index].children
        : [];
      state.currentIndex = index;
    },
    setCurrentMenuFromTag: (state, route) => {
      let pid = route.meta.pid;
      let key = "";
      state.menu.forEach((e, i) => {
        if (e.id == pid) {
          key = i;
        } else {
          e.children && matchingMenu(e.children, i);
        }
      });
      function matchingMenu(menu, index) {
        menu.forEach((item) => {
          if (item.id == pid) {
            key = index;
          } else {
            item.children && matchingMenu(item.children, index);
          }
        });
      }
      if (key === "") return;
      state.defaultActiveMenu = route.name;
      state.currentMenu = state.menu[key].children
        ? state.menu[key].children
        : [];
      state.currentIndex = key.toString();
    },
    setDefaultActiveMenu: (state, routeName) => {
      state.defaultActiveMenu = routeName;
    },
  },
  actions: {
    getMenu({ commit }) {
      return new Promise((resolve, reject) => {
        getMenu().then((res) => {
          if (res.data.length) {
            commit("setMenu", res.data);
            commit("setCurrentMenu", 0);
            resolve();
          } else {
            commit("setToken", null);
            commit("setUserInfo", {});
            commit("isLogin", false);
            reject();
          }
        });
      });
    },
  },
};

export default menu;
