export function updateUserInfo(vm,backpage,backtype) {
	vm.$ajax.get({
		url: '/api/AppUsers/getUserInfo'
	}).then((res) => {
		console.log(res)
		if (res.data.code == 0) {
			uni.setStorageSync('rowData', res.data.data);
			if(backtype == 1){
				uni.redirectTo({
					url:backpage
				})
			}else  if(backtype == 2){
				uni.switchTab({
					url:backpage
				})
			}
			
		}
	})
}
