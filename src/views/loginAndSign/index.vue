<template>
  <div class="login-container">
    <Layout>
      <template #content>
        <div class="content">
          <img
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3555757360,2241249051&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/base/Layout/index.vue";
export default {
  components: {
    Layout,
  },
};
</script>

<style scoped lang="less">
@import "~@/style/center.less";
.login-container {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      .center();
      border-radius: 30%;
    }
  }
}
</style>
