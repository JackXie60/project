<template>
  <div class="blogCatgory-container" v-loading="isLoading">
    <h3>文章分类</h3>
    <RightList :list="listData" @select="handleClick" />
  </div>
</template>

<script>
import { getBlogType } from "@/api/blog.js";
import RightList from "./RightList";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [],
      isLoading: false,
    };
  },
  computed: {
    categoryid() {
      return this.$route.params.categoryid || -1;
    },
    limit() {
      return this.$route.query.limit || 10;
    },
    listData() {
      const articleCount = this.list.reduce((cur, item) => {
        return cur + item.articleCount;
      }, 0);
      const data = [{ name: "全部", id: -1, articleCount }, ...this.list];
      return data.map((item) => {
        if (item.id == this.categoryid) {
          return {
            ...item,
            name:`${item.name}\t(${item.articleCount}篇)`,
            isSelect: true,
          };
        } else {
          return {
            ...item,
            name:`${item.name}\t(${item.articleCount}篇)`,
            isSelect: false,
          };
        }
      });
    },
  },
  async created() {
    this.isLoading = true;
    this.list = await getBlogType();
    this.isLoading = false;
    console.log(this.list);
  },
  methods: {
    handleClick(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      if (item.id == -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      }else{
        console.log(item.id)
        this.$router.push({
        name: "BlogCategory",
        query,
        params:{
          categoryid:item.id,
        },
      });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blogCatgory-container {
  width: 150px;
  overflow: scroll;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding-left: 10px;
}
.blogCatgory-container::-webkit-scrollbar {
  width: 0px;
  display: none;
}
</style>
