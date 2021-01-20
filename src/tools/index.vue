<template>
  <div class="item"
  :style="{
    width:`${width}px`,
    height:`${height}px`,
    opacity,
    transform:`translate(${moveX}px,${moveY}px) scale(${sx},${sy})`
  }"
  >
    <img :src="src">
  </div>
</template>

<script>
export default {

};
</script>

<style lang='less'>
.item{
  position: fixed;
  left: 0;
  top: 0;
  z-index:100;
  transition: all 1s;
  transform-origin: 0% 0%;
  img{
    width: 100%;
    border-radius: 50%;
  }
}
</style>
