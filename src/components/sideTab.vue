<template>
  <div class="sidetab-wrapper" ref="sideTab">
    <div class="sidetab-sidelist" v-for="(side, i) in sideList" :key="side">
      <div
        class="sidetab-item"
        :class="{
          active: index == i
        }"
        @touchend="handleTouch(i, $event)"
        @touchstart="move = false"
        @touchmove="move = true"
      >
        {{ i == 0 ? "首页" : side }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  // 挂载时获取数据，根据是否获取了全部数据来设置isFinished的值
  // async mounted() {
  //   const result = await this.getGoodsList({
  //     type: this.sideList[0],
  //     page: 1,
  //   });
  //   if (result) {
  //     this.setIsFinishied(false);
  //   } else {
  //     this.setIsFinishied(true);
  //   }
  // },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList', 'setIsFinishied', 'setGoodsType']),
    // 点击侧边栏触发的函数，根据触发的索引和事件对象来获取商品列表
    async handleTouch(i, e) {
      if (this.move) {
        return;
      }
      const { sideTab } = this.$refs;
      this.index = i;
      // 获取位置信息，让点击的元素居中
      const pHeight = sideTab.offsetHeight;
      const pDis = sideTab.getBoundingClientRect().top;
      const sHeight = e.target.offsetHeight;
      const sDis = e.target.getBoundingClientRect().top;
      this.moveTo(sideTab.scrollTop, -(pHeight / 2 + pDis - sDis - sHeight / 2));
      // 每次获取商品列表时，先清除商品列表原来的内容
      // 根据是否获取完成设置isFinished
      this.resetGoodsList();
      this.setGoodsType(this.sideList[i]);
      const result = await this.getGoodsList({
        type: this.sideList[i],
        page: 1,
      });
      if (result) {
        this.setIsFinishied(false);
      } else {
        this.setIsFinishied(true);
      }
    },
    moveTo(start, end) {
      let speed = 5;
      let dis = 0;
      if (end < 0) {
        speed *= -1;
      }
      const timer = setInterval(() => {
        dis += speed;
        this.$refs.sideTab.scrollTop = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.sideTab.scrollTop = start + end;
          clearInterval(timer);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less">
.sidetab-wrapper {
  position: fixed;
  width: 100px;
  top: 159px;
  bottom: 50px;
  overflow: auto;
  .sidetab-sidelist {
    .sidetab-item {
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
      position: relative;
      &.active {
        color: #ff1a90;
        font-weight: bold;
      }
      &.active::before {
        content: "";
        position: absolute;
        width: 6px;
        height: 18px;
        background: #ff1a90;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }
}
.sidetab-wrapper::-webkit-scrollbar {
  width: 0px;
}
</style>
