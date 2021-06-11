<template>
  <ul class="sidebar-container">
    <li v-for="route in routes" :key="route.name">
      <router-link
        :to="{ name: route.name }"
        :exact="route.exact"
        active-class="selected"
      >
        <span class="title">{{ route.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          path: "/day",
          name: "home",
          title: "设置计划",
          exact: false,
        },
        {
          path: "/curplan",
          name: "curplan",
          title: "当前计划",
          exact: true,
        },
        {
          path: "/logrecord",
          name: "logRecord",
          title: "日志记录",
          exact: true,
        },
      ],
    };
  },
  methods: {
    matchParams() {
      if (
        this.$route.params &&
        (this.$route.params.planTime || this.$route.params.detailTemplateId)
      ) {
        this.routes.forEach((item) => {
          if (item.name == "home") {
            item.exact = false;
          }
        });
      } else {
        this.routes.forEach((item) => {
          if (item.name == "home") {
            item.exact = true;
          }
        });
      }
    },
  },
  created() {
    this.matchParams();
  },
  watch: {
    //如果目前是设置计划页面，那么使用模糊匹配
    //如果目前不是设置计划页面，那么使用精确匹配
    $route() {
      this.matchParams();
    },
  },
};
</script>

<style scoped lang="less">
.sidebar-container {
  height: 100%;
  background-color: rgb(51, 49, 49);
  > li {
    display: flex;
    align-items: center;
    height: 40px;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
    &:hover {
      background-color: burlywood;
    }
    > a {
      color: #fff;
      text-decoration: none;
      display: inline-block;
      width: 100%;
      @media screen and (max-width: 1120px) {
        padding: 2px 5px 2px 5px;
        border-radius: 5px;
      }
      &.selected {
        background-color: rgb(236, 236, 216);
        color: rgb(15, 7, 7);
      }
    }
  }
}
</style>
