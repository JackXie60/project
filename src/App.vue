<template>
  <div class="home-container">
      <Layout>
          <template #left>
              <SideBar></SideBar>
          </template>
          <template #content>
              <div class="content-wrapper">
                <router-view></router-view>
              </div>
          </template>
      </Layout>
      <Top/>
  </div>
</template>

<script>
import Layout from '@/components/Layout';
import SideBar from '@/components/SideBar';
import Top from '@/components/Top';
export default {
    components:{
        Layout,
        SideBar,
        Top,
    },
    methods: {
    }
}
</script>


<style lang="less">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
.content-wrapper{
  height: 100vh;
}
</style>
