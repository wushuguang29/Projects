<template>
	<view>
		<u-form :model="form" ref="uForm" label-align="left" label-width="200rpx" :error-type="errorType">
			<u-form-item label="手机号码" prop="phone" :required="true">
				<u-input v-model="form.phone" type="number" placeholder="请输入联系电话" />
			</u-form-item>
			<u-form-item label="验证码" prop="phone_code" :required="true">
				<u-input v-model="form.phone_code" placeholder="请输入验证码" />
				<button @tap="getCode" class="code-style" :disabled="verifyPhone">{{codeText}}</button>
			</u-form-item>
		</u-form>
		<button class="uni-btn" @click="submit" :disabled="confirmBtn">确定</button>
	</view>
</template>
<script>
	import {updateUserInfo} from '@/utils/commonFunction.js'
	export default {
		data() {
			return {
				form: {
					phone: '',
					phone_code: '',
					phone_key:''
				},
				errorType: ['message'],
				rules: {
					phone: [{
						required: true,
						message: '请输入联系电话',
						trigger: ['change', 'blur'],
						pattern: /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/
					}],
				},
				timer:60,
				pageTimer:null
			}
		},
		computed: {
			verifyPhone: function() {
				if (this.form.phone && this.form.phone.length == 11 && this.timer == 60) return false;
				return true
			},
			confirmBtn:function(){
				if (this.form.phone && this.form.phone.length == 11 && this.form.phone_code && this.form.phone_key) return false;
				return true
			},
			codeText:function(){
				if(this.timer == 60)return '获取验证码';
				return this.timer+'s重新获取验证码'
			}
		},
		methods: {
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/subscription/subscription'
				});
			},
			getCode() {
				uni.showToast({
				    title: '验证码已发送',
				    duration: 2000
				});
				this.pageTimer = setInterval(() => {
					if(this.timer>0){
						this.timer--;
					}else{
						clearInterval(this.pageTimer)
						this.timer = 60;
					}
				}, 1000);
				this.$ajax.get({
					url: '/index/login/sendCode',
					param: {
						phone: this.form.phone
					},
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then((res) => {
					this.form.phone_key = res.data.data.phone_key;
				})
			},
			submit() {
				this.$ajax.post({
					url: '/api/AppUsers/changePhone',
					data: this.form,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then((res) => {
					this.form.phone_code = ""
					if (res.data.code == 0) {
						updateUserInfo(this,'/pages/me/info',1);
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-form-item {
		.u-form-item--left__content--required {
			left: 0rpx;
		}
		.u-form-item--left__content {
			font-size: 38rpx;
		}
		.u-form-item--left__content__label {
			text-indent: 28rpx;
		}
	}
	.uni-btn {
		margin: 59rpx 40rpx 0;
		background: #47C3A8;
		color: #fff;
	}
	.code-style {
		width: 278rpx;
		position: absolute;
		right: 0;
		top: 0;
		height: 108rpx;
		line-height: 108rpx;
		background-color: #47C3A8;
		color: #fff;
		border: transparent;
		border-radius: unset;
		z-index: 999;
	}
</style>
