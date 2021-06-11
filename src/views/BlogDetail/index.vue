<template>
  <Layout>
    <template #content>
      <div class="blogDetail-content" ref="mainContainer" v-loading="isLoading">
        <BlogDetail :detailData="detailData" />
        <div class="messageArea">
          <MessageArea
            v-if="!isLoading"
            title="评论列表"
            :subTitle="commentData.total"
            :list="commentData.rows"
            :isListLoading="isListLoading"
            @select="handleSelect"
          />
        </div>
      </div>
    </template>
    <template #right>
      <div class="blogRight">
        <BlogRight :list="detailData.toc" v-loading="isLoading" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogDetail from "./BlogDetail";
import BlogRight from "./BlogRight";
import { getBlogId } from "@/api/blog.js";
import MessageArea from "@/components/MessageArea";
import { getComments } from "@/api/blog.js";
import { postComment } from "@/api/blog.js";
import titleController from '@/util/titleController.js'
export default {
  components: {
    Layout,
    BlogDetail,
    BlogRight,
    MessageArea,
  },
  data() {
    return {
      isLoading: false,
      detailData: {},
      commentData: {},
      isListLoading: false,
      page: 1,
      limit: 10,
    };
  },
  computed: {
    cateid() {
      return this.$route.params.id;
    },
  },
  async created() {
    await this.fetchBlog();
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 30);
    await this.fetchComment();
  },
  methods: {
    async fetchBlog() {
      this.isLoading = true;
      this.detailData = await getBlogId(this.cateId);
      this.detailData = null;
      if(!this.detailData){
        this.$router.push("/404")
        return;
      }
      titleController.setRouteTitle(this.detailData.title);
      this.isLoading = false;
    },
    async fetchComment() {
      this.isListLoading = true;
      this.commentData = await getComments(this.cateid, this.page, this.limit);
      this.isListLoading = false;
    },
    async handleSelect(info, callback) {
      const comment = await postComment(info);
      this.commentData.rows = [comment, ...this.commentData.rows];
      this.commentData.total = this.commentData.total + 1;
      callback("提交成功");
    },
    handleScrll() {
      this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    },
    async fetchMore(dom) {
      if (this.isListLoading) {
        return;
      }
      if (this.commentData.rows.length < this.commentData.total) {
        const range = 100;
        const dec = Math.abs(
          dom.scrollTop + dom.clientHeight - dom.scrollHeight
        );
        if (dec <= range) {
          this.isListLoading = true;
          this.page += 1;
          const resp = await getComments(this.cateId, this.page, this.limit);
          this.isListLoading = false;
          this.commentData.total = resp.total;
          this.commentData.rows = [...this.commentData.rows, ...resp.rows];
        }
      }
    },
    setScroll(scrollTop){
      this.$refs.mainContainer.scrollTop = scrollTop;
    }
  },
  mounted() {
    this.$refs.mainContainer.addEventListener("scroll", this.handleScrll);
    this.$bus.$on("mainScroll", this.fetchMore);
    this.$bus.$on("setScrollTop",this.setScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.fetchMore);
    this.$bus.$off("setScrollTop",this.setScroll);
    this.$refs.mainContainer.removeEventListener("scroll", this.handleScrll);
  },
};
</script>

<style scoped lang="less">
.blogDetail-content {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.blogRight {
  min-width: 250px;
  height: 100%;
  position: relative;
}
</style>
