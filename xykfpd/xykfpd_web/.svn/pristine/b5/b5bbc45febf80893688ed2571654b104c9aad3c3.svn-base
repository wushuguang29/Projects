import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import grid from "./commonModules/grid";
import 'babel-polyfill';
Vue.use(Vuex);
const now = new Date();
const store = new Vuex.Store({
    state: {
        // 当前用户
        user: {
            name: 'coffce',
            img: 'dist/images/1.jpg'
        },
        // 会话列表
        sessions: [
            {
                id: 1,
                user: {
                    name: '示例介绍',
                    img: 'dist/images/2.png'
                },
                messages: [
                    {
                        content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                        date: now
                    }, {
                        content: '项目地址: https://github.com/coffcer/vue-chat',
                        date: now
                    }
                ]
            },
            {
                id: 2,
                user: {
                    name: 'webpack',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            }
        ],
        // 当前选中的会话
        currentSessionId: 1,
        // 过滤出只包含这个key的会话
        filterKey: ''
    },
    mutations: {
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // 发送消息
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        // 选择会话
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        } ,
        // 搜索
        SET_FILTER_KEY (state, value) {
            state.filterKey = value;
        }
    }
});
store.watch(
  (state) => state.sessions,
  (val) => {
      console.log('CHANGE: ', val);
      localStorage.setItem('vue-chat-session', JSON.stringify(val));
  },
  {
      deep: true
  }
);

const vuexPersisted = new persistedState({
  key: "VuexPersisted",
  storage: window.sessionStorage,
  reducer: (state) => ({
    // 需要持久化的值
    user: state.user,
    menu: state.menu,
  }),
});
// require.context(directory:String/*读取文件的路径*/,useSubdirectories:Boolean/*是否遍历文件的子目录*/,regExp:RegExp/*匹配文件的正则*/)：获取一个特定的上下文,主要用来实现自动化导入模块
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
export const actions = {
  initData: ({ dispatch }) => dispatch('INIT_DATA'),
  sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
  selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
  search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
};
export default new Vuex.Store({
  state: {
    // 当前用户
    user: {
        name: 'coffce',
        img: '@/assets/img/images/1.jpg'
    },
    // 会话列表
    sessions: [
        {
            id: 1,
            user: {
                name: '示例介绍',
                img: '@/assets/img/images/2.png'
            },
            messages: [
                {
                    content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                    date: now
                }, {
                    content: '项目地址: https://github.com/coffcer/vue-chat',
                    date: now
                }
            ]
        },
        {
            id: 2,
            user: {
                name: 'webpack',
                img: '@/assets/img/images/3.jpg'
            },
            messages: []
        }
    ],
    // 当前选中的会话
    currentSessionId: 1,
    // 过滤出只包含这个key的会话
    filterKey: ''
},  mutations: {
  INIT_DATA (state) {
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
          state.sessions = JSON.parse(data);
      }
  },
  // 发送消息
  SEND_MESSAGE ({ sessions, currentSessionId }, content) {
      let session = sessions.find(item => item.id === currentSessionId);
      session.messages.push({
          content: content,
          date: new Date(),
          self: true
      });
  },
  // 选择会话
  SELECT_SESSION (state, id) {
      state.currentSessionId = id;
  } ,
  // 搜索
  SET_FILTER_KEY (state, value) {
      state.filterKey = value;
  }
},
  modules: {
    ...modules,
    baseUser: {
      // 用户管理
      namespaced: true,
      modules: {
        list: grid, //主列表
        orgTree: grid, //设置>组织机构树
        roleList: grid, //设置>角色列表
        accessTree: grid, //设置>访问权限树
        dataList: grid, //设置>数据权限列表
      },
    },
    baseRole: {
      // 角色管理
      namespaced: true,
      modules: {
        list: grid,
        group: grid,
        ungroup: grid,
      },
    },
    baseResources: {
      // 角色管理
      namespaced: true,
      modules: {
        list: grid,
        group: grid,
        ungroup: grid,
      },
    },
    baseOrganization: {
      // 组织管理
      namespaced: true,
      modules: {
        list: grid,
        group: grid,
        ungroup: grid,
      },
    },
    basePermission: {
      namespaced: true,
      modules: {
        list: grid,
        shareList: grid,
      },
    },
    baseSystemConfig: {
      namespaced: true,
      modules: {
        list: grid,
      },
    },
    baseArchives: {
      namespaced: true,
      modules: {
        comprehensiveConfigList: grid,
        resourceConfigList: grid,
        resourceBindList: grid,
        resourceUnbindList: grid,
        comprehensiveList: grid,
        resourceList: grid,
        comprehensiveTreeData: grid,
        resourceTreeData: grid,
        comprehensiveFolderData: grid,
        resourceFolderData: grid,
      },
    },
    logManagement: {
      //日志管理
      namespaced: true,
      modules: {
        list: grid,
      },
    },
    flow: {
      //审批
      namespaced: true,
      modules: {
        list: grid,
        group: grid,
        ungroup: grid,
      },
    },
    evaluation: {
      namespaced: true,
      modules: {
        list: grid,
      },
    },
    research: {
      //摸底
      namespaced: true,
      modules: {
        list: grid,
        auditList: grid,
      },
    },
    automaticResponse: {
      //自动回复
      namespaced: true,
      modules: {
        list: grid,
        auditList: grid,
      },
    },
  },
  plugins: [vuexPersisted],
});
