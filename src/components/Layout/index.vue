<template>
  <div class="layout-container">
      <div class="left">
          <slot name="left"></slot>
      </div>
      <div class="content">
          <slot name="content"></slot>
      </div>
      <div class="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.layout-container{
    display: flex;
    height: 100%;
    width: 100%;
    .left{
        flex: 0 0 auto;
        overflow: hidden;
    }
    .right{
        flex: 0 0 auto;
        overflow: hidden;
    }
    .content{
        flex: 1 1 auto;
        overflow: hidden;
    }
}
</style>