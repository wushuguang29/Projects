<template>

	<view v-if="type===true">
		<view style="width: 100%;height: 16rem;margin-bottom: 20rpx;">
			<view style="height: 75%;width:100%;text-align:center;vertical-align:baseline;padding:4% 0 0 0;">
				<image src="../../static/logokf.png" style="width: 50%;"></image>
			</view>
		</view>
		<view class="update-message">
			<view class="update-text">手机号:</view>
			<view class="u-input" style="width: 74%;">
				<input class="uni-input" type="number" @input="phoneChange" v-model="form.phone" placeholder="请输入手机号码" maxlength="11" />
			</view>

		</view>
		<view class="update-message">
			<view class="update-text">验证码：</view>
			<view class="update-input">
				<input class="uni-input" maxlength="6" @input="codeInput" v-model="form.phone_code" type="number" />
				<input class="code" @click="codeChange" disabled="true" type="button" :style="{'background-color':lineColor}"
				 v-model="code">
			</view>
		</view>
		<view style="margin-bottom: 1em;">
			<button class="uni-btns" :style="{'background-color':btnsColor}" @click="loginByPhone">登录</button>
		</view>
		<view>
			<view style="display: flex;padding: 0 0 0 10%;font-size: 30rpx;">
				<view style="width: 250rpx;height: 1px;background: #EEEEEE;border: 1px solid #DFDFDF;margin-top: 15rpx;"></view>
				<view>其他方式</view>
				<view style="width:250rpx;height: 1px;background: #EEEEEE;border: 1px solid #DFDFDF;margin-top: 15rpx;"></view>
			</view>

		</view>
		<view class="qitalogin">
			<!-- #ifdef MP-WEIXIN -->
			<view style="text-align: center;"><button class="uni-btn-vx" open-type="getUserInfo" @getuserinfo="miniProgramLogin"
				 :style='{"background-image":"url("+vx+")"}'></button>
				<view>微信登录</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view style="text-align: center; " @click="appWechatLogin"><button class="uni-btn-vx" :style='{"background-image":"url("+vx+")"}'></button>
				<view>微信登录</view>
			</view>
			<view style="text-align: center; " @click="appAliPayLogin"><button class="uni-btn-vx" :style='{"background-image":"url("+zfb+")"}'></button>
				<view>支付宝登录</view>
			</view>
			<!-- #endif -->
		</view>
	</view>
	<view v-else-if="type===false" style="text-align: center;">
		<image src="../../static/logo.png"></image>
	</view>
	</view>

</template>

