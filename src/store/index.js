import Vue from 'vue';
import Vuex from 'vuex';
import login from './login.js'
import template from './template'
import templateContent from './templateContent'
import backlog from './backlog'
import completeness from './completeness'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login:login,
    template:template,
    templateContent:templateContent,
    backlog:backlog,
    completeness:completeness
  },
});
