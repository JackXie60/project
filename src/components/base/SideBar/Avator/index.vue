<template>
  <div class="avator-container">
    <img
      class="img-avator"
      :src="img"
      alt=""
      @click="handleClick"
      @mouseleave="handleLeave"
    />
    <h2>{{ text }}</h2>
  </div>
</template>

<script>
export default {
  props: ["img", "text"],
  methods: {
    handleClick() {
      this.$emit("imgClick");
    },
    handleLeave() {
      this.$emit("imgLeave");
    },
  },
};
</script>

<style scoped lang="less">
.avator-container {
  text-align: center;
  .img-avator {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }
  h2 {
    font-size: 25px;
  }
  @media screen and (max-width: 1120px) {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    .img-avator{
      width: 50px;
      height: 50px;
    }
    h2{
      font-size: 0px;
    }
  }
  @media screen and (max-width: 380px){
    display: none;      
  }
}
</style>
