import Vue from 'vue';
import VueRouter from 'vue-router';
import Classify from '../views/Classify.vue';
import Shop from '../views/Shop.vue';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function () {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'classify',
        component: Classify,
      },
      {
        path: 'shop',
        component: Shop,
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '*',
    redirect: '/home',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
