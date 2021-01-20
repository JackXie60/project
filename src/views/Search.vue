<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()" />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @focus="focus"
        @input="input"
        autofocus
      >
        <template #action v-if="!showList">
          <div @touchend="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <van-icon name="shopping-cart-o" id="shop-car" :badge="badge" />
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="!showList && likeList.length">
      <van-list>
        <van-cell v-for="itemList in likeList" :key="itemList" @click="onSearch(itemList)">
          <span class="custom-title" v-html="formatData(itemList)"></span>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-if="showList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有了"
        @load="onLoad"
        :immediate-check="false"
      >
        <goods-card
          v-for="goods in goodsList"
          :key="goods.id"
          :image="goods.images[0]"
          :title="goods.title"
          :desc="goods.desc"
          :tags="goods.tags"
          :price="goods.price"
          :id="goods.id"
          :num="counterMap[goods.id]"
        ></goods-card>
      </van-list>
    </div>
    <div class="my-history" v-if="!showList&&likeList.length===0">
      <my-history :searchList="searchList" @search="onSearch"></my-history>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodsCard from '../components/GoodsCard.vue';
import MyHistory from '../components/MyHistory.vue';

export default {
  components: {
    GoodsCard,
    MyHistory,
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || {};
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      goodsList: [],
      loading: false,
      finished: false,
      page: 1,
      size: 7,
      showList: false,
      total: 0,
      searchList: [],
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
  methods: {
    formatData(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
    async onLoad() {
      const result = await this.$api.search(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...result.list];
      this.total = result.total;
      this.loading = false;
      if (this.total > this.goodsList.length) {
        this.page += 1;
      } else {
        this.finished = true;
      }
    },
    async onSearch(value) {
      if (!value) {
        this.value = this.place;
      } else {
        this.value = value;
      }
      const result = this.searchList.find((item) => item.value === value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value, date: new Date().getTime() });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.goodsList = [];
      this.likeList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
      this.showList = true;
    },
    focus() {
      this.showList = false;
    },
    async input() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(async () => {
        if (!this.value) {
          return;
        }
        const result = await this.$api.likeSearch(this.value);
        this.likeList = result.result;
        clearTimeout(this.timer);
        this.timer = null;
      }, 300);
    },
  },
};
</script>

<style lang="less">
.search-wrapper {
  width: 100vw;
  .search-head {
    width: 100%;
    height: 30px;
    display: flex;
    position: fixed;
    align-items: center;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      #shop-car {
        display: inline-block;
        width: 27px;
        text-align: center;
        font-size: 16px;
      }
    }
  }
  .like-search {
    top: 50px;
    position: fixed;
    padding-left: 20px;
    z-index: 10;
  }
  .goods-list {
    width: 100vw;
    top: 50px;
    left: 40px;
    position: fixed;
    padding-left: 20px;
    height: 90vh;
    overflow: auto;
  }
}
</style>
