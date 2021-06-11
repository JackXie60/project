import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import animated from 'animate.css';
import './style/style.less';
import './eventBus'
import showMessage from '@/util/showMessage'


store.dispatch("login/whoami");
Vue.config.productionTip = false;
Vue.use(animated)
Vue.prototype.$showMessage = showMessage;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');