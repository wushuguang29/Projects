<template>
	<view class="main">
		<view class="header">
			<view class="uni_voice">
				<view style="display: flex; margin: 0% 0 0 0;font-size: 18px;padding: 4% 0% 0% 5%;">
					<view style="color:#999999; ">评测人</view>
					<view style="margin-left: 4%;font-size: 40rpx;width: 50%;">{{questionItem.name}}</view>
					<view v-if="!aishow">
						<view @tap="playVideo()">{{!flag?'播放':'暂停'}}
							<u-icon :name="!flag?'volume-up':'pause'" color="#47C3A8" size="40"></u-icon>
						</view>
					</view>
					<view v-if="aishow" style=" text-align: center;    position: fixed;left: 80%; top: 4%;">
						<view @click="goto('/pages/advisory/advisory')" style="font-size: 36rpx;">
							<view class="zx">
								<u-icon name="chat" color="#47C3A8" size="50"></u-icon>
								<view style="font-size: 20rpx;">咨询</view>
							</view>
							
						</view>
					</view>
				</view>
				<view class="instruction" @tap='open' v-if="showTips">指导语:{{questionItem.instruction}}</view>
				<u-modal v-model="showInstruction" :content="questionItem.instruction"></u-modal>
			</view>
		</view>
		<view class="content">
			<view class="uni_question">
				<!-- <u-radio-group v-model="value">
					<u-radio shape="circle">月明人倚楼</u-radio>
				</u-radio-group> -->
				<view class="quetion-title">计时:<label style="display:inline-block;width:38px;text-align:right;">{{totalTime}}</label>秒</view>
				<view class="uni_Qucontent" v-if="!aishow">
					<view class="quetion-title question-weight">{{questionIndex+1}}、{{questionItem.question_title}}</view>
					<view>
						<u-radio-group :wrap="true" v-if="questionItem.question_type=='单选'" v-model="checked" size="40" @change="radioGroupChange">
							<u-radio v-for="(item, index) in questionItem.children" :key="index" label-size="38" :name="item.index">{{item.index}}、{{item.option_title}}</u-radio>
						</u-radio-group>
						<u-checkbox-group v-else :wrap="true" @change="checkboxGroupChange" size="40">
							<u-checkbox v-for="(item, index) in questionItem.children" :key="index" label-size="38" v-model="item.checked"
							 :name="item.index">{{item.index}}、{{item.option_title}}</u-checkbox>
						</u-checkbox-group>
					</view>

					<view class="bottom">
						<view style="color:#000000;font-size: 32rpx;text-align: center;">第{{questionIndex+1}}题 <span style="color:#999999; margin-left: 4%;">共
								{{questionArray.length}}题</span></view>
						<view style="display: flex;">
							<button class="uni-btn" @click="previousQuestion" v-if="questionIndex!=0">上一题</button>
							<button class="uni-btn" @click="nextQuestion">{{questionArray.length == questionIndex +1?'提交答题':'下一题'}}</button>
						</view>
					</view>
				</view>
				<u-popup v-model="show" mode="center" border-radius="10" width="450rpx" height="400rpx">
					<view>
						<view style="width: 100%; padding: 16% 0 0 0; text-align: center;overflow: auto;">确定提交此次评测？</view>
						<view style="display: flex;width: 100%;padding:60rpx 0rpx;">
							<u-button type="success" size="default" class="custom-style" @click="Backtoanswer">返回继续</u-button>
							<u-button type="success" size="default" class="custom-style" @click="Endanswer">结束答题</u-button>
						</view>
					</view>
				</u-popup>
				<view class="uni_Qucontent" v-if="aishow">
					<view style="height: 50%;">
						<view>
							<view style="text-align: center; padding: 26% 0 0 0;">
								<p style="line-height: 3rem;">您此次得分:&nbsp{{log.evaluating_score}}</p>
								<p>{{log.evaluating_result}}</p>
							</view>
						</view>

					</view>
					<view class="bottom">
						<view style="display:flex;text-align:center;margin: 34% auto;">
							<button class="uni-btns" @tap="confirm">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				questionArray: [], //所有数据对象
				questionIndex: 0, //当前渲染的下标
				questionVideoIndex: 0,
				questionCheckedIds: {}, //已经答题的数据
				questionData: [], //选中的答题答案
				checked: null, //当前题目答题的答案
				show: false,
				timer: null,
				totalTime: 0, //计时秒
				log: {}, //答题完显示返回数据
				aishow: false,
				flag: false,
				music: null,
				inherit: 'inherit',
				showInstruction: false,
				hidden: 'hidden',
				current: {
					poster: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png',
					name: '语音播放',
					author: '',
					src: '../../../static/obj_wo3DlMOGwrbDjj7DisKw_4259241408_f04a_60d8_0a5e_ee8366475cc11dbe82d466f8f9c36f0b.mp3',
				},
				audioAction: {
					method: 'pause'
				}
			}
		},
		computed: {
			questionItem() {
				if (this.questionArray[this.questionIndex]) {
					return this.questionArray[this.questionIndex]
				} else {
					return {
						name: '',
						instruction: '',
						question_title: '',
						question_type: '',
						children: [],
						id: 0,
						voice: ''
					}
				}
			},
			showTips(){
				// console.log(this.aishow,this.questionItem.instruction)
				if(this.aishow) return false;
				if(!this.questionItem.instruction) return false;
				return true;
			}
		},
		// 关闭页面时，关闭定时间，重置定时时间
		onUnload: function() {
			if (this.timer) {
				clearInterval(this.timer);
				this.totalTime = 0;
				this.music.destroy();
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.option = option;
			this.$ajax.get({
				url: '/api/Evaluating/getQuestionsList',
				param: {
					domain: this.option.domain,
					side: this.option.side,
					app_user_member_id: this.option.type
				},
				header: {
					'Content-Type': 'application/json;charset=UTF-8',
					'x-requested-with': "XMLHttpRequest"
				},
			}).then((res) => {
				this.questionArray = [...res.data.data.result];
				this.questionIndex = 0;
			})
		},
		mounted() {
			this.music = uni.createInnerAudioContext();
			this.timer = setInterval(() => {
				this.totalTime++;
			}, 1000)
		},
		watch: {
			flag: function(val) {
				if (val) {
					this.questionVideoIndex = this.questionIndex;
					this.music.src = this.questionItem.voice; //选择播放的音频
					this.music.play(); //执行播放
				} else {
					if (this.questionVideoIndex == this.questionIndex) {
						this.music.pause();
					} else {
						this.music.stop();
					}
				}
			}
		},
		methods: {
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/subscription/subscription'
				});
			},
			open() {
			if(this.questionItem.instruction.length>52){
				this.showInstruction = true
			}	
				
			},
			shenglue(e) {
				if (e.length > 52) {
					var a = e.substring(0, 52) + '...'
				}
				return a;
			},
			goto(url) {
				uni.redirectTo({
					url: url
				})
			},
			checkboxGroupChange(e) {
				this.checked = e;
				this.checkedIds();
			},
			radioGroupChange(e) {
				this.checked = e;
				this.checkedIds();
			},
			checkedIds() {
				console.log(this.checked)
				const checkedId = this.questionItem.id;
				// const answer = this.checked instanceof Array ? JSON.stringify(this.checked) : this.checked;
				//存数据
				// console.log(answer)
				this.questionCheckedIds[checkedId] = {
					id: checkedId,
					answer: this.checked
				}
			},
			//返回继续答题
			Backtoanswer() {
				this.show = false;
			},
			//结束答题
			Endanswer() {
				const datas = Object.values(this.questionCheckedIds);
				console.log(datas,JSON.stringify(datas))
				this.$ajax.post({
					url: '/api/Evaluating/evaluate',
					data: {
						answer: JSON.stringify(datas),
						evaluating_how_long: this.totalTime
					},
					header: {
						'Content-Type': 'application/json;charset=UTF-8',
						'x-requested-with': "XMLHttpRequest"
					},
				}).then((res) => {
					console.log("res", res)
					this.log = res.data.data;
					this.aishow = true;
					this.show = false;
				})
				clearInterval(this.timer);
			},
			playVideo(e) {
				this.flag = !this.flag;
			},
			confirm(e) {
				uni.switchTab({
					url: '/pages/evaluation/evaluation'
				})
			},
			previousQuestion() {
				this.flag = false;
				this.questionIndex--;
				const nowId = this.questionArray[this.questionIndex].id;
				this.checked = this.questionCheckedIds[nowId].answer;
			},
			nextQuestion() {
				if (!this.checked) return uni.showToast({
					title: "选项不能为空",
					icon: "none"
				});
				console.log(333)
				if (this.questionIndex + 1 == this.questionArray.length) {
					this.show = true;
					return;
				}
				this.checked = null;
				let nextCheckedId = 0;
				if (this.questionIndex < this.questionArray.length) {
					this.questionIndex++;
					if (this.questionArray[this.questionIndex])
						nextCheckedId = this.questionArray[this.questionIndex].id;
				}
				if (this.questionCheckedIds[nextCheckedId]) this.checked = this.questionCheckedIds[nextCheckedId].answer;
				this.flag = false;
			},
		},
	}
