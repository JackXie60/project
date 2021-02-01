import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '../store';
import Index from '../views/pages/index.vue';
import ProductAdd from '../views/pages/productAdd.vue';
import ProductList from '../views/pages/productList.vue';
import getMenuRoute from '../util/menuRoute';

Vue.use(VueRouter);
const asyncRoute = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      hidden: false,
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          hidden: false,
        },
        component: ProductList,
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          hidden: false,
        },
        component: ProductAdd,
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          hidden: true,
        },
        component: ProductAdd,
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '商品分类',
          hidden: true,
        },
        component: import('../views/pages/category.vue'),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
          hidden: false,
        },
        component: Index,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});
let isAdd = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.userInfo.username && store.state.userInfo.email) {
      const menuRoute = getMenuRoute(store.state.userInfo.role, asyncRoute);
      if (!isAdd) {
        isAdd = true;
        router.addRoutes(menuRoute);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoute));
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
