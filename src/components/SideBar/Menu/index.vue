<template>
  <nav class="menu-container">
    <router-link v-for="item in items" :key="item.title" :to="{name:item.name}" :exact="item.exact" active-class="selected"
      exact-active-class="">
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span class="title">{{ item.title }}</span>
    </router-link>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, // 激活状态是否要精确匹配
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
.menu-container {
    width: inherit;
    height: inherit;
  a {
    padding-left: 50px;
    box-sizing: border-box;
    line-height: 35px;
    height: 35px;
    display: block;
    font-size: 18px;
    display: flex;
    text-decoration: none;
    color: #fff;
    & > div {
      margin-right: 5px;
    }
    &.selected {
      background-color: #777;
    }
    &:hover{
        color: #777;
        background: #fff;
    }
  }
}
</style>