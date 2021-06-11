<template>
  <div class="commentList-container">
      <div class="commentList-header">
          <h2>{{title}} {{subTitle}}</h2>
      </div>
      <div class="commentList-content">
          <div class="comment-item" v-for="item in list" :key="item.id" >
              <SingleComment :url="item.avatar" :nickname="item.nickname" :content="item.content" :dateTime="item.createDate"/>
          </div>
      </div>
  </div>
</template>

<script>
import SingleComment from './SingleComment';
export default {
    props:["title","list","subTitle"],
    components: {
        SingleComment,
    },
}
</script>

<style scoped lang="less">
.commentList-container{
    padding-left: 30px;
    padding-top: 30px;
    padding-right: 30px;
    .commentList-content{
        .comment-item{
            padding: 20px 0px;
        }
    }
}
</style>