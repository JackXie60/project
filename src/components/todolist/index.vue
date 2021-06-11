<template>
  <div class="todolist-container" ref="todolistContainer">
    <span class="title">计划表</span>
    <div class="eventLists">
      <Empty v-if="eventList.length==0"/>
      <transition-group
        v-else
        name="out-in"
        tag="div"
        leave-active-class="animated bounceOutRight"
        enter-active-class="animated zoomInLeft"
      >
        <div v-for="(list) in eventList" :key="list.id" class="eventList" >
          <input
            :disabled="list.isFinished"
            class=""
            type="text"
            v-model="list.content"
          />
          <span
            class="deleteline"
            :style="{
              opacity: list.isFinished ? 1 : 0,
            }"
          ></span>
          
          <button class="delete" @click="handleDelete(list.id)">删除</button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Empty from "@/components/base/Empty"
export default {
  props:{
    eventList:{
      type:Array,
      require:true,
    },
    isShowMessage:{
      type:Boolean,
      default:false,
    }
  },
  components:{
    Empty,
  },
  methods: {
    // handleClick(i) {
    //   this.eventList[i].isFinished = !this.eventList[i].isFinished;
      // if (this.eventList[i].isFinished) {
      //   this.finishedArr.push(true);
      // } else {
      //   this.finishedArr.pop(true);
      // }
      // if (this.finishedArr.length == this.listLen && this.isShowMessage) {
      //   setTimeout(() => {
      //     this.$showMessage({
      //       type:"success",
      //       content:"恭喜,任务已全部完成！",
      //       duration:1000,
      //       size:250,
      //       container:this.$refs.todolistContainer,
      //     })
      //   }, 0);
      // }
    // },
    handleDelete(id) {
      this.$emit("delete",id);
    },
  },
  data() {
    return {
      finishedArr: [],
    };
  },
  computed: {
    listLen() {
      return this.eventList.length;
    },
  },
  created() {
    this.finishedArr = this.eventList
      .filter((item) => {
        if (item.isFinished) {
          return true;
        }
      })
      .map((item) => {
        return item.isFinished;
      });
  },
};
</script>

<style scoped lang="less">
.eventLists::-webkit-scrollbar {
  width: 0px;
}
.todolist-container {
  position: absolute;
  overflow: hidden;
  width: 800px;
  height: 540px;
  margin-left: 60px;
    margin-top: 30px;
  .title {
    position: absolute;
    top: 0;
    left: 60px;
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    display: inline-block;
    width: 800px;
    color: #fff;
    text-shadow: 1px 1px 2px black;
  }
  .eventLists {
    text-align: left;
    background-color: rgb(155, 129, 80);
    width: 100%;
    position: relative;
    height: 100%;
    overflow-y: scroll;
  }
  .eventList {
    height: 60px;
    line-height: 60px;
    position: relative;
    input {
      margin-left: 8px;
      width: 700px;
      height: 40px;
      outline: none;
      border: none;
      border-radius: 5px;
      text-indent: 1em;
      font-size: 18px;
      line-height: 40px;
    }
    .deleteline {
      display: inline-block;
      width: 640px;
      border-top: 4px solid #ccc;
      position: absolute;
      top: 28px;
      left: 10px;
    }
    button {
      height: 40px;
      width: 60px;
      margin-left: 10px;
      border: none;
      font-weight: bold;
    }
    .finished {
      background-color: #67c23a;
      color: #fff;
    }
    .delete {
      background-color: #ff4d4f;
    }
  }
  @media screen and (max-width: 1150px) {
      flex: 0 0 auto;
      width: 730px;
      height: 420px;
      .eventList{
        input{
          width: 640px;
        }
      }
    }
  @media screen and (max-width: 810px) {
      width: 600px;
      .title{
        left: 10px;
      }
      .eventLists{
        margin-left: 10px;
      }
      .eventList{
        input{
          width: 490px;
        }
      }
  }
  @media screen and (max-width: 700px) {
    margin-left: 0px;
      width: 98vw;
      .eventList{
        input{
          width: 80vw;
        }
      }
  }
  @media screen and (max-width: 540px) {
      .eventList{
        input{
          width: 75vw;
        }
      }
  }
  @media screen and (max-width: 510px) {
      .eventList{
        input{
          width: 70vw;
        }
      }
  }
  @media screen and (max-width: 350px) {
      .eventList{
        input{
          width: 60vw;
        }
      }
  }
  @media screen and (max-height: 930px){
      height: 420px;
  }
  @media screen and (max-height: 835px)  {
      height: 360px;
  }
  @media screen and (max-height: 790px) {
      height: 300px;
      margin-top: 0px;
      .title{
        display: none;
      }
  }
  @media screen and (max-height: 680px){
      height: 240px;
  }
}
</style>
