<template>
	<view>
		<view class="update-message">
			<view class="update-text">用户名:</view>
			<view class="u-input" style="width: 74%;">
				<input class="uni-input" v-model="form.name" name="number" />
				
				</view>
		
		</view>
		<view style="margin-bottom: 1em;">
			<button class="uni-btn" @click="submit">提交</button>
		</view>
		
	</view>
</template>

<script>
	import {updateUserInfo} from '@/utils/commonFunction.js'
export default {
	data() {
		return {
			form: {
				
			},
			myData:{},
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}
				]
			}
		};
	},
	onShow:function(option){
		this.form= uni.getStorageSync('rowData');
	},
	methods: {
		onBackPress(event) {
			uni.switchTab({
				url: '/pages/subscription/subscription'
			});
		},
		submit() {
			let that=this;
				if(that.form.name){
					that.$ajax.post({
						url: '/api/AppUsers/changeName',
						data: that.form,
						header: {
							'Content-Type':'application/json;charset=UTF-8',
										'x-requested-with':"XMLHttpRequest",
												
						},
					}).then((res) => {
					    updateUserInfo(this,'/pages/me/info',1);
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					})
				}else{
					uni.showToast({
						title:'用户名不能为空',
						icon:"none"
					})
					
				}
		},
		
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		
	}
};
</script>
<style>
	.uni-btn {
		margin: 59rpx 40rpx 0;
		background: #47C3A8;
		color: #fff;
	}
	
	page{background-color: #f1f1f1;}
	/* 更改手机号 */
	.update-message{background-color: #fff;height:95upx;line-height: 95upx;font-size: 32upx;display: flex;border-bottom:2upx solid #e4e4e4;}
	/* 文字 */
	.update-text{flex: 3;text-align: right;font-size: 43rpx; font-weight: 500;}
	/* 右侧input框 */
	.update-input{flex: 7;display: flex;}
	/* 获取验证码 */
	.code{flex: 3;font-size: 25upx;text-align: center;background:#47C3A8;height:95upx;line-height:95upx;color: #fff;float: right;}
	/* 验证码 */
	.uni-input{flex: 7;padding: 4%;font-size: 43rpx; font-weight: 500;}
	
</style>