<template>
  <div class="home-container">
      <CrouseItems/>
  </div>
</template>

<script>
import CrouseItems from '@/components/CrouseItems'
export default {
    components: {
        CrouseItems,
    }
}
</script>

<style scoped lang="less">
.home-container{
    width: 100%;
    height: 100%;
}
</style>