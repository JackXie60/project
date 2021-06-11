<template>
  <div
    class="crouseItems-container"
    ref="container"
    @wheel="handleWheel"
    @transitionEnd="handleTransitionEnd"
    v-loading="isLoading"
  >
    <ul
      class="crouseItems"
      :style="marginTop"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in banners" :key="item.id" class="crouse-item">
        <CrouseItem :banner="item" />
      </li>
    </ul>
    <div class="arrow-up" @click="handleClick(`top`)">
      <Icon type="arrowUp" />
    </div>
    <div class="arrow-down" @click="handleClick(`down`)">
      <Icon type="arrowDown" />
    </div>
    <div class="crouse-indicator">
      <span
        v-for="(item, i) in banners"
        :key="item.midImg"
        @click="handleClick(i)"
        class="indicator-item"
        :class="{
          selected: curPage == i,
        }"
      ></span>
    </div>
  </div>
</template>

<script>
import CrouseItem from "./CrouseItem";
import Icon from "../Icon";
import {mapState} from "vuex"
export default {
  components: {
    CrouseItem,
    Icon,
  },
  data() {
    return {
      clietnHeight:0,
      curPage: 0,
      switching:false,
    };
  },
  async created() {
    this.$store.dispatch("banners/setBanners");
  },
  mounted () {
    this.clientHeight = this.$refs.container.clientHeight;
  },
  computed: {
    marginTop(){
      return {
        marginTop:-this.curPage*this.clientHeight+'px'
      }
    },
    ...mapState('banners', ["isLoading","banners"]),
  },
  methods: {
    handleClick(direction) {
      if (typeof direction == "string") {
        if (direction == "top" && this.curPage > 0) {
          this.curPage--;
        } else if (
          direction == "down" &&
          this.curPage < this.banners.length - 1
        ) {
          this.curPage++;
        }
      } else if (typeof direction == "number") {
        this.curPage=direction;
      }
    },
    handleWheel(e){
      if(this.switching){
        return;
      }
      if(e.deltaY<-5&&this.curPage>0){
        this.switching = true;
        this.curPage--;
      }else if(e.deltaY>5&&this.curPage<this.banners.length-1){
        this.switching = true;
        this.curPage++;
      }
    },
    handleTransitionEnd(){
      this.switching = false;
    }
  },
};
</script>

<style scoped lang="less">
.crouseItems-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  ul {
    list-style: none;
    padding: 0;
  }
  .crouseItems {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.4s;
    top: 0;
    margin: 0;
    .crouse-item {
      width: 100%;
      height: 100%;
      .item {
        width: 100%;
        height: 100%;
      }
    }
  }
  .arrow-up {
    position: absolute;
    top: 10px;
    left: 50%;
    font-size: 45px;
    color: #fff;
    transform: translateX(-50%);
    animation: bounce 1s infinite;
  }
  .arrow-down {
    position: absolute;
    bottom: 10px;
    left: 50%;
    font-size: 45px;
    color: #fff;
    transform: translateX(-50%);
    animation: bounce 1s infinite reverse;
  }
  @keyframes bounce {
    0% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(-5px);
    }
  }
  .crouse-indicator {
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .indicator-item {
      display: block;
      width: 10px;
      height: 10px;
      background-color: #555;
      border-radius: 50%;
      &.selected {
        background-color: #fff;
      }
    }
  }
  .text-content {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
  }
  .title {
    font-size: 26px;
    color: #fff;
    top: 0;
    text-shadow: 1px 0px 1px #ccc, 0px 1px 1px #ccc, -1px 0px 1px #ccc,
      0px -1px 1px #ccc;
    letter-spacing: 3px;
    white-space: nowrap;
    margin-bottom: 10px;
  }
  .desc {
    position: absolute;
    font-size: 18px;
    color: #fff;
    letter-spacing: 3px;
    white-space: nowrap;
    text-shadow: 1px 0px 1px #ccc, 0px 1px 1px #ccc, -1px 0px 1px #ccc,
      0px -1px 1px #ccc;
  }
}
</style>
