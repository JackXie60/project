<template>
  <div class="about-container" v-loading="isLoading">
      <iframe :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
import getAbout from '@/api/about.js';
export default {
  data () {
    return {
      src:"",
      isLoading:false,
    }
  },
  async created () {
    this.isLoading = true;
    const aboutData = await getAbout();
    this.isLoading = false;
    this.src = aboutData;
  },
}
</script>

<style scoped lang="less">
.about-container{
  width: 100%;
  height: 100%;
  position: relative;
  iframe{
    width: 100%;
    height: 100%;
  }
}
</style>