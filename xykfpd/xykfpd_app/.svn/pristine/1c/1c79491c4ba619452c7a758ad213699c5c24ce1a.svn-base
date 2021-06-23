<template>
	<view class="content">
		<view class="text-area" :style='{"background-image":"url("+img+")"}'>
			<view class="zixun" @tap='advisory'><span class="zixun_text">咨询</span></view>
		</view>
		<view class="tan-xf">
			<view class="tan-left" @click="avater">
				<u-avatar :src="myData.avatar" size="140"></u-avatar>
			</view>
			<view class="tan-rigths">
				<view style="    padding: 0.5rem 0 0 0.5rem; padding-bottom: 0.6rem;font-size: 35rpx;font-weight: 700;">
					<h3>{{myData.name}}</h3>
				</view>
				<view><span style="padding: 0 0 0 0.5rem;font-size: 34rpx;font-weight: 400;color: #adadad;">{{myData.phone==null?"":myData.phone}}</span></view>
			</view>
			<view class="tan-rigthtwo" @click="goto('/pages/me/memberTable')">
				<view style="height: 50%;text-align: -webkit-center;margin-top: 0.5rem;">
					<view style="width:50%;height: 100%">
						<image src="../../static/home_menber.png" style="width: 100%;height: 100%;"></image>
					</view>

				</view>
				<view style="display: flex; color: rgb(71, 195, 168);margin: 8% 0 0 0.6rem;">
					<view style="padding-right: 0.3rem;font-size: 88%;padding-top: 0%;">成员管理</view>
					<view>
						<image src="../../static/home_back.png" mode="" style="width: 15px;height: 15px"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="tan-main-wrap">
			<view class="tan_center">
				<view class="tan-list-box" style="margin: 0% 10% 0 10%;" @click="goToUrl(1)">
					<view class="tan-img-pic">
						<image src="../../static/home_xwei.png" mode="widthFix" style="width:100%,height: 204rpx!important;"></image>
					</view>
					<view class="tan-list-title">
						<span class="tan-span">生理</span>
					</view>
				</view>
				<view class="tan-list-box" @click="goToUrl(2)">
					<view class="tan-img-pic">
						<image src="../../static/home_xinli.png" mode="widthFix" style="height: 200rpx;"></image>
					</view>
					<view class="tan-list-title">
						<span class="tan-span">心理</span>
					</view>
				</view>
				<view class="tan-list-box" style="margin: 0% 10% 0 10%;" @click="goToUrl(3)">
					<view class="tan-img-pic">
						<image src="../../static/home_yund.png" mode="widthFix" style="height: 200rpx;"></image>
					</view>
					<view class="tan-list-title">
						<span class="tan-span">行为</span>
					</view>
				</view>
				<view class="tan-list-box" @click="goToUrl(4)">
					<view class="tan-img-pic">
						<image src="../../static/home_shehui.png" mode="widthFix" style="height: 200rpx;"></image>
					</view>
					<view class="tan-list-title">
						<span class="tan-span">社会</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import img from '@/static/home_bg.png'
	export default {
		data() {
			return {
				// flag: false,
				title: 'Hello',
				myData: {},
				img
			}
		},
		onLoad: function() {
			const loginStatus = this.checkLogin('pages/subscription/subscription', 2);
			if (!loginStatus) return false;
		},
		onShow:function(){
			this.myData = uni.getStorageSync('rowData');
		},
		methods: {
			goToUrl(val) {
				uni.redirectTo({
					url: '/pages/subscription/subscriptionDetail?type=' + val,
				});
			},
			advisory() {
				uni.redirectTo({
					url: '/pages/advisory/advisory',
				});
			},
			avater() {
				uni.switchTab({
					url: "/pages/me/me"
				});
			},
			goto(url) {
				uni.redirectTo({
					url: url
				})
			}
		},
	}
</script>

<style>
	.tan-rigths {
		width: 50%
	}

	.tan-rigthtwo {
		width: 26.5%;
	}

	.tan-left {
		width: 25%;
		padding-right: 0.5rem;
		margin-left: 0.6rem;
		border-radius: 81rpx;

	}

	.tan-rigth {
		width: 70%;

	}

	.tan_center {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		height: 76%;
		width: 80%;
		margin: auto 7%;
	}

	.tan-xf {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		border: 0.1rem solid #f5f5f5;
		position: fixed;
		padding: 0rem;
		left: 33rpx;
		right: 0;
		bottom: 10rpx;
		width: 90%;
		height: 5rem;
		background-color: #fff;
		border-radius: 6px;
		-moz-border-radius: 25px;
		top: 5rem;

	}

	.tan-main-wrap {
		display: flex;
		flex-flow: wrap;
		width: 100%;
		height: 100%;
		text-align: center;
	}

	.tan-list-box {

		width: 30%;
		background-color: #fff;
		/* border-radius: 8px; */
		/* border:1px solid #f5f5f5; */
		overflow: hidden;
		margin: 0 0 0 3rem;
	}

	.tan-img-pic {
		width: 100%;

	}

	.tan-img-pic>image {
		width: 100%;

	}

	.tan-list-title {
		margin: 20rpx;
		font-size: 30rpx;
		background: url('../../static/home_title.png');
		background-size: 100% 25%;
		background-position: 0.1rem 1.5rem;
		background-repeat: no-repeat;
		height: 2rem;

	}

	.tan-span {
		/* font-size: 1.2rem; */
	}

	.loginBtn {
		width: 100%;
		margin: 59rpx 40rpx 0;
		background: linear-gradient(to left, #00ffff, #0000ff);
		color: #fff;
	}

	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.zixun {
		height: 2rem;
		width: 3rem;
		border: 2rpx solid #fff;
		margin: 0 0 0 85%;
		border-radius: 50%;
		text-align: -webkit-center;
	}

	.zixun_text {
		font-size: 1rem;
		color: #fff;
		font-weight: 400;
		width: 2.5rem;
	}

	.text-area {
		width: 100%;
		margin-top: 5px;
		display: flex;
		justify-content: center;
		border-bottom: 1px solid #f5f5f5;
		padding-bottom: 2em;
		background-size: cover;
		height: 8rem;
		margin-top: 0;
		margin-bottom: 3rem
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
