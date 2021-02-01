<template>
  <div class="main-app" :class="$store.state.collapsed ? 'main-unfold' : 'main-fold'">
    <div class="main-head">
      <div class="menu-btn">
        <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
          <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
      </div>
      <div class="breadcrumb">
        <a-breadcrumb v-if="currentRoute.length>1">
          <a-breadcrumb-item>{{ currentRoute[0].meta.title }}</a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{ name: currentRoute[1].name }">
              {{ currentRoute[1].meta.title }}
            </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="userlogin">
        <ul>
          <li>欢迎{{ $store.state.userInfo.username }}</li>
          <li @click="logout">退出</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('setCollapsed');
    },
    logout() {
      this.$store.dispatch('setUserInfo', {
        username: '',
        appkey: '',
        role: '',
        email: '',
      });
      localStorage.removeItem('userInfo');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>

<style lang="less">
.main-app {
  vertical-align: top;
  transition: all 0.3s;
  margin-left: 180px;
  &.main-unfold {
    margin-left: 80px;
  }
  .main-head {
    min-width: 400px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
    padding-right: 20px;
    .menu-btn {
      display: inline-block;
    }
    .breadcrumb {
      display: inline-block;
      margin-left: 30px;
    }
    .userlogin {
      text-align: center;
      position: absolute;
      top: 0;
      right: 10px;
      z-index: 10;
      ul {
        li:not(:first-child) {
          display: none;
          background: rgb(245, 245, 245);
          &:hover {
            background: rgb(177, 190, 55);
          }
        }
        &:hover {
          li {
            display: block;
          }
        }
      }
    }
  }
}
</style>
