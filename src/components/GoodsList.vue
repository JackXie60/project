<template>
  <div class="goodsList-wrapper">
    <div class="header van-hairline--top-bottom">
      <div :class="{ active: type == 'all' }" @click="changeType('all')">综合</div>
      <div :class="{ active: type == 'sale' }" @click="changeType('sale')">销量</div>
      <div
        class="price"
        @click="changeType('price')"
        :class="{ 'price-up': type == 'price-up', 'price-down': type == 'price-down' }"
      >
        价格
      </div>
    </div>
    <div class="goods-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有了"
          @load="onLoad"
          :immediate-check="false"
        >
          <template v-for="goods in goodsList">
            <goods-card
              :key="goods.id"
              :image="goods.images[0]"
              :title="goods.title"
              :desc="goods.desc"
              :tags="goods.tags"
              :price="goods.price"
              :id="goods.id"
              :num="counterMap[goods.id]"
            ></goods-card>
          </template>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import GoodsCard from './GoodsCard.vue';

export default {
  components: { GoodsCard },
  data() {
    return {
      type: 'all',
      loading: false,
      isLoading: false,
    };
  },
  // 需要使用的仓库数据，goodsList用来渲染数据，finished用来设置列表list组件是否加载完成
  // page，根据page来获取不同分页的元素
  // 注意：
  // 1：在oneTab组件切换时，页面数据重新加载，此时需要将page设置为1；
  // 2：当滑动触发load事件获取数据时，获取所有数据之后page要设置为1；
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList,
      finished: (state) => state.isFinished,
      page: (state) => state.page,
      counterMap: (state) => state.counterMap,
    }),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList', 'setIsFinishied', 'setPage']),
    // 下拉刷新，当下拉刷新时，将所有的数据初始化，清除原本商品列表goodsList中的数据，获取新的数据
    onRefresh() {
      this.isLoading = true;
      this.setIsFinishied(false);
      this.loading = false;
      this.setPage(1);
      this.resetGoodsList();
      this.getGoodsList({ page: this.page, sort: this.type });
      this.isLoading = false;
    },
    async onLoad() {
      this.setPage(this.page + 1);
      this.loading = true;
      const result = await this.getGoodsList({ page: this.page, sort: this.type });
      // 函数执行完成时需要将loading设置为true,不然会不断执行load函数
      if (result) {
        this.loading = false;
      } else {
        this.setIsFinishied(true);
        this.loading = false;
        this.setPage(1);
      }
    },
    // 排序的sortType
    changeType(type) {
      if (type === 'price') {
        if (this.type === 'price-up') {
          this.type = 'price-down';
        } else {
          this.type = 'price-up';
        }
      } else {
        this.type = type;
      }
      this.onRefresh();
    },
  },
};
</script>

<style lang="less">
.goodsList-wrapper {
  width: 275px;
  position: fixed;
  right: 0;
  .header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > div {
      width: 50px;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      color: #cecece;
      &.active,
      &.price-up,
      &.price-down {
        color: #ff1a90;
        font-weight: bold;
      }
      &.price {
        position: relative;
      }
      &.price::before {
        content: "";
        border: 5px solid transparent;
        border-bottom-color: #cecece;
        position: absolute;
        top: 9px;
        right: 7px;
      }
      &.price-up::before {
        border-bottom-color: #ff1a90;
      }
      &.price::after {
        content: "";
        border: 5px solid transparent;
        border-top-color: #cecece;
        position: absolute;
        right: 7px;
        top: 21px;
      }
      &.price-down::after {
        border-top-color: #ff1a90;
      }
    }
  }
  .goods-list {
    position: fixed;
    overflow: auto;
    bottom: 100px;
    top: 199px;
    width: 275px;
    van-pull-refresh {
      overflow: unset !important;
    }
  }
  .goods-list::-webkit-scrollbar {
    width: 0;
  }
}
</style>
