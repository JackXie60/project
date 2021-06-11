<template>
  <div class="sidebar-container">
    <div class="avator">
      <Avator
      @imgLeave="handleLeave"
      @imgClick="handleClick"
        :text="text"
        :img="imgSrc"
      />
    </div>
    <div class="menu">
      <Menu />
    </div>
  </div>
</template>

<script>
import Menu from "./Menu/index";
import Avator from "./Avator/index";

export default {
  components: {
    Menu,
    Avator,
  },
  created () {
    console.log(this.$store.state);
  },
  computed: {
    imgSrc(){
      if(this.$store.state.login.userData){
        return this.$store.state.login.userData.avator
      }else{
        return "加载中..."
      }
    },
    text(){
      return this.$store.state.login.userData?this.$store.state.login.userData.username:"加载中";
    }
  },
  methods: {
    handleClick(){
      this.$emit("imgClick")
    },
    handleLeave(){
      this.$emit("imgLeave");
    }
  }
};
</script>

<style scoped lang="less">
.sidebar-container {
  width: 100%;
  height: 100%;
  background-color: rgb(51, 49, 49);
  min-width: 250px;
  @media screen and (max-width:1120px){
    // display: none;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    .menu{
      margin-left: 30px;
    }
  } 
  @media screen and (max-width: 580px){
    height: 60px;  
  }
  @media screen and (max-width: 380px){
    justify-content: space-around;
  }
  .avator {
    color: #fff;
    padding: 20px 0px 20px 0px;
  }
}
</style>
