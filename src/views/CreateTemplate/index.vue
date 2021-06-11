<template>
  <div class="createTemplate-container">
    <header class="home-header">
      <input
        @keyup.enter="handleAdd"
        type="text"
        placeholder="what need you to do?"
        v-model.trim="planContent"
      />
      <button class="add" @click="handleAdd">添加</button>
      <button class="complete" @click="completeTemplate">完成模板</button>
      <div class="planTime">
        <router-link
          :class="{
            selected: planTime == 'day',
          }"
          :to="{ name: 'createTemplate', params: { planTime: 'day' } }"
          @click.native="changePlanTime('day')"
        >
          日计划
        </router-link>
        <router-link
          :class="{
            selected: planTime == 'week',
          }"
          :to="{ name: 'createTemplate', params: { planTime: 'week' } }"
          @click.native="changePlanTime('week')"
        >
          周计划
        </router-link>
        <router-link
          :class="{
            selected: planTime == 'month',
          }"
          :to="{ name: 'createTemplate', params: { planTime: 'month' } }"
          @click.native="changePlanTime('month')"
        >
          月计划
        </router-link>
      </div>
    </header>
    <div class="content">
      <!-- <ToDoList/> -->
      <transition
        leave-active-class="animated fadeOut"
        enter-active-class="animated flipInX"
      >
        <keep-alive>
          <ToDoList
            key="day"
            v-if="planTime == 'day'"
            ref="todolist"
            :eventList="dayToDoList"
          ></ToDoList>
          <!-- <Empty v-else></Empty> -->
          <ToDoList
            key="week"
            v-else-if="planTime == 'week'"
            ref="todolist"
            :eventList="weekToDoList"
          ></ToDoList>
          <ToDoList
            key="month"
            v-else-if="planTime == 'month'"
            ref="todolist"
            :eventList="monthToDoList"
          ></ToDoList>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Empty from "@/components/base/Empty";
import ToDoList from "@/components/todolist";
import Html2Canvas from "html2canvas";
import Canvas2Image from "canvas2image";
import { mapGetters } from "vuex";
import { addFaceToMap } from "@/service/faceToMap"
export default {
  components: {
    ToDoList,
    Empty,
  },
  data() {
    return {
      planTime: "day",
      planContent: "",
      desc: "",
      dayToDoList: [],
      monthToDoList: [],
      weekToDoList: [],
    };
  },
  //初始化时，如果parmas中有planTime，那么就将他赋值给planTime
  created() {
    if (this.$route.params.planTime) {
      this.planTime = this.$route.params.planTime;
    }
  },
  computed: {
    ...mapGetters("login", ["appkey"]),
  },
  methods: {
    changePlanTime(planTime) {
      this.planTime = planTime;
    },
    async handleAdd() {
      if (this.planContent == "") {
        return;
      }
      // this.$bus.$emit("addToDoList", this.planContent);

      //需要先上传到服务器，然后请求到
      if (this.planTime == "day") {
        this.dayToDoList = [
          ...this.dayToDoList,
          {
            id: this.dayToDoList.length,
            content: this.planContent,
            isFinished: false,
          },
        ];
      } else if (this.planTime == "week") {
        this.weekToDoList = [
          ...this.weekToDoList,
          {
            id: this.weekToDoList.length,
            content: this.planContent,
            isFinished: false,
          },
        ];
      } else if (this.planTime == "month") {
        this.monthToDoList = [
          ...(this.monthToDoList = [
            ...this.monthToDoList,
            {
              id: this.monthToDoList.length,
              content: this.planContent,
              isFinished: false,
            },
          ]),
        ];
      }
      this.planContent = "";
      this.$showMessage({
        type: "success",
        content: "添加成功",
        container: this.$refs.todolist.$el,
      });
    },
    completeTemplate() {
      //上传模板内容
      //上传模板封面
      //上传到映射表
      console.log(this.dayToDoList,this.weekToDoList,this.monthToDoList)
      if (
        (this.planTime == "day" && this.dayToDoList.length > 0) ||
        (this.planTime == "week" && this.weekToDoList.length > 0) ||
        (this.planTime == "month" && this.monthToDoList.length > 0)
      ) { 
        const list = (this.planTime=='day'?this.dayToDoList:(this.planTime=='week'?this.weekToDoList:this.monthToDoList));
        this.desc = prompt("请输入描述");
        const isComfirm = confirm("确认完成");
        if (isComfirm) {
          //上传模板内容
          this.$store.dispatch("templateContent/addTemplateContent",{
            appkey:this.appkey,
            todolist:list,
            count:list.length,
          }).then((res)=>{
            console.log("res",res)
            this.contentId = res.id;
            //将html转换为canvas然后转换未image保存
            Html2Canvas(this.$refs.todolist.$el).then((cavans) => {
            const img = Canvas2Image.convertToImage(cavans, 250, 180, "jpg");
            this.$store.dispatch("template/addTemplateFace", {
              imgSrc: img.src,
              planTime: this.planTime,
              desc: this.desc == "" ? undefined : this.desc,
              appkey: this.appkey,
            }).then(async res=>{
              console.log("res2",res)
              this.faceId = res.id;
              //上传到faceToMap表中
              await addFaceToMap(this.faceId,this.contentId);
              //上传信息成功，弹出提示框
              this.$router.push({
                name: "home",
                params: { planTime: this.planTime },
              });
            });
          });
          })
        }
      }else{
          this.$showMessage({
            type:"error",
            content:"模板无内容!",
            container: this.$refs.todolist.$el,
          })
        }
    },
  },
};
</script>

<style scoped lang="less">
.createTemplate-container {
  height: 100%;
  width: 100%;
  background: url("../../assets/bg.jpg");
  padding: 20px;
  box-sizing: border-box;
  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    display: block;
  }
  .home-header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding-left: 60px;
    flex-wrap: wrap;
    min-width: 582px;
    width: 900px;
    > input {
      width: 400px;
      height: 40px;
      border-radius: 5px;
      outline: none;
      border: none;
      text-indent: 1em;
      font-size: 20px;
      &.desc {
        width: 200px;
        margin-left: 30px;
      }
    }
    .add {
      border: none;
      width: 100px;
      height: 40px;
      margin-left: 20px;
      border-radius: 3px;
      box-shadow: 2px 2px 2px rgb(102, 98, 98);
      &:active {
        background-color: rgb(190, 70, 34);
        color: #fff;
        box-shadow: none;
      }
    }
    .complete {
      border: none;
      width: 100px;
      height: 40px;
      margin-left: 20px;
      border-radius: 3px;
      box-shadow: 2px 2px 2px rgb(102, 98, 98);
      &:active {
        background-color: rgb(190, 70, 34);
        color: #fff;
        box-shadow: none;
      }
    }
  }
}
.content {
  position: relative;
}
.planTime {
  border: 1px solid #ccc;
  flex: 0 0 auto;
  width: 700px;
  display: flex;
  height: 50px;
  align-items: center;
  margin-top: 10px;
  border-radius: 5px;
  background-color: darkslategray;
  > a {
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    margin-left: 10px;
    background-color: rgb(20, 148, 120);
    color: #fff;
    cursor: pointer;
    text-decoration: none;
  }
  .selected {
    background-color: darkorange;
  }
}
</style>
