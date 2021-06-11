<template>
  <div class="test-container">
      <div class="avator-area">
          <Avator :url="setting.avatar" v-if="setting"/>
          <h2 class="title" v-if="setting">{{setting.siteTitle}}</h2>
      </div>
      <div class="menu-area">
          <Menu/>
      </div>
      <div class="otherInfo-area">
          <OtherInfo v-if="setting"/>
      </div>
  </div>
</template>

<script>
import Menu from "./Menu";
import OtherInfo from "./OtherInfo";
import Avator from "../Avator";
import {mapState} from "vuex";
export default {
    components:{
        Menu,
        OtherInfo,
        Avator,
    },
    computed: {
        ...mapState('setting', ["setting"]),
    },
}
</script>

<style scoped lang="less">
.test-container{
    background-color: black;
    max-width: 300px;
    min-width: 250px;
    height: 100vh;
    margin: 0;
    padding: 0;
    padding: 20px 0;
    box-sizing: border-box;
    .avator-area{
        min-height: 200px;
        text-align: center;
        .title{
            color:#fff
        }
    }
    .menu-area{
        padding-bottom: 80px;
    }
    .otherInfo-area{
        padding-left: 10px;
    }
}
</style>