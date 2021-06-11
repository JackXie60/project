<template>
  <div class="crouse-item-container">
    <div
      class="container"
      ref="itemContainer"
      :style="imgPosition"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="crouse-item" ref="item">
        <ImageLoader :src="banner.bigImg" :placeHolder="banner.midImg" />
      </div>
    </div>
    <div class="text-content">
      <div class="title" ref="title">{{ banner.title }}</div>
      <div class="desc" ref="desc">{{ banner.description }}</div>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["banner"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      containerSize: null,
      innerSize: null,
      mouseX: 0,
      mouseY: 0,
    };
  },
  mounted() {
    const titleWidth = this.$refs.title.clientWidth;
    this.$refs.title.style.opacity = 1;
    this.$refs.title.style.width = "0px";
    this.$refs.title.clientWidth;
    this.$refs.title.style.transition = "0.7s";
    this.$refs.title.style.width = titleWidth + "px";

    var descWidth = this.$refs.desc.clientWidth;
    this.$refs.desc.style.opacity = 1;
    this.$refs.desc.style.width = "0px";
    this.$refs.desc.clientWidth;
    this.$refs.desc.style.transition = "1.2s 0.6s";
    this.$refs.desc.style.width = descWidth + "px";
    this.handleMouseLeave();
    this.setSize();
  },
  computed: {
    imgPosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      var top = (-extraHeight / this.innerSize.height) * this.mouseY;
      var left = (-extraWidth / this.innerSize.width) * this.mouseX;
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    center() {
      return {
        x: this.$refs.item.clientWidth / 2,
        y: this.$refs.item.clientHeight / 2,
      };
    },
  },
  methods: {
    handleMouseMove(e) {
      const rect = this.$refs.item.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.itemContainer.clientWidth,
        height: this.$refs.itemContainer.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.item.clientWidth,
        height: this.$refs.item.clientHeight,
      };
    },
  },
};
</script>

<style scoped lang="less">
.crouse-item-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .container{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  .crouse-item {
    position: absolute;
    width: 110%;
    height: 110%;
  }
  .text-content {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
  }
  .title {
    font-size: 26px;
    color: #fff;
    top: 0;
    text-shadow: 1px 0px 1px #ccc, 0px 1px 1px #ccc, -1px 0px 1px #ccc,
      0px -1px 1px #ccc;
    letter-spacing: 3px;
    white-space: nowrap;
    margin-bottom: 10px;
    opacity: 0;
    overflow: hidden;
  }
  .desc {
    position: absolute;
    font-size: 18px;
    color: #fff;
    letter-spacing: 3px;
    white-space: nowrap;
    text-shadow: 1px 0px 1px #ccc, 0px 1px 1px #ccc, -1px 0px 1px #ccc,
      0px -1px 1px #ccc;
    opacity: 0;
    overflow: hidden;
  }
}
</style>
