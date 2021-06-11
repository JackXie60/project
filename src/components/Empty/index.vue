<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style scoped lang="less">
.empty-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #ccc;
  text-align: center;
}
.iconfont {
  font-size: 72px;
}
</style>
