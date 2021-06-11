<template>
  <div class="imageloader-container">
    <img
      :src="placeHolder"
      alt=""
      ref="defaultImage"
      class="imageloader-container1"
    />
    <img src="" alt="" ref="imgContainer" class="imageloader-container2" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeHolder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  mounted() {
    var img = new Image();
    img.addEventListener("load", () => {
      this.$refs.imgContainer.src = this.src;
      this.$refs.defaultImage.style.opacity = 1;
      this.$refs.imgContainer.style.opacity = 1;
    });
    img.src = this.src;
  },
};
</script>

<style scoped lang="less">
.imageloader-container {
    position: relative;
    width: 100%;
    height: 100%;
  .imageloader-container1 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: 0.5s;
  }
  .imageloader-container2 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.5s;
  }
}
</style>
