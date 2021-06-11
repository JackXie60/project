<template>
  <div class="singleComment-container">
    <div class="avator">
      <Avator :url="url" :size="50" />
    </div>
    <div class="comment-content">
      <div class="name">{{ nickname }}</div>
      <p class="comment">{{ content }}</p>
    </div>
    <div class="date">
        {{date}}
    </div>
  </div>
</template>

<script>
import format from "../../util/format";
import Avator from "../../components/Avator";
export default {
  props: ["url", "nickname", "content", "dateTime"],
  components: {
    Avator,
  },
  computed: {
    date() {
      return format(this.dateTime);
    },
  },
};
</script>

<style scoped lang="less">
.singleComment-container {
  border-bottom: 1px solid #ccc;
  display: flex;
  position: relative;
  .avator {
    width: 70px;
    flex: 0 0 auto;
  }
  .comment-content {
    .name {
      color: rgb(63, 156, 99);
      font-weight: blod;
      font-size: 18px;
      font-family: "Microsoft soft";
    }
    .comment{
        color: rgb(95, 91, 91);
    }
  }
  .date{
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
      color: rgb(143, 141, 134);
  }
}
</style>
