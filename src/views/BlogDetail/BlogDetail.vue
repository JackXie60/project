<template>
  <div class="blogDetail-container">
    <h1>{{ detailData.title }}</h1>
    <div class="aside" v-show="detailData.title">
      日期: <span class="date">{{ date }}</span> 浏览:
      <span class="scan">{{ detailData.scanNumber }}</span> 评论:
      <span class="comment">{{ detailData.commentNumber }}</span>
      <span class="category" @click="handleClick">分类{{ cateId }}</span>
    </div>
    <div class="markdown-body" v-html="detailData.htmlContent"></div>
  </div>
</template>

<script>
import format from "@/util/format.js";
import "highlight.js/styles/github.css";
import "@/style/markdown.css";
export default {
  props: {
    detailData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cateId() {
      return this.$route.params.id;
    },
    date() {
      return format(this.detailData.createDate);
    },
  },
  methods: {
    handleClick(){
      this.$router.push({
        name:"BlogCategory",
        params:{
          "categoryid":this.cateId,
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.blogDetail-container {
  position: relative;
  width: 100%;
  padding-left: 20px;
  .aside {
    color: #aaa;
    font-size: 13px;
    margin-bottom: 40px;
    .date {
      margin-right: 10px;
    }
    .scan {
      margin-right: 10px;
    }
    .comment {
      margin-right: 10px;
    }
    .category{
      cursor: pointer;
    }
  }
}
</style>
