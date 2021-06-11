<template>
  <div class="messageArea-container">
    <div class="dataform">
      <DataForm @select="handleSelect" />
    </div>
    <div class="commentList">
      <CommentList :title="title" :subTitle="subTitle" :list="list"/>
      <div class="loading-content" v-loading="isListLoading"></div>
    </div>
  </div>
</template>

<script>
import DataForm from "./DataForm";
import CommentList from "./CommentList";
export default {
  props: ["title", "subTitle", "list", "isListLoading"],
  components: {
    DataForm,
    CommentList,
  },
  methods: {
    async handleSelect(info, callback) {
      this.$emit("select",info,callback);
    },
  },
};
</script>

<style scoped lang="less">
.messageArea-container {
  .dataform {
    padding-top: 100px;
    padding-left: 50px;
  }
  .commentList{
    .loading-content{
      height: 60px;
      position: relative;
    }
  }
}
</style>
