import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import "babel-polyfill";
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";
import "viewerjs/dist/viewer.css";
// import createRouter from './router/index'

import store from "./store/index";
import ElementUI from "element-ui";
import "./styles/element-custom.scss";
import LhWui from "./components";
import router from "./router/index";
// import comFormat from "./utils/comFormat.js";
// import typeData from "@/utils/typeData.js";
import ECharts from "vue-echarts"; // refers to components/ECharts.vue in webpack
import * as echarts from "echarts";
// 防止按钮重复点击
import { preventReClick, allowClick } from "./directive/directive";
// import mock from './mock/index'
// import {
// 	mockXHR
// } from '../mock'
// if (process.env.NODE_ENV === 'development') {
// 	// mockXHR()
// }
// Vue.prototype.$format = comFormat;
// Vue.prototype.$typeData = typeData;
Vue.config.productionTip = false;
Vue.prototype.bus = new Vue();
Vue.config.devtools = true;
Vue.use(ElementUI, {
  size: "mini",
}).use(LhWui);
Vue.component("v-chart", ECharts);
Vue.use(VueRouter);

// Vue.directive('allow', {
// 	inserted: (el, binding, vnode) => {
// 		let permissionList = vnode.context.$route.meta.button;
// 		if (permissionList?.length) {
// 			let index = permissionList.findIndex((value, index, arr) => {
// 				return value.front_router_name == binding.value
// 			})
// 			if (index == -1) {
// 				el.parentNode.removeChild(el);
// 			}
// 		}

// 	}
// })

new Vue({
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
