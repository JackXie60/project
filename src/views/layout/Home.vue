<template>
  <div class="layout-wrapper">
    <left-menu :key="key"></left-menu>
    <main-app></main-app>
  </div>
</template>

<script>
import LeftMenu from '../../components/LeftMenu.vue';
import MainApp from '../../components/MainApp.vue';

export default {
  components: {
    MainApp,
    LeftMenu,
  },
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>
<style lang="less">
</style>
