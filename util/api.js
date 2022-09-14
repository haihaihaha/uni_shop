/*
	封装请求方法
	参数说明：
		options 对象
		{
			url:请求地址
			method:请求方式（get|post）默认get
			data:请求参数 默认空对象
		}
	
	将封装好的请求挂载到vm原型上，以便以后所有的vm vc都能调用请求
*/
const BASE_URL = 'http://localhost:8082'//默认域名
//分别暴露
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				if(res.data.status !== 0) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				//返回请求成功数据
				resolve(res)
			},
			fail: (err)=>{
				uni.showToast({
					title: '请求接口失败'
				})
				//返回错误消息
				reject(err)
			}
		})
	})
}