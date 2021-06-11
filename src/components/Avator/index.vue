<template>
  <img class="avator-container" :style="{width:size+'px',height:size+'px'}" :src="url" alt="">
</template>

<script>
export default {
    props:{
      url:{
        type:String,
        required:true
      },
      size:{
        type:Number,
        default:()=>150
      }
    }
}
</script>

<style scoped lang="less">
.avator-container{
  margin: auto;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
</style>