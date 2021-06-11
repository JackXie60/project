<template>
  <i class="iconfont" :class="iconClass">
  </i>
</template>

<script>
export const classMap = {
  home: "icon-zhuye",
  success: "icon-icon-zhengque",
  error: "icon-icon-cuowu",
  close: "icon-guanbi",
  warn: "icon-Icon-jinggaobeifen",
  info: "icon-xinxi",
  blog: "icon-blog",
  code: "icon-code",
  about: "icon-Icon_Set_About",
  weixin: "icon-icon_wexin",
  mail: "icon-mail",
  github: "icon-icon-github",
  qq: "icon-QQ",
  arrowUp: "icon-arrow-up",
  arrowDown: "icon-chevron-down-outline",
  empty: "icon-icon_empty",
  chat: "icon-chat",
};
export default {
    props:{
        type:{
            type:String,
            required:true,
        }
    },
    computed: {
      iconClass(){
          return classMap[this.type];
      }  
    }
};
</script>

<style scoped>
@import "//at.alicdn.com/t/font_2274915_pzmtupddx6a.css";
.iconfont{
    color: inherit;
    font-size: inherit;
}
</style>
