import Vue from 'vue'
import App from './App.vue'
import './mock/index.js'
import "./style/style.less"
import './api/banner'
import './eventBus.js'
import store from '@/store'
store.dispatch("setting/setSetting")
import router from './router'
import lazy from './directive/lazy.js'
import loading from './directive/loading.js'
import showMessage from './util/showMessage'

Vue.prototype.$showMessage = showMessage;
Vue.directive("loading",loading);
Vue.directive("lazy",lazy);
new Vue({
  router,
  render: h => h(App),
  store:store,
}).$mount('#app')
