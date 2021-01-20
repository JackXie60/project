<template>
  <div class="goodsList-item">
    <div class="goodsList-img">
      <img :src="image" alt="" ref="imgRef"/>
    </div>
    <div class="goodsList-content">
      <div class="title">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
      <div class="tags">
        <div class="tag-item" v-for="tag in tags" :key="tag">{{ tag }}</div>
      </div>
      <div class="price">￥{{price}}</div>
      <div class="counter">
        <div @touchend="counter(id,-1)" v-if="num">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" alt="">
        </div>
        <div class="num" v-if="num">{{ num }}</div>
        <div @touchend="counter(id,1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '../tools';

export default {
  props: {
    image: String,
    title: String,
    desc: String,
    tags: Array,
    price: Number,
    id: Number,
    num: Number,
  },
  methods: {
    ...mapMutations(['changeStorage']),
    counter(id, num) {
      this.changeStorage({ id, value: num });
      if (num === -1) {
        return;
      }
      const { top, left } = this.$refs.imgRef.getBoundingClientRect();
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.imgRef;
      const shopCar = document.getElementById('shop-car');
      const { left: carX, top: carY } = shopCar.getBoundingClientRect();
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.imgRef.src,
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
};
</script>

<style lang='less'>
.goodsList-item{
  display: flex;
  width: 100%;
  height: 100px;
  .goodsList-img{
    img{
      width: 90px;
      height: 90px;
      margin-right:20px ;
    }
  }
  .goodsList-content{
    position: relative;
    right: 0;
    &>div{
      width: 175px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .title{
      margin-top: 5px;
      color: black;
      font-size: 14px;
    }
    .desc{
      margin-top: 5px;
      color: #999;
      font-size: 12px;
    }
    .tags{
      display: flex;
      color: #999;
      font-size: 12px;
      margin-top: 4px;
      .tag-item{
        padding: 2px;
        border: 1px solid #999;
        border-radius: 5px;
        margin-right: 5px;
      }
    }
    .price{
      color: #ff19a1;
      font-weight: bold;
      font-size: 14px;
      margin-top: 4px;
    }
    .counter{
      width: 70px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: absolute;
      bottom: 2px;
      right: 15px;
      >div{
        margin: 2px;
        >img{
          width: 20px;
          height: 20px;
        }
      }
      .num{
        width: 30px;
        text-align: center;
      }
    }
  }
}
</style>