</script>

<style lang="scss" scoped>
	/* 	.header,.content{
		margin:1rem;
	} */

	/deep/ .u-radio {
		line-height: 2.8 !important;
	}

	.instruction {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		text-indent: 1em;
		color: #999999;
		width: 95%;
	}

	.quetion-title {
		font-size: 38rpx;
	}

	.question-weight {
		font-weight: bolder;
	}

	.custom-style {
		width: 40%;
		padding-left: 6%;
		padding-top: 11%;
	}

	.uni_Qucontent {
		line-height: 80rpx;
		/* height: 100%; */
	}
    /deep/ .u-radio{
		// position:relative;
    	.u-radio__icon-wrap--circle{
    		    // position: absolute;
    		    // top: 14.8rem;
    		    // right: 2rem;
				position: fixed;
				    left: 85%;
    	}
    }
	/deep/ 
	.u-checkbox{
		.u-checkbox__icon-wrap{
			position: fixed;
			    left: 85%;
		}
	}

	.uni_question {
		padding-top: 5%;
		font-size: 45rpx;
		/* height: 100%; */
		min-height: 25rem;
	}

	.uni_question {
		border: 11rpx solid #FFFFFF;
		/* height: 95%; */
		border-radius: 51rpx;
		background-color: #ffffff;
		margin: 0% auto;

		width: 90%
	}

	audio {
		width: 12rem;
	}

	.bottom {
		color: #fff;
		line-height: 100rpx;
		flex: 0 0 100rpx;
	}

	.u-checkbox {
		float: inherit !important;
	}

	.uni-btn {
		margin: 59rpx 40rpx 0;
		background: #47C3A8;
		color: #fff;
		width: 40%;
	}

	.uni-btns {
		background: #47C3A8;
		color: #fff;
		width: 40%;
	}


	.main {
		width: 100vw;
		height: 100vh;
		background-color: #F8F8FF;
	}

	.header {
		overflow: hidden;
		// height: 25%;
	}

	.uni_voice {
		border: 11rpx solid #FFFFFF;
		// height: 80%;
		border-radius: 25rpx;
		background-color: #ffffff;
		margin: 5% auto;
		margin-bottom: 5%;
		width: 90%
	}
</style>
