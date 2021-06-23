<template>
	<view>
		<view style="margin: 0 auto;text-align: center;">
			<u-avatar :src="src" size="large" mode="square" sex-icon="close"></u-avatar>
		</view>
		<u-button @click="upload">上传头像</u-button>
	</view>
</template>

<script>
	import config from '@/api/config.js'
	import {
		updateUserInfo
	} from '@/utils/commonFunction.js'
	export default {
		data() {
			return {
				src: "",
				filesArr: [],
				formData: {},
				fileList: "",
			}
		},
		onShow: function(option) {
			const userInfo = uni.getStorageSync('rowData');
			this.src = userInfo.avatar;
		},
		methods: {
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/subscription/subscription'
				});
			},
			upload() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: config.host + '/api/AppUsers/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'Authorization': uni.getStorageSync('userToken'),
								'Content-Type':'application/json;charset=UTF-8',
											'x-requested-with':"XMLHttpRequest"
							},
							formData: {},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								let rowData=uni.getStorageSync('rowData')
								console.log('rowData',rowData,data)
								if (data.code == 0) {
									updateUserInfo(this, '/pages/me/info');
									uni.showToast({
										title: data.msg,
										icon: "none"
									});
									rowData.avatar=data.data.path;
									uni.setStorageSync('rowData',rowData)
									console.log('图片上传成功');
									uni.switchTab({
										url: '/pages/me/me'
									});
									
								} else {
									uni.showToast({
										title: "操作失败",
										icon: 'none'
									});
								}

							}
						});
					}
				});
			},
		}
	}
</script>

<style>
</style>
