
const host = "http://192.168.0.18/xykfpd_back/public";
const app = {
	    apiUrl:host, //请求的地址
		baseRequest(obj) {
			try {
				const userToken = uni.getStorageSync('userToken');
				if (userToken) {
					if (obj.header) {
						obj.header["Authorization"] = userToken;
					} else {
						obj.header = {
							"Authorization": userToken
						};
					}
					console.log("1111111");
					obj.url = this.apiUrl + obj.url;
					uni.request(obj)
				} else {
					console.log("获取不到userToken")
 
				}
			} catch (e) {
				console.log(e)
				console.log("获取不到userToken")
			}
		},
	}

module.exports = {
  host,app
}