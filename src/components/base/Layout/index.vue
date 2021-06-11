<template>
  <div class="layout-container">
    <div class="layout-left">
      <slot name="left"></slot>
    </div>
    <div class="layout-content">
      <slot name="content"></slot>
    </div>
    <div class="layout-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="less">
.layout-container{
  width: 100%;
  height: 100%;
  display: flex;
  .layout-left{
    flex: 0 0 auto;
    // overflow: hidden;
  }
  .layout-content{
    flex: 1 1 auto;
    overflow: hidden;
  }
  .layou-right{
    flex: 0 0 auto;
    overflow: hidden;
  }
  @media screen and (max-width: 1120px){
    flex-direction: column; 
  }
}
</style>
