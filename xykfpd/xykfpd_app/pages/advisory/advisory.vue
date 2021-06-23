<template>
	<view class="box-container">
		<view class="content-container">
			<view v-for="item in message_array">
				<view class="item-box item-box-left" v-if="item.from_id==999999">
					<u-avatar :src="sysSrc"></u-avatar>
					<view class="left-icon text-box">
						<i class="left-icon-l"><em class="b_ico_b1"></em></i>
						<view v-html="item.content"></view>
					</view>
				</view>
				<view v-else class="text-r item-box item-box-right">
					<view class="left-icon text-box">
						<i class="left-icon-r"><em class="b_ico_b1"></em></i>
						<view v-html="item.content"></view>
					</view>
					<u-avatar :src="avatar!=''?avatar:src"></u-avatar>
				</view>
			</view>
		</view>
		<view class="advisory-box">
		<clear-input 
		       style="width: 80%;"
		        :value="formData.recordInput"
		        
		       placeholder="请输入咨询内容" 
		        type="string"
				:flag="flag"
				@clearInputValue="clearInputValue"
		        @getInputValue="getInputValue"
				@confirm="sendMessage($event)" 
		    />
			<!-- <input type="text" :auto-height="true"  placeholder="请输入咨询内容" v-model="formData.recordInput" confirm-type="完成" @confirm="sendMessage($event)" /> -->
			<button type="default" class="ad-btn" @tap="sendMessage">发送</button>
		</view>
	</view>
	</view>
</template>

