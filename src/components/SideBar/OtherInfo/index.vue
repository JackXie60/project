<template>
  <div class="otherInfo-container">
    <ul>
      <li>
        <a href="">
          <div class="icon">
            <Icon type="github" />
          </div>
          <span>JackXie</span>
        </a>
      </li>
      <li>
        <a href="">
          <div class="icon mail">
            <Icon type="mail" />
          </div>
          <span>1809697652@qq.com</span>
        </a>
      </li>
      <li>
        <a href="">
          <div class="icon">
            <Icon type="qq" />
          </div>
          <span>1809697652</span>
          <div class="top">
              <img src="http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png" alt="">
          </div>
        </a>
      </li>
      <li>
        <a href="">
          <div class="icon">
            <Icon type="weixin" />
          </div>
          <span>1809697652weixin</span>
          <div class="top">
              <img src="http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png" alt="">
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
};
</script>

<style scoped lang="less">
.otherInfo-container {
  & > ul {
    list-style: none;
    padding: 10px;
    li {
      height: 30px;
      line-height: 30px;
      position: relative;
      a{
          display: flex;
          text-decoration: none;
          color: #fff;
          &:hover .top{
              transform: scaleY(1);
          }
      }
    }
    .icon {
      font-size: 26px;
      width: 36px;
      &.mail {
        font-size: 16px;
      }
    }
  }
  .top{
      position: absolute;
      bottom: 0;
      left: 30px;
      bottom: 30px;
      transform: scaleY(0);
      transition: 0.3s;
      transform-origin: bottom center;
      &::after{
          content: "";
          width: 0px;
          height: 0px;
          display: block;
          position: absolute;
          left: 50%;
          margin-left: -10px;
          bottom: -10px;
          border-width: 10px;
          border-style: solid;
          border-color: white transparent transparent transparent;
      }
  }
}
</style>