<script>
	import config from '../../api/config.js'
	import logo from '../../static/logokf.png'
	import vx from '../../static/vxt.jpg'
	import zfb from '../../static/zfb.jpg'
	let backpage = '',
		backtype = 0;
	export default {
		data() {
			return {
				lineColor: '#adadad',
				btnsColor: '#adadad',
				flag: false,
				code: "获取验证码",
				type: true,
				tips: '',
				vx,
				src: "../../static/logokf.png",
				seconds: 60,
				logo,
				form: {
					login_type: -1
				},
				device: false,
				zfb,

				wechatInfo: null,
			}
		},
		created() {
			console.log('应用版本：', uni.getSystemInfoSync().platform);
			var platform = uni.getSystemInfoSync().platform;
			if (platform === 'android' || platform === 'ios') {
				this.device = true;
			}
		},
		onLoad: function(option) {
			if (option && option.backpage && option.backtype) {
				backpage = option.backpage;
				backtype = option.backtype;
			}
		},
		// #ifdef APP-PLUS
		onShow() {
			var args = plus.runtime.arguments;
			let str = args.replace('hbuilder://','');
			let argsUrl = JSON.parse(decodeURIComponent(str));
			console.log(argsUrl)
			if (argsUrl.auth_code) {
				this.form.login_type =2;
				this.login({login_type:this.form.login_type,auth_code:argsUrl.auth_code})
			}
		},
		// #endif
		methods: {
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/subscription/subscription'
				});
			},
			//app微信授权登录
			appWechatLogin() {
				const that = this;
				uni.getProvider({
					service: 'oauth',
					success(res) {
						if (~res.provider.indexOf('weixin')) {
							that.form.login_type = 4;
							that.getWechatInfo();
						}
					},
					fail() {
						uni.showToast({
							title: "请先安装微信或升级版本3",
							icon: "none"
						})
					}
				})
			},
			//app支付宝授权登录
			appAliPayLogin() {
				console.log('点击支付宝登录');
				//沙箱网关
				//let alipayUrl ='https://openauth.alipaydev.com/oauth2/appToAppAuth.htm?app_id=2021000116687911&scope=auth_user&redirect_uri=https://www.baidu.com';
				let alipayUrl =
					'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021002121607078&scope=auth_user&redirect_uri=https://xykfpdafter.demo.lhsoft.net/alipayAuth';

				//let alipayUrl1 = "https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2021000116687911&redirect_uri=https://www.baidu.com"; 
				let openURL = 'alipays://platformapi/startapp?appId=20000067&url=' + encodeURIComponent(alipayUrl);
				console.log('openURL:' + alipayUrl);
				plus.runtime.openURL(openURL, err => {
					uni.showToast({
						title: '打开支付宝失败！请检查是否已安装？',
						icon: 'none'
					});
				});
			},
			//账号密码登录
			loginByPhone() {
				this.form.login_type = 3;
				const params = Object.assign({}, this.form)
				this.login(params);
			},
			//小程序微信授权登录
			miniProgramLogin(e) {
				if (e.detail.userInfo) {
					this.form.login_type = 1;
					this.getWechatInfo();
				} else {
					uni.showToast({
						title: '微信拒绝登录',
						icon: "none"
					});
				}
			},
			//获取微信授权
			getWechatInfo() {
				const that = this;
				let params = null;
				uni.login({
					provider: "weixin",
					success(res) {
						console.log('get-wechat-res', res);
						uni.getUserInfo({
							provider: 'weixin',
							success: (info) => {
								console.log('get-wechat-info', info);
								// miniprogram授权登录
								if (that.form.login_type == 1) {
									params = {
										encryptedData: info.encryptedData,
										signature: info.signature,
										rawData: info.rawData,
										iv: info.iv,
										code: res.code,
										login_type: that.form.login_type
									};
									console.log(params);
								} else if (that.form.login_type == 4) {
									params = {
										login_type: that.form.login_type,
										openId: info.userInfo.openId,
										nickName: info.userInfo.nickName,
										avatarUrl: info.userInfo.avatarUrl
									}
								}
								that.login(params);
							},
							fail: () => {
								uni.showToast({
									title: "微信登录授权失败",
									icon: "none"
								});
							}
						})
					},
					fail() {
						uni.showToast({
							title: "请先安装微信或升级版本",
							icon: "none"
						})
					}
				})
			},
			//通用登录方法
			login(params) {
				console.log('login-params', params)
				console.log('backtype-login', backtype)
				this.$ajax.get({
					url: '/api/login/login',
					param: params,
				}).then((res) => {
					const response  = res.data;
					this.form.phone_code = '';
					if (response) {
						if (response.code == 0) {
							const responseData = response.data;
							uni.setStorageSync('rowData', responseData);
							uni.setStorageSync('userToken', "Bearer " + responseData.token);
							if(!responseData.phone){
								uni.redirectTo({
									url: '/pages/me/bindPhone'
								});
							}else{
								if (backtype == 1) {
									uni.redirectTo({
										url: '/' + backpage
									});
								} else if (backtype == 2) {
									uni.switchTab({
										url: '/' + backpage
									});
								}
							}
						}
						uni.showToast({
							title: response.msg,
							icon: "none"
						})
					} else {
						uni.showToast({
							title: '登录失败',
							icon: "none"
						})
					}
				})
			},
			//验证码
			codeChange() {
				console.log()
				if (this.code !== 0 && this.code != "获取验证码") {
					return
				}
				var regPhone = (/^(13[0-9]|14[1579]|15[0-3,5-9]|16[6]|17[0123456789]|18[0-9]|19[89])\d{8}$/); //手机号码

				if (!regPhone.test(this.form.phone)) {
					uni.showToast({
						title: '请正确输入手机号',
						icon: "none"
					})
				} else {
					if (this.form.phone) {
						if (this.code != "获取验证码") {
							uni.showToast({
								title: '请稍后再试',
								icon: "none"
							})
						} else {
							this.code = 60;
							var jian = setInterval(() => {
								this.code--
								if (this.code == 0) {
									clearInterval(jian)
									this.code = "获取验证码"
								}
							}, 1000)
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
								console.log(res)
								this.form.phone_key = res.data.data.phone_key;
								console.log("this.form", this.form);
							})
						}
					} else {
						uni.showToast({
							title: '手机号不能为空',
							icon: "none"
						})
					}
				}

			},
			getCode() {
				let that = this;
				if (this.$refs.uCode.canGetCode) {
					that.$ajax.get({
						url: '/index/login/sendCode',
						param: {
							phone: that.form.phone
						},
						header: {
							'Content-Type': 'application/json;charset=UTF-8',
							'x-requested-with': "XMLHttpRequest"
						},
					}).then((res) => {
						console.log(res)
						that.form.phone_key = res.data.phone_key;
						that.form.phone_code = res.data.phone_code;
					})
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						console.log("进入")
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			},
			codeInput(e) {
				if (this.form.phone_code != undefined && this.form.phone != undefined) {
					console.log(this.form.phone, this.form.phone_code)
					this.btnsColor = '#47C3A8'
				} else {
					this.btnsColor = '#adadad'
				}
			},
			phoneChange(e) {
				if (this.form.phone != undefined && this.form.phone_code != undefined) {
					console.log(this.form.phone, this.form.phone_code)
					this.btnsColor = '#47C3A8'
				} else {
					this.btnsColor = '#adadad'
				}
				console.log("e", e);
				let a = e.detail.value.split('');
				console.log("a", a)
				if (a.length == 11) {
					var regPhone = (/^(13[0-9]|14[1579]|15[0-3,5-9]|16[6]|17[0123456789]|18[0-9]|19[89])\d{8}$/);
					if (!regPhone.test(e.detail.value)) {
						this.lineColor = '#adadad'

						uni.showToast({
							title: '手机号格式错误',
							icon: 'none'
						});
					} else {

						this.lineColor = '#47C3A8'

					}
				} else {
					this.lineColor = '#adadad'
				}
			}
		}
	}
