<template>
  <ul class="rightlist-container">
    <li v-for="item in list" :key="item.name">
      <span @click="handleClick(item)" :class="{active:item.isSelect}">{{ item.name }}</span>
      <RightList v-if="item.children" :list="item.children" @select="handleClick"/>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
        this.$emit("select",item);
    },
  },
};
</script>

<style scoped lang="less">
.rightlist-container {
  padding: 0;
  margin: 0;
  .rightlist-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    list-style: none;
    padding: 0;
    cursor: pointer;
    .active {
      color: #ff8000;
      font-weight: bold;
    }
  }
}
</style>
