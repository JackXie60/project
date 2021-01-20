<template>
  <div class="classify-wraper">
    <div class="search-wrapper">
      <router-link to="/search" class="search-area">
        <van-icon name="search" />
        <span class="search-text">苹果一元一斤</span>
      </router-link>
    </div>
    <oneTab></oneTab>
    <template v-if="showContent">
      <sideTab></sideTab>
    </template>
    <van-loading v-else type="spinner" vertical/>
    <goods-list></goods-list>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import oneTab from '../components/oneTab.vue';
import sideTab from '../components/sideTab.vue';
import GoodsList from '../components/GoodsList.vue';

export default {
  components: {
    oneTab,
    sideTab,
    GoodsList,
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
      }
    },
  },
};
</script>

<style lang="less">
.search-wrapper{
  width: 375px;
  height: 33px;
  margin: 11px 0;
  .search-area{
    display: block;
    width: 90%;
    height: 100%;
    background-color: #eee;
    margin:0 auto;
    border-radius: 11px;
    text-align: center;
    line-height: 33px;
    color: #a1a1a1;
  }
}
</style>
