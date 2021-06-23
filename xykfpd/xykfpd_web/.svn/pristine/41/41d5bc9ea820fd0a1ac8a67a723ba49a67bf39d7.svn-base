import {
  getBaseConfig,
  login,
  logout,
  refreshConfig
} from '../../api/user.js'
const user = {
  state: {
    userInfo: null,
    token: '',
    config: null,
    isLogin: false
  },
  getters: {
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
    config: (state) => state.config,
    isLogin: (state) => state.isLogin,
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setToken(state, token) {
      state.token = token
    },
    setBaseConfig(state, baseConfig) {
      state.config = baseConfig
    },
    isLogin(state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {
    login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          console.log('login:', res)
          const tokenV = res.data.token;
          commit('setToken', tokenV);
          delete res.data.token
          commit('setUserInfo', res.data);
          commit('isLogin', true);
          resolve(res);
        }).catch(error => {
          console.log("登录失败")
          reject(error)
        })
      })
    },
    getBaseConfig({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getBaseConfig().then(res => {
          if (res.data) {
            commit('setBaseConfig', res.data)
          }
          resolve(res.data);
        }).catch(error => {
          console.log("获取配置失败")
          reject(error)
        })
      })
    },
    logOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          const tokenV = res.data.token;
          commit('setToken', null);
          commit('setUserInfo', {});
          commit('isLogin', false);
          resolve();
        }).catch(error => {
          console.log("退出失败")
          reject(error)
        })
      })
    },
    refreshBaseConfig({
      commit
    }) {
      return new Promise((resolve, reject) => {
        refreshConfig().then(res => {
          if (res.data) {
            commit('setBaseConfig', res.data);
            location.reload();
          }
          resolve(res.data);
        }).catch(error => {
          console.log("刷新配置失败")
          reject(error)
        })
      })
    }
  }
}
export default user