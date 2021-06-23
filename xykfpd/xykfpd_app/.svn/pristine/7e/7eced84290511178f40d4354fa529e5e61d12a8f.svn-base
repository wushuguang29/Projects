import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// Vue.prototype.uniUrl ='http://www.xyback.com';
//跳转
import * as navTo from '@/utils/navTo'
Vue.prototype.$navTo = navTo
//拦截器
import ajax from './utils/request.js'
// 引入uview库
import uView from "uview-ui";
//引入vuex
import store from './src/store/index.js'
Vue.use(uView);
//把vuex定义成全局组件
Vue.prototype.$ajax = ajax
Vue.prototype.$store = store
Vue.prototype.checkLogin = function(backpage, backtype) {
	// backpage : 登录后返回的页面 backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
	var userToken = uni.getStorageSync('userToken'); //本地持久化存储
	var rowData = uni.getStorageSync('rowData');
	console.log(userToken)
	if (userToken == '') {
		console.log('/pages/index/login?backpage=' + backpage + '&backtype=' + backtype)
		uni.redirectTo({
			url: '/pages/index/login?backpage=' + backpage + '&backtype=' + backtype,
			success: function() {
				console.log('check-login-success')
			},
			fail:function(){
				console.log('check-login-fail')
			},
			complete:function(){
				console.log('check-login-complete')
			}
		});
		return false;
	}
	return rowData; //已经登录返回数组 [用户 id, 用户随机码, 用户昵称, 用户表情]，以供后续使用用户信息
}
App.mpType = 'app'
// #ifdef APP-PLUS
plus.nativeUI.toast = (function(str, value) {
	if (str == '再按一次退出应用') {
		return false
	}
})
//#endif
const app = new Vue({
	...App,
	store,
	ajax
})
app.$mount()
