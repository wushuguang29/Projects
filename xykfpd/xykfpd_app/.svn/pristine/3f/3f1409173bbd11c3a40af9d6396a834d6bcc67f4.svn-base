<template>
	<view class="body">
		<view class="uni-div" v-if="!flag">
			<view class="uni-div2">
				<p class="uni_p">
					<image src="../../static/no_data.png" style="width: 100%;height: 100%;"></image>
				</p>
				<p>暂无数据</p>
			</view>
		</view>

		<view class="uni-div">
			<view class="uni_img">
			</view>
			<view class="tan-xf">
				<u-form-item label="订阅人" label-width="180">
					<u-input v-model="form.app_user_member" type="select" @click="chooseSubscription" placeholder="请选择订阅人" />
					<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm" value-name="id" label-name="name"></u-select>
				</u-form-item>
				<u-modal v-model="modalShow" content="当前无订阅成员,请先添加成员" @confirm="modelConfirm"></u-modal>
			</view>
			<view class="xiabanbufen" v-if="type">
				<checkbox-group class="content-class">
					
					<view class="uni_checkbox" v-for="item in maleLike" :key="item.index">
						<h3 style="text-indent: 1rem;font-size: 38rpx;line-height: 100rpx;font-family: SourceHanSansCN-Normal;">{{item.domain}}</h3>
						<view class="flex-item">
							<label class="item active-item" v-for="(rec,index) in item.side" :key="index" @longpress="CheckedcClick(rec.side)" @click="clickItem($event,rec.side,item.index)">
								<checkbox :value="rec.side"></checkbox>
								<view style="width: 88%;"><text class="item-text">{{rec.sides}}</text></view>
								<view class="icon-v-right"></view>
							</label>
						</view>
					</view>
				</checkbox-group>
			</view>
			<view class="xiabanbufen" v-if="!type">
				<view style="width:100%;visibility:inherit;padding-top: 32%;">
					<view style="width: 45%;height: 10rem;margin: 0 auto;text-align: center;">
						<image src="../../static/no_data.png" style="width: 100%;height: 100%;"></image>
						<view>暂无数据</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import img from '@/static/my_bg.png'
	export default {
		data() {
			return {
				maleLike: [],
				// currentArr: [], // 当前用户想要的选项，最大为5
				// oldArr: [], // 上一次的返回值
				// hasPass: false, // 用户之前是否选择过，是为true
				show: false,
				form: {},
				// type: false,
				list: [],
				flag: true,
				img,
				modalShow:false
			}
		},
		computed: {
			type: function() {
				if (this.maleLike.length) return true
				return false
			}
		},
		onLoad:function(){
			const loginStatus = this.checkLogin('pages/evaluation/evaluation',2);
			if (!loginStatus) return false;
		},
		onShow:function(){
			let memberId = uni.getStorageSync('memberType');
			// 获取订阅人列表
			this.$ajax.get({
				url: '/api/AppUserMember/getMemberInfo',
			}).then(res => {
				if (res.data.code == 0) {
					this.list = [...res.data.data];
					// 默认写入第一个值
					if (this.list.length != 0) {
						if(memberId){
							this.form.app_user_member_id = memberId;
							const index = this.list.findIndex(each=>each.id == memberId);
							this.form.app_user_member = this.list[index].name;
						}else{
							this.form.app_user_member = this.list[0].name;
							this.form.app_user_member_id = this.list[0].id;
						}
						this.getBindItem(this.form.app_user_member_id);
					}
				}
			})

		},

		methods: {
			CheckedcClick(e){
					console.log('e',e);
				uni.showToast({
					title: e,
					icon: "none"
				});
			},
			getBindItem(id){
				this.$ajax.get({
					url: '/api/Evaluating/getMemberSideList',
					param: {
						app_user_member_id: id,
					},
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then(res => {
					if(res.data.code == 0){
						console.log('data.data',res.data.data)
						this.maleLike = [...res.data.data];
						this.maleLike.forEach(r=>{
							console.log('r',r)
							r.side.forEach(item=>{
								if(item.side.length>5){
									item.sides=item.side.substring(0,5)+'...';
								}else{
									item.sides=item.side
								}
							})
							
						})
					}
				})
			},
			clickItem(e,side,domain) {
				uni.setStorageSync('memberType', this.form.app_user_member_id);
				uni.reLaunch({
					url: '/pages/evaluation/questionBank?type=' + this.form.app_user_member_id + '&&side=' + side +
						'&&domain=' + domain
				})
			},
			chooseSubscription() {
				if (this.list.length == 0) {
					this.show=false;
					this.modalShow = true;
				}else{
					this.show=true;
				}
			},
			modelConfirm(){
				uni.reLaunch({
					url: '/pages/me/memberTable'
				})
			},
			confirm(e) {
				this.form.app_user_member = e[0].label;
				this.form.app_user_member_id = e[0].value;
				this.$ajax.get({
					url: '/api/Evaluating/getMemberSideList',
					param: {
						app_user_member_id: this.form.app_user_member_id,
					},
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then(res => {
					let data = res.data.data;
					if (data.length == 0) {
						this.type = false;
						console.log("1", this.type);
					} else {
						this.type = true;
						console.log("2", this.type)
						data.forEach(item => {
							item.side.forEach(long => {
								long.isChecked = false;
								long.domain = item.domain
							});
						})
					}
					this.maleLike = data;
					console.log("maleLike", this.maleLike)
				})


			},


		}

	}
</script>

<style lang="scss" scoped>
	// .body{
	// 	min-height: 100vh;
	// 	height: 100% ;
	// }
	.xiabanbufen {
		    min-height: 100%;
		    background-color: #f0f2f5;
	}

	.content-class {
		width: 90%;
		margin: 20upx auto;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;


	}

	.footer {
		color: #fff;
		line-height: 100rpx;
		flex: 0 0 100rpx;
		/* 不放大不缩小固定100rpx */
	}

	/* 心理 */
	.uni_checkbox {
		margin: 12% 0 0 5%;
		// border: solid 10rpx #f8f8f8;
		// border-radius: 25rpx;
		width: 90%;
	}

	.item checkbox {
		display: none;
	}

	/* 	界面 */
	.uni-form-item,
	.uni-column {
		margin: 4% 0% 0% 26%;
	}

	.tan-xf {
		display: flex;
		border: 0.1rem solid #f5f5f5;
		position: absolute;
		padding: 0rem;
		margin: -4% 0 0 5%;
		width: 90%;
		height: 4rem;
		background-color: #fff;
		border-radius: 6px;
		-moz-border-radius: 25px;
		padding: 0 0 0 10%;
	}

	.uni_img {
		background-image: url(../../static/bg.png);
		background-size: 100% 100%;

		background-repeat: no-repeat;
		height: 6rem;
	}

	.uni_p {
		width: 35%;
		height: 14rem;
		margin: 50% 0 0 32%;
		position: 1;
	}

	.uni-div {
		width: 100%;

		height: 100%;
	}

	.uni-div2 {
		height: 100%;
		width: 100%;
	}

	.body {
		width: 100vw;
		height: 100vh;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.flex-item {
		display: flex;
		flex-wrap: wrap;
		border: solid 10rpx #f8f8f8;
		border-radius: 25rpx;
		background: #f8f8f8;
		.item {
			padding: 10rpx 36rpx;
			font-size: 28upx;
			border-radius: 0;
			// text-align: center;
			// box-sizing: border-box;
			border: 1upx solid #47C3A8;
			    display: flex;
			    -webkit-flex-wrap: wrap;
			    flex-wrap: wrap;
			margin: 20rpx;
			width: 30%;
		}
		.active-item {
			// border: none;
			// background-color: #47C3A8;
			color: #47C3A8;
		}
		
		.icon-v-right {
		    width: 20rpx;
		    height: 20rpx;
		    border: 5rpx solid #47C3A8;
		    border-width: 5rpx 5rpx 0 0;
		    transform: rotate(45deg);
			    margin: 10rpx 0 0 0;
		}
	}
</style>
