<template>
	<view class="uni-div" v-if="Object.keys(this.fromData).length==0">
		<view class="uni-div2">
			<p class="uni_p">
				<image src="../../static/no_data.png" style="width: 100%;height: 100%;"></image>
			</p>
			<p style="text-align: center;font-size: 60rpx; padding-top: 10rpx;">{{msg}}</p>
		</view>
	</view>
	<view style="width: 100%;" v-else>
		<view class="uni-form-item uni-column" v-for="(user,i) in fromData" :key="user.app_user_member_id" @click="getUpdateInfo($event,user)">
			<view class="title" style="width: 90%;">
				<p class="uni-name" style="font-size: 18px;width: 90%;">{{user.name}}</p>
				<p class="uni-name" style="color:#C9C9C9;font-size: 14px;width: 90%;">{{user.phone}}</p>
			</view>
			<view class="u-input">
				<u-icon name="arrow-right" color="#C0C0C0" width="200" height="200"></u-icon>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromData: {
				},
				msg: '数据加载中',
			}
		},
		methods: {
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/subscription/subscription'
				});
			},
			member() {
				uni.redirectTo({
					url: '/pages/me/member?flag=false',
				});
			},
			getUpdateInfo(e, f) {
				uni.redirectTo({
					url: '/pages/evaluation/evaluationResult?id=' + f.app_user_member_id + '&&flag=true',
				});
			}
		},
		onShow: function(option) {
			this.$ajax.get({
				url: '/api/Evaluating/getAssessorList',
			}).then((res) => {
				if (res.data.code == 0) {
					this.fromData = res.data.data;
					if (Object.keys(this.fromData).length == 0) {
						this.msg = "暂无数据";
					}
				}
			})
		}
	}
</script>

<style>
	.uni-icon {
		color: #47C3A8;
		display: -webkit-box;
		/* display: -webkit-flex;
		      display: flex; */
		font-size: 28rpx;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		padding: 20rpx 0;
		margin: 0 40rpx;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.wrap {
		padding: 24rpx;
	}

	.uni-btn {
		margin: 59rpx 40rpx 0;
		background: #47C3A8;
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
		width: 5%;

	}

	.title {
		width: 20%
	}

	.uni-yzm {
		width: 22%
	}

	.uni_p {
		width: 35%;
		height: 9rem;
		margin: 40% 0 0 32%;
		position: 1;
	}

	.uni-div {
		width: 100%;
		min-height: 40rem;
		height: 100%;
	}

	.uni-div2 {
		height: 100%;
		width: 100%;
	}
</style>
