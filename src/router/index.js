import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import LogRecord from '@/views/LogRecord/index.vue';
import Control from '@/views/Control/index.vue';
import SelfDiscipline from '@/views/SelfDiscipline/index.vue';
import CreateTemplate from '@/views/CreateTemplate/index.vue';
import Login from '@/views/login/index.vue';
import SignUp from '@/views/SignUp/index.vue';
import UpdateTemplate from '@/views/UpdateTemplate/index.vue';
import CurPlan from '@/views/CurPlan/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/createTemplate/:planTime?',
    name: 'createTemplate',
    component: CreateTemplate,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: "signup",
    component: SignUp,
  },
  {
    path:'/curplan',
    name:'curplan',
    component:CurPlan,
  },
  {
    path: '/logrecord',
    name: 'logRecord',
    component: LogRecord,
  },
  {
    path: '/:planTime?',
    name: 'home',
    component: Home,
  },
  {
    path: '/control',
    name: 'control',
    component: Control,
  },
  {
    path: '/selfDisciPline',
    name: 'selfDisciPline',
    component: SelfDiscipline,
  },
  {
    path:'/updateTemplate/:detailTemplateId',
    name:'updateTemplate',
    component:UpdateTemplate,
  },
];
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, from, next) {
  if (localStorage.getItem("token") || to.path == "/signup" || to.path == "/login") {
    next();
  } else {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath,
      }
    })
  }
})

export default router;