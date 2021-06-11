<template>
  <div class="blogItem-container">
    <div class="img">
      <img v-lazy:src="blogItem.thumb" alt="" />
    </div>
    <div class="content">
      <div class="title">
        <h2>{{ blogItem.title }}</h2>
      </div>
      <div class="info">
        日期: <span class="date">{{ date }}</span> 浏览:
        <span class="scan">{{ blogItem.scanNumber }}</span> 评论:
        <span class="comment">{{ blogItem.commentNumber }}</span>
        <span>{{ blogItem.category.name }}</span>
      </div>
      <p class="desc">{{ blogItem.description }}</p>
    </div>
  </div>
</template>

<script>
import format from '@/util/format.js'
export default {
  props: ["blogItem"],
  computed: {
      date(){
          return format(this.blogItem.createDate);
      }
  }
};
</script>

<style scoped lang="less">
.blogItem-container {
  margin: 0px 50px;
  display: flex;
  border-bottom: 1px solid #ccc;
  align-items: center;
}
.img {
  width: 150px;
  overflow: hidden;
  flex: 0 0 auto;
  padding-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}

.content {
  .info {
    color: rgb(112, 117, 117);
    font-size: 12px;
    .date{
        margin-right: 8px;
    }
    .scan{
        margin-right: 8px;
    }
    .comment{
        margin-right: 8px;
    }
  }
  .mutedColor {
    display: block;
    color: rgb(85, 71, 71);
  }
}
</style>
