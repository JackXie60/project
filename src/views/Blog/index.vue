<template>
  <div class="blog-container">
      <Layout>
        <template #content>
          <BlogList></BlogList>
        </template>
        <template #right>
          <BlogCategory/>
        </template>
      </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout'
import BlogList from './component/BlogList'
import BlogCategory from './component/BlogCategory'
export default {
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
}
</script>

<style scoped lang="less">
.blog-container{
  height: 100%;
}
</style>