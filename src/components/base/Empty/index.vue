<template>
  <div class="empty-container">
    <Icon type="empty"></Icon>
    <p>没有更多了</p>
  </div>
</template>

<script>
import Icon from '../Icon';

export default {
  components: {
    Icon,
  },
};
</script>

<style scoped lang="less">
@import "~@/style/center.less";
.icon-container{
  font-size: 50px;
}
.empty-container{
  .center();
  text-align: center;
  font-size: 16px;
  color: #fff;
}
.iconfont{
  font-size: 60px;
  display: inline-block;
  margin-bottom: 8px;
}
</style>
