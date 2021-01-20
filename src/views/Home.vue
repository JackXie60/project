<template>
  <div>
    <tabBar></tabBar>
    <router-view></router-view>
  </div>
</template>

<script>
import tabBar from '../components/tabBar.vue';

export default {
  components: {
    tabBar,
  },
};
</script>

<style>

</style>
