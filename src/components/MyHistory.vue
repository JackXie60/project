<template>
  <div class="history-wrapper">
    <p>历史记录</p>
    <div class="history-item"
    v-for="item in searchList"
    :key="item.date"
    @click="search(item.value)"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: Array,
  },
  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style lang="less">
.history-wrapper {
  width: 100vw;
  position: fixed;
  top: 50px;
  padding-left: 20px;
  .history-item {
    display: inline-block;
    padding: 10px;
    margin: 10px;
    background-color: #ccc;
    border-radius: 5px;
    &:nth-of-type(1){
      margin-left: 0;
    }
  }
}
</style>
