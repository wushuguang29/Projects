<!--生理订阅-->
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
		<view class="uni-div" v-if="flag">
			<view class="uni_img">
			</view>
			<view class="tan-xf">
				<u-form-item label="订阅人" label-width="180">
					<u-input v-model="form.app_user_member" type="select" @click="chooseSubscription" :selectOpen="false" placeholder="请选择订阅人" />
					<u-select v-model="show" mode="single-column" value-name="id" label-name="name" :list="list" @confirm="memberChange"></u-select>
				</u-form-item>
				<u-modal v-model="modalShow" content="当前无订阅成员,请先添加成员" @confirm="modelConfirm"></u-modal>
			</view>
			<view v-if="type">
				<checkbox-group class="content-class" @change="checkboxGroupChange">
					<view class="uni_checkbox" v-for="item in maleLike" :key="item.index">
						<h3 style="text-indent: 1rem;font-size: 38rpx;line-height: 100rpx;font-family: SourceHanSansCN-Normal;">{{item.domain}}</h3>
						<view class="flex-item">
							<label :class="['item',rec.checked?'active-item':''] " v-for="rec in item.side" @tap="CheckedcClick(rec.side)" :key="rec.value">
								<checkbox :value="rec.side" :checked="rec.checked"></checkbox>
								<view style="width: 100%;"><text class="item-text">{{rec.sides}}</text></view>
								<!-- <u-icon name="checkmark-circle" color="#fff" size="30"></u-icon> -->

							</label>
						</view>
					</view>
				</checkbox-group>
			</view>
			<view v-if="!type">
				<view style="width:100%;visibility:inherit;padding-top: 32%;">
					<view style="width: 45%;height: 10rem;margin: 0 auto;text-align: center;">
						<image src="../../static/no_data.png" style="width: 100%;height: 100%;"></image>
						<view>暂无数据</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<button class="uni-btn" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option: {},
				show: false,
				modalShow: false,
				form: {},
				domain: "",
				maleLike: [],
				checkboxList: [],
				list: [],
				flag: true
			}
		},
		computed: {
			type: function() {
				if (this.maleLike.length) return true
				return false
			}
		},
		onLoad: function(option) {
			console.log("option", option)
			this.option = option;
		},
		onShow: function() {
			// 获取订阅人列表
			this.$ajax.get({
				url: '/api/AppUserMember/getMemberInfo',
			}).then(res => {
				if (res.data.code == 0) {
					this.list = [...res.data.data];
					// 默认写入第一个值
					if (this.list.length != 0) {
						this.form.app_user_member = this.list[0].name;
						this.form.app_user_member_id = this.list[0].id;
					} else {
						this.form.app_user_member = ''
					}
				}
			})
			//获取可选的类别列表
			this.$ajax.get({
				url: '/api/AppUserMember/getSideList',
				param: {
					domain: this.option.type
				},
			}).then(res => {
				if (res.data.code == 0) {
					const data = [...res.data.data];
					console.log("data",data)
				data.forEach(r=>{
					console.log('r',r)
					r.side.forEach(item=>{
						if(item.side.length>6){
							item.sides=item.side.substring(0,6)+'...';
						}else{
							item.sides=item.side
						}
					})
					
				})
					
					
					this.maleLike = data;
					console.log('maleLike',this.maleLike)
				}
			})
		},
		methods: {
			CheckedcClick(e){
				console.log('e',e,e.length);
				if(e.length>6){
					uni.showToast({
						title: e,
						icon: "none"
					});
				}
			
		},
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/subscription/subscription'
				});
			},
			checkboxGroupChange(e) {
				const checkedValue = e.target && e.target.value ? e.target.value : [];
				this.checkboxList = checkedValue;
				var items = this.maleLike,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i].side;
					for (var j = 0, lenJ = item.length; j < lenJ; ++j) {
						const rec = item[j]
						if (values.includes(rec.side)) {
							this.$set(rec, 'checked', true)
						} else {
							this.$set(rec, 'checked', false)
						}
					}

				}
			},
			submit() {
				let arr = [];
				this.checkboxList.forEach(rec => {
					arr.push({
						side: rec
					});
				})
				this.$ajax.post({
					url: '/api/AppUserMember/subscribe',
					data: {
						app_user_member_id: this.form.app_user_member_id,
						domain: this.option.type,
						side: JSON.stringify(arr)
					},
				}).then(res => {
					uni.setStorageSync('memberType', this.form.app_user_member_id);
					if (res.data.code == 0) {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						uni.switchTab({
							url: '/pages/evaluation/evaluation',
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				})
			},
			chooseSubscription() {
				if (this.list.length == 0) {
					this.show = false;
					this.modalShow = true;
				} else {
					this.show = true;
				}
			},
			memberChange(val) {
				this.form.app_user_member = val[0].label;
				this.form.app_user_member_id = val[0].value;
			},
			modelConfirm() {
				uni.reLaunch({
					url: '/pages/me/memberTable'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.uni-btn {
		margin: 59rpx 40rpx 0;
		background: #47C3A8;
		color: #fff;
	}

	.footer {
		color: #fff;
		line-height: 100rpx;
		flex: 0 0 100rpx;
		width: 100%;
		/* 不放大不缩小固定100rpx */
	}

	.uni_checkbox {
		margin: 15% 0 0 6%;
		// border: solid 10rpx #f8f8f8;
		// border-radius: 25rpx;
		width: 90%;
	}



	.item checkbox {
		display: none;
	}

	.on {
		border: none;
		background-color: #47C3A8;
		color: #fff;
	}

	.content-class {
		width: 90%;
		margin: 20upx auto;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

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
		background-color: #f0f2f5;
	}

	.flex-item {
		display: flex;
		flex-wrap: wrap;
        background-color: #fff;
		border-radius: 25rpx;
		.item {
			padding: 10rpx 30rpx;
			font-size: 28upx;
			border-radius: 0upx;
			// text-align: center;
			// box-sizing: border-box;
			border: 1upx solid #47C3A8;
			margin: 20rpx;
			width: 32%;
            
			display: flex;
			-webkit-flex-wrap: wrap;
			flex-wrap: wrap;
		}

		.active-item {
			border: none;
			background-color: #47C3A8;
			color: #fff;
		}
	}
</style>
