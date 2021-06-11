import Vue from 'vue'
import VueRouter from 'vue-router'
import titleController from '../util/titleController'
import "nprogress/nprogress.css";
import {start,done,configure} from "nprogress"
if (!window.VueRouter) {
  Vue.use(VueRouter)
}
configure({
  trickleSpeed:20,
  showSpinner:false
})
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  })
}
function getAsyncComponent(pageComponent) {
  return async () => {
    start();
    if (process.env.NODE_ENV === "development") {
      await delay(500)
    }
    const comp = await pageComponent();
    done();
    return comp;
  }
}
const routes = [{
    path: '/',
    name: 'Home',
    component: getAsyncComponent(() => import( /* webpackChunkName: "home" */ "../views/Home")),
    meta: {
      title: "首页"
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: getAsyncComponent(() => import( /* webpackChunkName: "message" */ "../views/Message")),
    meta: {
      title: "留言板"
    }
  },
  {
    path: '/about',
    name: 'About',
    component: getAsyncComponent(() => import( /* webpackChunkName: "about" */ "../views/About")),
    meta: {
      title: "关于我"
    }
  }, {
    path: '/project',
    name: 'Project',
    component: getAsyncComponent(() => import( /* webpackChunkName: "project" */ "../views/Project")),
    meta: {
      title: "项目&效果"
    }
  }, {
    path: '/blog',
    name: 'Blog',
    component: getAsyncComponent(() => import( /* webpackChunkName: "blog" */ "../views/Blog")),
    meta: {
      title: "文章"
    }
  },
  {
    path: '/blog/cate/:categoryid',
    name: 'BlogCategory',
    component: getAsyncComponent(() => import( /* webpackChunkName: "blog" */ "../views/Blog")),
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: getAsyncComponent(() => import( /* webpackChunkName: "blogDetail" */ "../views/BlogDetail")),
  },{
    path:"*",
    name:"NotFound",
    component:getAsyncComponent(() => import( /* webpackChunkName: "notFound" */ "../views/NotFound")),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
})
export default router