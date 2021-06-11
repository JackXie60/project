<template>
  <div class="top-container" v-show="show" @click="handleClick">
    Top
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(scrollDom) {
      if (scrollDom.scrollTop > 500) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    handleClick() {
      this.$bus.$emit("setScrollTop", 0);
    },
  },
};
</script>

<style scoped lang="less">
.top-container {
  width: 80px;
  height: 80px;
  background-color: rgb(56, 192, 197);
  border-radius: 50%;
  position: fixed;
  bottom: 50px;
  right: 50px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
</style>
