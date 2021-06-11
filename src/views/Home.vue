<template>
  <div class="home-container">
    <Layout>
      <template #content class="content-area">
        <header class="home-header">
          <input
            @keyup.enter="handleAdd"
            type="text"
            placeholder="what need you to do?"
            v-model.trim="planContent"
          />
          <button class="add" @click="handleAdd">添加</button>
          <button class="sureTask" @click="handleTask">确认计划</button>
          <div class="planTime">
            <router-link
              :class="{
                selected: planTime == 'day',
              }"
              :to="{ name: 'home', params: { planTime: 'day' } }"
              @click.native="changePlanTime('day')"
            >
              日计划
            </router-link>
            <router-link
              :class="{
                selected: planTime == 'week',
              }"
              :to="{ name: 'home', params: { planTime: 'week' } }"
              @click.native="changePlanTime('week')"
            >
              周计划
            </router-link>
            <router-link
              :class="{
                selected: planTime == 'month',
              }"
              :to="{ name: 'home', params: { planTime: 'month' } }"
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
                :eventList="dayToDoList"
                :isShowMessage="true"
                ref="todolist"
                @delete="handleDelete"
              ></ToDoList>
              <!-- <Empty v-else></Empty> -->
              <ToDoList
                key="week"
                v-else-if="planTime == 'week'"
                :eventList="weekToDoList"
                :isShowMessage="true"
                ref="todolist"
                @delete="handleDelete"
              ></ToDoList>
              <ToDoList
                key="month"
                v-else-if="planTime == 'month'"
                :eventList="monthToDoList"
                :isShowMessage="true"
                ref="todolist"
                @delete="handleDelete"
              ></ToDoList>
            </keep-alive>
          </transition>
        </div>
      </template>
      <template #right>
        <div class="right">
          <ToDoListTemplate
            @useTemplate="handleUseTemplate"
            :imgs="imgs"
            :planTime="planTime"
          />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import ToDoList from "@/components/todolist";
