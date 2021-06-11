<template>
  <div class="page-container">
    <a
      class="firstPage"
      @click="handleClick(1)"
      :class="{ disabled: curPage == 1 }"
      >|&lt;&lt;</a
    >
    <a class="prev" @click="handleClick(curPage - 1)">&lt;&lt;</a>
    <div class="pageContent">
      <div
        class="pageNumber"
        v-for="page in pageArray"
        :key="page"
        :class="{ active: curPage == page }"
        @click="handleClick(page)"
      >
        <span>{{ page }}</span>
      </div>
    </div>
    <a class="next" @click="handleClick(curPage + 1)">&gt;&gt;</a>
    <a class="lastPage" @click="handleClick(totalPage)">&gt;&gt;|</a>
  </div>
</template>

<script>
export default {
  props: ["curPage", "limit", "total", "visibleNumber"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.limit);
    },
    min() {
      let min = this.curPage - this.visibleNumber / 2;
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    max() {
      let max = this.min + this.visibleNumber - 1;
      if (max > this.totalPage) {
        max = this.totalPage;
      }
      return max;
    },
    pageArray() {
      var arr = [];
      for (var i = this.min; i <= this.max; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    handleClick(page) {
      if (page < 1 || page > this.totalPage) {
        return;
      }
      this.$emit("switch", page);
    },
  },
};
</script>

<style scoped lang="less">
.active {
  color: chocolate;
  font-weight: bold;
  background: paleturquoise;
}
.page-container {
  display: flex;
  width: 400px;
  justify-content: space-between;
  margin: 10px auto;
  height: 30px;
  line-height: 30px;
  a {
    text-decoration: none;
  }
  .pageContent {
    width: 250px;
    display: flex;
    justify-content: space-around;
    .pageNumber {
      display: block;
      cursor: pointer;
      padding: 0px 4px;
      box-sizing: border-box;
    }
  }
}
</style>
