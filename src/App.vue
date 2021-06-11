<template>
  <div id="app">
    <Layout>
      <template #left>
        <SideBar
          v-show="isShow"
          @imgClick="handleClick"
          @imgLeave="handleLeave"
        />
        <div
          @click="loginOut"
          @mouseenter="handleEnter"
          @mouseleave="handleLeave"
          v-show="isShowLoginOut"
          class="loginout"
        >
          退出登录
        </div>
      </template>
      <template #content>
        <router-view></router-view>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./components/base/Layout/index.vue";
import SideBar from "./components/base/SideBar/index.vue";

export default {
  components: {
    Layout,
    SideBar,
  },
  data() {
    return {
      notShowPath: ["/login", "/createTemplate", "/signup"],
      isShow: true,
      isShowLoginOut: false,
      timer: null,
    };
  },
  methods: {
    loginOut() {
      this.$store.dispatch("login/loginOut");
      location.reload();
    },
    hiddenLoginOut() {
      if (this.isShowLoginOut) {
        this.timer = setTimeout(() => {
          this.isShowLoginOut = false;
        }, 300);
      }
    },
    handleClick() {
      this.isShowLoginOut = !this.isShowLoginOut;
    },
    handleLeave() {
      this.hiddenLoginOut();
    },
    handleEnter() {
      clearTimeout(this.timer);
    },
  },
  created() {
    this.isShow = (() => {
      for (let i = 0; i < this.notShowPath.length; i++) {
        if (this.$route.path.startsWith(this.notShowPath[i])) {
          return false;
        }
      }
      return true;
    })();
  },
  watch: {
    $route(to, from) {
      for (let i = 0; i < this.notShowPath.length; i++) {
        if (to.path.startsWith(this.notShowPath[i])) {
          this.isShow = false;
          return;
        }
      }
      this.isShow = true;
    },
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.layout-left {
  position: relative;
  .loginout {
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(109, 103, 103);
    color: #fff;
    width: 140px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    z-index: 100;
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -19px);
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent rgb(109, 103, 103) transparent;
    }
  }
  @media screen and (max-width: 1120px) {
    .loginout {
      top: 0px;
      left: 100%;
      width: 80px;
      transform: translate(-80px,70px);
    }
  }
}
//媒体查询
// #app {
  // .layout-container {
  //   @media screen and (max-width: 1120px) {
  //     display: block;
  //   }
  // }
// }
</style>