import Empty from "@/components/base/Empty";
import ToDoListTemplate from "@/components/base/ToDoListTemplate";
import Layout from "@/components/base/Layout";
import { mapGetters } from "vuex";
import { searchFaceToMap } from "@/service/faceToMap";
export default {
  components: {
    ToDoList,
    Empty,
    Layout,
    ToDoListTemplate,
  },
  computed: {
    ...mapGetters("login", ["appkey"]),
    imgs() {
      return this.$store.state.template.templateList;
    },
    taskCount() {
      return this.templateList.length > 0
        ? this.templateList[this.templateList.length - 1].id
        : 0;
    },
  },
  data() {
    return {
      planTime: "day",
      planContent: "",
      dayToDoList: [],
      monthToDoList: [],
      weekToDoList: [],
      templateList: [],
    };
  },
  async created() {
    if (this.$route.params.planTime) {
      this.planTime = this.$route.params.planTime;
    }
    this.dayToDoList = JSON.parse(localStorage.getItem("dayTodoList")) || [];
    this.weekToDoList = JSON.parse(localStorage.getItem("weekTodoList")) || [];
    this.monthToDoList =
      JSON.parse(localStorage.getItem("monthTodoList")) || [];
    await this.searchTemplateFace();
    this.templateList =
      this.planTime == "day"
        ? this.dayToDoList
        : this.planTime == "week"
        ? this.weekToDoList
        : this.planTime == "month"
        ? this.monthToDoList
        : [];
  },
  methods: {
    //生成计划
    handleTask() {
      const startTime = new Date().getTime();
      let endTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
      if (this.templateList.length == 0) {
        this.$showMessage({
          type: "warn",
          content: "空计划!",
          container: this.$refs.todolist.$el,
        });
      } else {
        if (this.planTime == "day") {
          endTime = endTime + 86400 * 1000;
        } else if (this.planTime == "week") {
          endTime = endTime + 86400 * 7 * 1000;
        } else if (this.planTime == "month") {
          endTime = endTime + 86400 * 30 * 1000;
        }
        this.templateList.forEach(async (item) => {
          await this.$store.dispatch("backlog/setCurBacklog", {
            content: item.content,
            startTime: startTime,
            endTime: endTime,
            isFinished: false,
            planTime: this.planTime,
            appkey: this.appkey,
            finishedTime: -10000,
          });
        });
        this.$showMessage({
          type: "success",
          content: "计划已更新",
          container: this.$refs.todolist.$el,
        });
      }
    },
    //使用模板
    async handleUseTemplate(id) {
      const result = await searchFaceToMap(id);
      this.contentId = result.contentId;
      const list = await this.$store.dispatch(
        "templateContent/searchTemplateContent",
        {
          id: this.contentId,
        }
      );
      this.templateList = list.todolist;
      if (this.planTime == "day") {
        this.dayToDoList = this.templateList;
        localStorage.setItem("dayTodoList", JSON.stringify(this.dayToDoList));
      } else if (this.planTime == "week") {
        this.weekToDoList = this.templateList;
        localStorage.setItem("weekTodoList", JSON.stringify(this.weekToDoList));
      } else if (this.planTime == "month") {
        this.monthToDoList = this.templateList;
        localStorage.setItem(
          "monthTodoList",
          JSON.stringify(this.monthToDoList)
        );
      }
    },
    //根据planTime和appkey查找模板封面
    async searchTemplateFace() {
      await this.$store.dispatch("template/searchTemplateFace", {
        appkey: localStorage.getItem("appkey"),
        planTime: this.planTime,
      });
      // this.imgs = this.$store.state.template.templateList;
    },
    //更改planTime
    changePlanTime(planTime) {
      if (planTime == this.planTime) {
        return;
      }
      this.planTime = planTime;
      if (this.planTime == "day") {
        this.templateList = this.dayToDoList;
      } else if (this.planTime == "week") {
        this.templateList = this.weekToDoList;
      } else if (this.planTime == "month") {
        this.templateList = this.monthToDoList;
      }
    },
    //在计划列表中添加一项
    handleAdd() {
      if (this.planContent == "") {
        return;
      }
      const task = {
        id: this.taskCount + 1,
        content: this.planContent,
        isFinished: false,
      };
      this.templateList = [...this.templateList, task];
      if (this.planTime == "day") {
        this.dayToDoList = this.templateList;
        localStorage.setItem("dayTodoList", JSON.stringify(this.dayToDoList));
      } else if (this.planTime == "week") {
        this.weekToDoList = this.templateList;
        localStorage.setItem("weekTodoList", JSON.stringify(this.weekToDoList));
      } else if (this.planTime == "month") {
        this.monthToDoList = this.templateList;
        localStorage.setItem(
          "monthTodoList",
          JSON.stringify(this.monthToDoList)
        );
      }
      this.planContent = "";
    },
    //删除计划内容
    handleDelete(id) {
      if (this.planTime == "day") {
        this.dayToDoList = this.dayToDoList.filter((item) => {
          return item.id != id;
        });
        this.templateList = this.dayToDoList;
        console.log(this.templateList);
        localStorage.setItem("dayTodoList", JSON.stringify(this.dayToDoList));
      } else if (this.planTime == "week") {
        this.weekToDoList = this.weekToDoList.filter((item) => {
          return item.id != id;
        });
        this.templateList = this.weekToDoList;
        localStorage.setItem("weekTodoList", JSON.stringify(this.weekToDoList));
      } else if (this.planTime == "month") {
        this.monthToDoList = this.monthToDoList.filter((item) => {
          return item.id != id;
        });
        this.templateList = this.monthToDoList;
        localStorage.setItem(
          "monthTodoList",
          JSON.stringify(this.monthToDoList)
        );
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container::-webkit-scrollbar {
  width: 0px;
}
.home-container {
  width: 100%;
  height: 100%;
  background-color: rgb(148, 146, 117);
  position: relative;
  .home-header {
    margin-bottom: 20px;
    margin-top: 20px;
    padding-left: 60px;
    min-width: 582px;
    width: 700px;
    input {
      width: 400px;
      height: 40px;
      border-radius: 5px;
      outline: none;
      border: none;
      text-indent: 1em;
      font-size: 20px;
    }
    button {
      border: none;
      width: 100px;
      height: 40px;
      margin-left: 20px;
      box-sizing: border-box;
      border-radius: 3px;
      box-shadow: 2px 2px 2px rgb(102, 98, 98);
      &:active {
        background-color: rgb(190, 70, 34);
        color: #fff;
        box-shadow: none;
      }
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
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 60%;
        width: 50px;
        font-size: 12px;
        // line-height: 60%;
        border: 1px solid #ccc;
        margin-left: 10px;
        background-color: rgb(20, 148, 120);
        color: #fff;
        cursor: pointer;
        // display: inline-block;
        text-decoration: none;
      }
      .selected {
        background-color: darkorange;
      }
    }
    @media screen and (max-width: 810px) {
      padding-left: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
      .planTime{
        width: 192px;
        height: 25px;
      }
      >input{
        width: 40vw;
        min-width: 220px;
        height: 25px;
      }
      >button{
        width: 60px;
        font-size: 12px;
        height: 25px;
        margin-left: 10px;
        padding: 0px;
        transform: translateY(-2px);
      }
    }
  }
  .layout-container{
    @media screen and (max-width: 1470px) {
      display: flex;
      flex-direction: column;
    }
  }
  .right {
    width: 100%;
    height: 100%;
    background-color: burlywood;
    @media screen and (max-width: 1470px) {
      bottom: 0;
      height: 180px;
      display: flex;
    }
  }
}
</style>
