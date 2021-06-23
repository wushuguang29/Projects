<template>
		<video id="myVideo" :style="{ height: windowHeight + 'px' }" style="width: 100%;"
		:src="videourl"
		@error="videoErrorCallback" ></video>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0,
				videourl: '',
			}
		},
		onLoad(options) {
			this.videourl=options.url;
		},
		mounted: function (res) {
			var that = this;
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight;
			    }
			});
		},
		methods: {
			onBackPress(event) {
				uni.switchTab({
					url: '/pages/resources/resourcesTable'
				});
			},
			videoErrorCallback: function(e) {
				console.log(e)
			},
		}
	}
</script>

<style>
</style>
