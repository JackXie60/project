<template>
  <div id="app">
    <transition :name="transitionName" :mode="this.$router.back?'out-in':'in-out'">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
import api from './api/index';

Vue.prototype.$api = api;
export default {
  methods: {
    ...mapMutations(['resetGoodsList']),
  },
  data() {
    return {
      transitionName: 'left',
    };
  },
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', counterMap);
  },
  watch: {
    $router(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.resetGoodsList();
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
};
</script>
<style lang="less">
.view{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform .3s;
}
.left-enter{
  transform: translate(100%,0);
}
.right-leave-to{
  transform: translate(100%,0);
}
</style>
