import Vue from 'vue'
import App from './App'
//引入请求
import { myRequest } from './util/api.js'
//将封装好的请求挂载到vm原型上，以便以后所有的vm vc都能调用请求
Vue.prototype.$myRuquest = myRequest

Vue.filter('formatDate',(date)=>{
	const nDate = new Date(date)
	const year = nDate.getFullYear()
	const month = nDate.getMonth().toString().padStart(2,0)
	const day = nDate.getDay().toString().padStart(2,0)
	return year+'-'+month+'-'+day
})
//关闭vue生产环境提示
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
