<template>
  <div class="project-container" v-loading="isLoading" ref="mainContainer">
    <div class="project-item" v-for="item in data" :key="item.id">
      <a :href="item.url?item.url:`javascript:alert('外网无法访问该项目')`" :target="item.url?'_blank':'_self'">
        <img v-lazy:src="item.thumb" alt="" />
      </a>
      <div class="content">
        <h2 class="title">{{item.name}}</h2><a v-if="item.github" :href="item.github" target="_blank" class="github">github</a>
        <p v-for="desc in item.description" :key="desc">{{desc}}</p>
      </div>
    </div>
    <Empty v-if="data.length==1"/>
  </div>
</template>

<script>
import Empty from "@/components/Empty"
import { mapState } from "vuex";
export default {
  components: {
    Empty,
  },
  computed: {
    ...mapState("project", ["isLoading", "data"]),
  },
  async created() {
    this.$store.dispatch("project/setProject");
  },
  methods: {
    handleScroll(){
      this.$bus.$emit("mainScroll",this.$refs.mainContainer);
    },
    handleSetTop(scrollTop){
      this.$refs.mainContainer.scrollTop = scrollTop;
    }
  },
  mounted () {
    this.$refs.mainContainer.addEventListener("scroll",this.handleScroll);
    this.$bus.$on("setScrollTop",this.handleSetTop);
  },
  beforeDestroy(){
    this.$refs.mainContainer.removeEventListener("scroll",this.handleScroll);
    this.$bus.$off("setScrollTop",this.handleSetTop);
  }
};
</script>

<style scoped lang="less">
.project-container {
  height: 100%;
  overflow-y:scroll;
  min-width: 600px;
  position: relative;
  scroll-behavior: smooth;
  .project-item {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    a {
      display: block;
      display: flex;
      align-items: center;
      padding-left: 20px;
      margin-right: 10px;
      img {
        width: 170px;
        height: 200px;
      }
    }
    h2{
      display: inline;
    }
    .github{
      display: inline;
      padding-left: 8px;
      text-decoration: none;
      color: darkcyan;
    }
  }
}
</style>
