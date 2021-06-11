<template>
    <i class="iconfont" :class="iconfont"></i>
</template>

<script>
const icontype = {
  empty: 'icon-kong',
  close: 'icon-guanbi',
  home: 'icon-zhuye',
  warn: 'icon-jinggao',
  calendar: 'icon-rili',
  success:"icon-icon-zhengque",
  error:"icon-icon-cuowu",
  about:"icon-about",
  hidden:"icon-kanbujian",
  show:"icon-kandejian"
};
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconfont() {
      return icontype[this.type];
    },
  },
};
</script>

<style>
@import "//at.alicdn.com/t/font_2274915_mmqlvfioi8.css";
.iconfont{
  font-size: inherit;
  color: inherit;
}
</style>
