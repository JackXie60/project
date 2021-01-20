<template>
  <div class="onetab-wrapper" ref="oneTab">
    <div class="onetab-item"
        :class="{
          'active':index==i
        }"
        v-for="(menu,i) in menuList"
        :key="menu.title"
        @touchend="handleTouch(i,$event)"
        @touchstart="move=false"
        @touchmove="move=true"
        >
      <div class="image-wrapper">
        <img :src="menu.imgURL" alt="">
      </div>
      <div class="title-wrapper">
        {{ menu.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  mounted() {
    this.getSideList(this.menuList[0].title);
  },
  methods: {
    ...mapActions(['getSideList']),
    ...mapMutations(['setGoodsType', 'setPage', 'resetGoodsList']),
    handleTouch(i, e) {
      if (this.move) {
        return;
      }
      this.setPage(1);
      this.index = i;
      const { oneTab } = this.$refs;
      const sDis = e.target.getBoundingClientRect().left;
      const pWidth = oneTab.offsetWidth;
      const sWidth = e.target.offsetWidth;
      this.moveTo(oneTab.scrollLeft, sWidth / 2 + sDis - pWidth / 2);
      // 将获取来的用于渲染侧边栏的数据保存到仓库中的sideList;
      // sideList存储的内容就是用来goodsType的值
      this.getSideList(this.menuList[i].title);
      // 每次切换需要清除商品列表goodsList中的数据，根据点击的内容设置goodsType
      this.setGoodsType(this.menuList[i].title[0]);
      this.resetGoodsList();
    },
    moveTo(start, end) {
      let speed = 5;
      let dis = 0;
      if (end < 0) {
        speed = -5;
      }
      const timer = setInterval(() => {
        dis += speed;
        this.$refs.oneTab.scrollLeft = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.oneTab.scrollLeft = start + end;
          clearInterval(timer);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less">
.onetab-wrapper {
  width: 375px;
  height: 104px;
  display: flex;
  overflow-x:scroll;
  overflow-y: hidden;
  box-sizing: border-box;
  .onetab-item {
    width: 65px;
    height: 100px;
    margin: 2px;
     .image-wrapper {
      width: 59px;
      height: 59px;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 40%;
      margin-top: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .title-wrapper{
      text-align: center;
      font-size: 12px;
      margin-top: 10px;
    }
    &.active{
      .image-wrapper{
        border: 3px solid rgb(255, 0, 157);
      }
      .title-wrapper{
        color: #fff;
        font-weight: bold;
        padding: 2px;
        background-color: rgb(255, 0, 157);
        border-radius: 20%;
      }
    }
  }
}
.onetab-wrapper::-webkit-scrollbar{
  width: 0px;
}
</style>