<script>
	import img from '@/static/bottom_us1.png'
   import clearInput from '@/components/xiaowu-input/clear-input.vue'
      
	export default {
	  components:{
		  clearInput
	  },
		data() {
			return {
				flag:false,
				avatar: '',
				src: img,
				message_array: [],
				itemAverageHeight: 500, //每条数据平均高度，为确保能滚到底部，可以设置大一些
				scrollTop: 9999,
				inputBottom: 0,
				formData: {},
				flag: false,
				sysSrc: 'https://xykfpdafter.demo.lhsoft.net/static/avatar.png',
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
			};
		},
		methods: {
			 getInputValue(e) {
			        console.log(e)
					this.formData.recordInput=e.value
			      },
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/subscription/subscription'
				});
			},
			//发送消息
			sendMessage: function(e) {
				console.log("id", this.formData,e)
				if (this.formData.recordInput == "" || this.formData.recordInput == undefined || this.formData.recordInput == null) {
					uni.showToast({
						title: "请输入您所要咨询的事情",
						icon: "none"
					})
					return
				}
				let params = {
					'sender': this.formData.id,
					'sender_name': this.formData.name,
					'receiver': 999999,
					'receiver_name': '湘雅康复评定中心',
					'message': this.formData.recordInput,

				}
				this.$ajax.post({
					url: '/chat/sendMessage',
					data: params,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then((res) => {
					console.log(this.formData.id + '发送消息给管理员');
					// this.setMessage(this.formData.id);
					params = {
						'from_id': this.formData.id,
						'from_name': this.formData.name,
						'to_id': 999999,
						'to_name': '湘雅康复评定中心',
						'content': this.formData.recordInput,
						'updateTime': 1,
						send_time: new Date(),
					}
					this.message_array.push(params)
					console.log('clear-input');
					this.formData.recordInput = '';
					// this.$refs.valueInput.value=''
					this.flag=true
					this.scrollToBottom();
					
				})
                   this.flag=false
			},
			setMessage: function(app_user_id) {
				let setMessageParams = {
					'app_user_id': app_user_id
				};

				this.$ajax.get({
					url: '/chat/getUserMessage',
					param: setMessageParams,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then((res) => {
					console.log(res.data.data);
					this.message_array = res.data.data.data;
					this.scrollToBottom();
				})
			},
			getUserMessage(user_id) {
				let params = {
					app_user_id: user_id
				};
				console.log(params);
				this.$ajax.get({
					url: '/chat/getUserMessage',
					param: params,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then((res) => {
					console.log('获取用户消息成功');
					console.log(res)
					this.scrollToBottom();
				})
			},
			scrollToBottom() {
				this.$nextTick(function() {
					uni.pageScrollTo({
						duration: 0,
						scrollTop: 999999
					})
				})

			},
		},
		onLoad() {
			const userToken = uni.getStorageSync('userToken');
			console.log("userToken", userToken)
			var url = 'pages/advisory/advisory'
			var that = this;
			let formData = {}
			formData = uni.getStorageSync('rowData');
			this.formData = formData;
			console.log('mydata', formData)
			this.avatar = this.formData.avatar

			try {
				//链接WebSocket服务器

				uni.connectSocket({
					// url: 'ws://120.24.26.46:8282', //仅为示例，并非真实接口地址。
					url: 'wss://kfpd.chengtouyun.com'
					// url:'ws://127.0.0.1:8282'
				});
				// this.socketOpen = true;
				//查看链接是否已打开
				uni.onSocketOpen(function(res) {
					console.log('监听到WebSocket链接已打开');
				});

				//监听链接是出错吴
				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
					console.log(res);

				});

				//监听消息
				uni.onSocketMessage(function(res) {
					console.log('收到服务器内容：' + res.data);

					// console.log(''+JSON.parse(res.data));
					var data = JSON.parse(res.data);
					var params = {
						unique_uid: formData.id,
						client_id: data.client_id,
					};
					// 
					console.log(data.type);
					switch (data.type) {
						case "init":
							that.$ajax.post({
								url: '/chat/boundClient',
								data: params,
								header: {
									'Content-Type': 'application/json;charset=UTF-8',
									'x-requested-with': "XMLHttpRequest"
								},
							}).then((res) => {
								console.log('用户客户端绑定成功');
								console.log(res);
								if (res.data.code == 0) {
									//后台获取自动回复列表

								}

							})
							break;
						case "message":

							console.log('接收到了消息');
							that.setMessage(formData.id);

							break;

						default:
							console.log('走了默认');
							// console.log(data);
							console.log('接收消息时打印');
							// this.setMessage(formData.id)
							break;
					}
				});
				console.log('aaa');
				//将历史聊天消息加载进去
				// this.getUserMessage(this.formData.id);
				this.setMessage(this.formData.id);
				//进入聊天窗口，标记所有消息已读
				var readParam = {
					'app_user_id': this.formData.id,
					'type': 1
				};
				that.$ajax.post({
					url: '/chat/markRead',
					data: readParam,
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then((res) => {
					console.log(this.formData.name + '的消息都已读');
				});
			} catch (error) {
				console.log("异常");
				console.log(error);
			}
		},
	};
</script>

<style lang="scss" scoped>
	/deep/ .box{
		border: 2rpx solid #f8f8f8;
	}
	 .ad-btn{
		font-size: 34rpx;
	}
	.box-container {

		.content-container {
			padding: 10rpx;
			margin-bottom: 100rpx;
		}

		.text-r {
			text-align: right;
		}

		.item-box {
			display: flex;
			margin: 10rpx 0;
		}

		.item-box-right {
			justify-content: flex-end;

			.left-icon {
				margin-right: 24rpx;

				.left-icon-r {
					border-width: 16rpx;
					border-style: solid;
					border-color: transparent #dbdbdb;
					border-right-color: transparent;
					position: absolute;
					top: 15rpx;
					right: -32rpx;

					.b_ico_b1 {
						border-width: 14rpx;
						border-style: solid;
						border-color: transparent #fff;
						border-right-color: transparent;
						position: absolute;
						top: -14rpx;
						right: -9rpx;
					}
				}
			}
		}

		.item-box-left {
			justify-content: flex-start;

			.left-icon {
				margin-left: 24rpx;

				.left-icon-l {
					border-width: 16rpx;
					border-style: solid;
					border-color: transparent #dbdbdb;
					border-left-color: transparent;
					position: absolute;
					top: 15rpx;
					left: -32rpx;

					.b_ico_b1 {
						border-width: 14rpx;
						border-style: solid;
						border-color: transparent #fff;
						border-left-color: transparent;
						position: absolute;
						top: -14rpx;
						left: -9rpx;
					}
				}
			}
		}

		.text-box {
			border: 1px solid #dbdbdb;
			border-radius: 12rpx;
			padding: 10rpx;
			background-color: #fff;
			position: relative;
		}

		.advisory-box {
			position: fixed;
			display: flex;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			padding: 10rpx;
			height: 100rpx;

			input {
				border: 1px solid #eee;
				padding: 10rpx;
				width: 80%;
				height: 56rpx;
			}

			.ad-btn {
				width: 140rpx;
				border: none;
				background-color: #47C3A8;
				color: #fff;
				border-radius: none;
			}
		}
	}
</style>
