<template>
  <div class="blogList-container" v-loading="isLoading" ref="mainContainer">
    <a
      class="blogItem"
      v-for="item in blogData"
      :key="item.id"
      @click="handleTo(item)"
    >
      <BlogCard :blogItem="item" />
    </a>
    <Empty v-if="blogData.length==0"/>
    <Pager
      v-show="!isLoading"
      :curPage="routerInfo.page"
      :limit="routerInfo.limit"
      :total="total"
      :visibleNumber="10"
      @switch="handleClick"
    />
  </div>
</template>

<script>
import Empty from "@/components/Empty"
import BlogCard from "./BlogCard";
import { getBlogs } from "@/api/blog.js";
import Pager from "./Pager";
export default {
  components: {
    BlogCard,
    Pager,
    Empty,
  },
  computed: {
    routerInfo() {
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const categoryid = +this.$route.params.categoryid || -1;
      return {
        page,
        limit,
        categoryid,
      };
    },
  },
  async created() {
    await this.fetchData();
  },
  data() {
    return {
      blogData: [],
      total: 0,
      isLoading: false,
    };
  },
  methods: {
    async handleClick(newPage) {
      const query = {
        page: newPage,
        limit: this.routerInfo.limit,
      };
      if (this.routerInfo.categoryid == -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "BlogCategory",
          query,
          params: {
            categoryid: this.routerInfo.categoryid,
          },
        });
      }
    },
    async handleTo(item) {
      this.$router.push({
        name: "BlogDetail",
        params: {
          id: item.category.id,
        },
      });
    },
    async fetchData() {
      this.isLoading = true;
      const blogData = await getBlogs(
        this.routerInfo.page,
        this.routerInfo.limit,
        this.routerInfo.catgoryid
      );
      this.blogData = blogData.rows;
      this.total = blogData.total;
      console.log(this.blogData);
      this.isLoading = false;
    },
    handleScrll() {
      this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    },
    scrollEmit(scrollTop){
      this.$refs.mainContainer.scrollTop=scrollTop;
    }
  },
  watch: {
    async $route() {
      await this.fetchData();
    },
  },
  mounted() {
    this.$refs.mainContainer.addEventListener("scroll", this.handleScrll);
    this.$bus.$on("setScrollTop", this.scrollEmit);
  },
  beforeDestroy() {
    this.$bus.$off("setScrollTop", this.setScroll);
    this.$refs.mainContainer.removeEventListener("scroll", this.handleScrll);
  },
};
</script>

<style scoped lang="less">
.blogList-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
}
.blogList-container::-webkit-scrollbar {
  display: none;
}
.blogItem {
  display: block;
  cursor: pointer;
}
</style>
