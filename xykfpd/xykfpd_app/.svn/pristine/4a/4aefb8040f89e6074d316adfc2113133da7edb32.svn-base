<template>
	<view style="width: 100%;">
		<view class="uni-form-item uni-column" v-for="(user,i) in fromData.data" :key="user.id" @click="getUpdateInfo($event,user)">
			<view class="title" style="width: 90%;">
				<text class="uni-name" style="font-size: 18px;width: 90%;">{{user.name}}</text>
				<text class="uni-name" style="font-size: 14px;color:#C9C9C9;margin-top: 10rpx;">{{user.phone}}</text>
			</view>
			<view class="u-input">
				<u-icon name="arrow-right" color="#C0C0C0" width="200" height="200"></u-icon>
			</view>

		</view>
		<view class="uni-icon" @click="member">
			<u-icon name="plus-circle" color="#47C3A8" width="400" height="400"></u-icon>添加成员
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromData: {

				}
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
					url: '/pages/me/member?id=' + f.id + '&&flag=true',
				});
			}
		},
		onShow: function(option) {
			this.$ajax.get({
				url: '/api/AppUserMember/getMemberInfo',
				param: {

				},
				header: {
					'Content-Type': 'application/json;charset=UTF-8',
					'x-requested-with': "XMLHttpRequest",

				},
			}).then((res) => {
				console.log(res)
				this.fromData = res.data;

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
		font-size: 40rpx;
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
</style>