</script>

<style>
	/* input {
	width: 100%;
	
	border: 2rpx solid red;
	} */
	.uni-btn-vx {
		margin: 59rpx 40rpx 0;
		width: 50px;
		height: 50px;
		border-radius: 50%;

		font-family: -webkit-body;
		font-family: -webkit-body;
		font-family: -webkit-body;
		font-family: -webkit-body;
		font-family: -webkit-body;
		background: #47C3A8;
		color: #fff;

		font: status-bar;
		outline: none;
		background-size: 100%;
	}

	.qitalogin {
		display: flex;
		padding: 0 0 0 26%;
	}

	.wrap {
		padding: 24rpx;
	}

	.uni-btn {
		margin: 59rpx 40rpx 0;
		background: #47C3A8;
		color: #fff;
	}

	.uni-btns {
		margin: 59rpx 40rpx 0;

		color: #fff;
	}

	.uni-name {
		float: left
	}

	.uni-column {

		border-bottom: 1px solid #333333;
		display: flex;
		font-size: 28rpx;
		justify-content: space-between;
		padding: 20rpx 0;
		margin: 0 40rpx;
		align-items: center;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.u-input {
		width: 58%;

	}

	.title {
		width: 20%
	}

	.uni-yzm {
		width: 22%
	}

	/* 更改手机号 */
	.update-message {
		background-color: #fff;
		height: 95upx;
		line-height: 95upx;
		font-size: 32upx;
		display: flex;
		border-bottom: 2upx solid #e4e4e4;
	}

	/* 文字 */
	.update-text {
		flex: 3;
		text-align: right;
		font-size: 43rpx;
		font-weight: 500;
	}

	/* 右侧input框 */
	.update-input {
		flex: 7;
		display: flex;
	}

	/* .codefalse:{flex: 3;font-size: 25upx;text-align: center;background:#ADADAD;height:95upx;line-height:95upx;color: #fff;float: right;} */
	/* 获取验证码 */
	.code {
		flex: 3;
		font-size: 25upx;
		text-align: center;
		background: #47C3A8;
		height: 95upx;
		line-height: 95upx;
		color: #fff;
		float: right;
	}

	/* 验证码 */
	.uni-input {
		flex: 7;
		padding: 4%;
		font-size: 43rpx;
		font-weight: 500;
	}
</style>
