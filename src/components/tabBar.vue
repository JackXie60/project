<template>
  <van-tabbar route fixed>
  <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
  <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
  <van-tabbar-item id="shop-car" :badge="badge" icon="shopping-cart-o" to="/home/shop">
  购物车
  </van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="/my">个人</van-tabbar-item>
</van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      return Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
    },
  },
};
</script>

<style>

</style>
