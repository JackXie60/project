import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    goodsList: [],
    showContent: false,
    size: 5,
    type: null,
    sortType: 'all',
    isFinished: false,
    page: 1,
    counterMap: {},
  },
  mutations: {
    changeStorage(state, { id, value }) {
      if (state.counterMap[id]) {
        if (value === -1 && state.counterMap[id] === 1) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, list) {
      state.sideList = list;
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsType(state, type) {
      state.type = type;
    },
    setIsFinishied(state, bool) {
      state.isFinished = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideList(type);
      commit('setSideList', value);
      commit('setShowContent', true);
    },
    async getGoodsList({ state }, options) {
      const { sortType } = state;
      const sort = options.sort || sortType;
      const type = options.type || state.type;
      const { list, total } = await api.getGoodsList(type, options.page, state.size, sort);
      this.commit('setGoodsList', list);
      this.commit('setGoodsType', type);
      if (total <= state.goodsList.length) {
        return false;
      }

      return true;
    },
  },
  modules: {
  },
});
