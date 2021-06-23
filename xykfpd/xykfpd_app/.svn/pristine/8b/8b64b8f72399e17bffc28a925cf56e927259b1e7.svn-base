<template>
	<view style="background-color: #f9f9f9;min-height: 46rem;">
		<view style="width: 100%;background-color: #FFFFFF;">
			<view class="uni_flex" v-for="(item,index) in myData" @click="Preview(item)" :key="index">
				<view class="pic-style" v-if="item.textType==1">
				<image src="../../static/PDF.png" style="width:100%;height: 100%;"></image>
				</view>
				<view class="pic-style" v-if="item.textType==2">
				<image src="../../static/work.png" style="width:100%;height: 100%;"></image>
				</view>
				<view class="pic-style" v-if="item.textType==3">
				<image src="../../static/excel.png" style="width:100%;height: 100%;"></image>
				</view>
				<view class="pic-style" v-if="item.textType==4">
				<image src="../../static/RAR.png" style="width:100%;height: 100%;"></image>
				</view>
				<view class="pic-style" v-if="item.textType==5">
				<image src="../../static/video.png" style="width:100%;height: 100%;"></image>
				</view>
				<view class="pic-style" v-if="item.textType==6">
				<image :src="item.url" style="width:100%;height: 100%;"></image>
				</view>
				<view class="pic-style" v-if="item.textType==7">
				<image src="../../static/weizhi.png" style="width:100%;height: 100%;"></image>
				</view>
				<view class="uni_font"><h5>{{item.name}}</h5></view>
				<view style="margin: 10rpx auto;">
					<u-icon name="arrow-right" color="#C0C0C0" size="36" ></u-icon>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import config from '@/api/config.js'
	export default {
		data(){
			return{
				myData:{},
				path:"",
				src:"",
				recordId:0,
				isPreview: false
			}
		},
		onLoad: function (option) { 
			this.recordId = option.type;
			this.myData=option
		},
		onShow:function() {
			this.intList();
			console.log("config.host",config.host)
		},
		methods:{
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/subscription/subscription'
				});
			},
			intList(){
				this.$ajax.get({
					url: '/api/Folder/getFileList',
					param: {
						id:this.recordId
					},

				}).then((res) => {
					res.data.data.data.forEach(item=>{
						let path=item.path
						item.url = config.host+'/uploads/'+item.savepath+'/'+item.savename;
						//获取最后一个.的位置
						var index= path.lastIndexOf(".");
						//获取后缀
						var ext = path.substr(index+1);
						//输出结果
						console.log("ext",ext);
						if(this.isAssetTypeAnPDF(ext)){
							item.textType=1
						}else if(this.isAssetTypeAnDoc(ext)){
							item.textType=2
						}else if(this.isAssetTypeAnXls(ext)){
							item.textType=3
						}else if(this.isAssetTypeAnRAR(ext)){
							item.textType=4
						}else if(this.isAssetTypeAnVideo(ext)){
							item.textType=5
						}else if(this.isAssetTypeAnImages(ext)){
							item.textType=6
						}else{
							item.textType=7
						}
						
					})
					this.myData= res.data.data.data;
					console.log(this.myData)
				}) 
			},
			 isAssetTypeAnPDF:function(ext) {
			  return ['pdf'].
			  indexOf(ext.toLowerCase()) !== -1;
			},
			isAssetTypeAnDoc:function(ext) {
			  return [
			 'doc','docx',].
			  indexOf(ext.toLowerCase()) !== -1;
			},
			isAssetTypeAnXls:function(ext) {
			  return [
			 'xls', 'xlsx'].
			  indexOf(ext.toLowerCase()) !== -1;
			},
			isAssetTypeAnFile:function(ext){
				return [
				 'pdf','doc','docx','xls', 'xlsx'].
				  indexOf(ext.toLowerCase()) !== -1;
				
			},
			isAssetTypeAnImages:function(ext) {
			  return [
			 'jpeg', 'gif', 'jpg', 'png', 'bmp', 'pic',].
			  indexOf(ext.toLowerCase()) !== -1;
			},
			isAssetTypeAnRAR:function(ext) {
			  return [
			 'rar', 'zif', 'gz'].
			  indexOf(ext.toLowerCase()) !== -1;
			},
			isAssetTypeAnVideo:function(ext) {
			  return [
			 'mp4', 'mov', 'avi','rmvb','mkv','mov','ogg','mod'].
			  indexOf(ext.toLowerCase()) !== -1;
			},
			Preview(e){
				console.log("e",e)
				this.$ajax.get({
							url: '/api/Folder/browseFile',
							// 文件ID
							param: {
								id:e.id
							},
							header: {
								'Content-Type':'application/json;charset=UTF-8',
								'x-requested-with':"XMLHttpRequest"
							},
						}).then((res) => {
							console.log("res",res)							
							//文件路径
							let path=res.data.data.path
							//获取最后一个.的位置
							var index= path.lastIndexOf(".");
							//获取后缀
							var ext = path.substr(index+1);
							//输出结果
							console.log("ext",ext);
							// console.log("该文件是否为文件：" + this.isAssetTypeAnImage(ext));
							if(this.isAssetTypeAnFile(ext)){
								this.isPreview=true
								uni.downloadFile({
								  url:config.host+"/uploads/"+path,
								  success: function (res) {
									 console.log("path",path)
								    var filePath = res.tempFilePath; // blob地址
								    uni.openDocument({
									  filePath:filePath,
								      success: function (res) {
								        console.log('打开文档成功',res);
								      }
								    });
								  }
								});
							}else if(this.isAssetTypeAnImages(ext)){
								
								let i=[];
								i.push(config.host+"/uploads/"+path);
								console.log("i",i);
								this.isPreview=true
								uni.previewImage({
											current:0, //预览图片的下标
											urls:i, //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
											success() {
											           console.log('成功')
											         },
											         fail() {
											           console.error('失败')
											         },
											         complete() {
											           console.log('are you ok?')
											         }
										})
							}else{
								let video=config.host+"/uploads/"+path
								console.log("video",video)
							  this.isPreview=true;
							     uni.navigateTo({
									url: '/pages/resources/video?url='+video,
									success() {
										console.log('成功')
									  },
									  fail() {
										console.error('失败')
									  },
									  complete() {
										console.log('are you ok?')
									  }
								});
							}
						}) 
				
			}
		}
	}
</script>

<style>
	.uni_font{
		font-size: 37rpx;
		 width: 65%;
		text-align: justify;
		font-family: SourceHanSansCN-Normal;
		font-weight:550;
		word-wrap:break-word;
		word-break:break-all; 
		overflow: hidden;
		padding: 0% 0 0 3%;
	}
	.uni_flex{
		    width: 100%;
		    display: flex;
		    border-bottom: 5rpx solid #c0c0c0;
		    height: 5rem;
		    padding: 6% 0 0 0;
	}
	.pic-style{
		width:14%;
		height:80rpx;
		margin:0% 0 0 9px;
		wxcs_style_margin:0% 0 0 20rpx;
	}
</style>
