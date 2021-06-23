import config from '../api/config.js'
import navTo from '@/utils/navTo'

//  公共的方法
const baseUrl = config.host; // 请求地址
const $ajax = {
	get: function({
		url,
		param,
		header
	}) {
		return new Promise(function(resolve, reject) {
			console.log("ssss")
			let myData = uni.getStorageSync('userToken');
			myData = JSON.stringify(myData);
			uni.request({
				url: baseUrl + url,
				data: param,
				method: "GET",
				dataType: 'json',
				header: {
					'Authorization': uni.getStorageSync('userToken')
				},
				header: {
					'Authorization': myData
				},
				success: function(res) {
					if (res.statusCode !== 200) {
						reject(res);
					} else {
						if (res.data.code == 40003 || res.data.code == 40002) {
							uni.redirectTo({
								url: '/pages/index/login'
							});
							uni.showToast({
								title: '请先登录',
								duration: 2000,
								icon: "none"
							});
						} else if (res.data.code == 49001) {
							uni.redirectTo({
								url: '/pages/me/bindPhone'
							});
							uni.showToast({
								title: '请先绑定手机号',
								duration: 2000,
								icon: "none"
							});
						}
						resolve(res);
					}
				},
				fail: function(err) {
					reject(err);
				}
			})
		})
	},
	post: function({
		url,
		data,
		header
	}) {
		return new Promise(function(resolve, reject) {
			console.log('data-post',data);
			uni.request({
				url: baseUrl + url,
				data: data,
				method: "POST",
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': uni.getStorageSync('userToken')
				},
				success: function(res) {
					if (res.statusCode !== 200) {
						reject(res)
					} else {
						if (res.data.code == 40003) {
							uni.navigateTo({
								url: '/pages/index/login'
							});
							uni.showToast({
								title: '请先登录',
								duration: 2000,
								icon: "none"
							});
						} else if (res.data.code == 49001) {
							uni.navigateTo({
								url: '/pages/index/updatePhone'
							});
							uni.showToast({
								title: '请先绑定手机号',
								duration: 2000,
								icon: "none"
							});
						}
						resolve(res);
					}
				},
				fail: function(err) {
					reject(err)
				}
			})
		})
	},
	postJSON: function({
		url,
		data,
		header
	}) {
		return new Promise(function(resolve, reject) {
			console.log('data-postJSON',data);
			uni.request({
				url: baseUrl + url,
				data: data,
				method: "POST",
				header: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
				success: function(res) {
					if (res.statusCode !== 200) {
						reject(res)
					} else {
						resolve(res);
					}
				},
				fail: function(err) {
					reject(err)
				}
			})
		})
	},
	upImg: function({
		url,
		imgUrl
	}) {
		return new Promise(function(resolve, reject) {
			uni.uploadFile({
				url: "baseUrl" + url,
				filePath: imgUrl,
				name: 'file',
				success: function(uploadFileRes) {
					resolve(uploadFileRes);
				},

				fail: function(err) {
					reject(err)
				}
			});
		})
	}
}
export default $ajax;
