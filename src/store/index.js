import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
      username: '',
      appkey: '',
      role: '',
      email: '',
    },
    menuRoutes: {},
  },
  mutations: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeMenuRoutes(state, menuRoutes) {
      state.menuRoutes = menuRoutes;
    },
  },
  actions: {
    setCollapsed({ commit }) {
      commit('setCollapsed');
    },
    setUserInfo({ commit }, payload) {
      commit('setUserInfo', payload);
    },
    changeMenuRoutes({ commit }, payload) {
      commit('changeMenuRoutes', payload);
    },
  },
  modules: {
  },
});
