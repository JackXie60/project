import Vue from 'vue'
import App from './App'
import $H from '@/common/lib/request.js'
import $U from '@/common/lib/util.js'
import store from './store/index.js'
import divider from 'components/comm/divider.vue'
import loading from '@/components/comm/loading.vue'
import loadingPlus from '@/common/mixin/losing-plus.vue'
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'
Vue.component('Divider',divider)
Vue.component('loading',loading)
Vue.component('loading-plus',loadingPlus)
Vue.prototype.navigateTo = (options) => {
	if(!store.state.login.loginStatus){
		uni.navigateTo({
			url:'/pages/login/login'
		})
		return;
	}
	console.log(options)
	uni.navigateTo(options)
}
Vue.prototype.$H = $H;
Vue.prototype.$U = $U;
const app = new Vue({
    ...App,
	store,
})
app.$mount()
