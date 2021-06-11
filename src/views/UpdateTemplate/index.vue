<template>
  <div class="updateTemplate-container">
    <header>
      <h2 class="title">修改模板</h2>
      <div class="input-area">
        <input
          type="text"
          placeholder="添加任务"
          v-model="task"
          @keyup.enter="handleAdd"
        />
      </div>
      <button @click="handleUpdate">确认修改</button>
    </header>
    <ToDoList ref="todolist" :eventList="templateList" @delete="handleDelete" />
  </div>
</template>

<script>
import ToDoList from "@/components/todolist";
import { searchFaceToMap } from "@/service/faceToMap";
import { mapGetters } from "vuex";
import Html2Canvas from "html2canvas";
import Canvas2Image from "canvas2image";
export default {
  components: {
    ToDoList,
  },
  data() {
    return {
      templateList: [],
      task: "",
      count: 0,
    };
  },
  computed: {
    ...mapGetters("login", ["appkey"]),
  },
  methods: {
    async handleUpdate() {
      if (this.templateList.length == 0) {
        this.$showMessage({
          type: "warn",
          content: "模板无内容",
          container: this.$refs.todolist.$el,
        });
        return;
      } else {
        await this.$store.dispatch("templateContent/updateTemplateContent", {
          id: this.contentId,
          appkey: this.appkey,
          todolist: this.templateList,
        });
        const desc = prompt("请输入描述");

        Html2Canvas(this.$refs.todolist.$el).then((cavans) => {
          const img = Canvas2Image.convertToImage(cavans, 250, 180, "jpg");
          const info = {
            id:this.$route.params.detailTemplateId,
            imgSrc:img.src,
          }
          if(desc&&desc!=""){
            info.desc = desc;
          }
          this.$store
            .dispatch("template/updateTemplateFace", info)
            .then(async () => {
              //上传信息成功，弹出提示框
              this.$router.go(-1);
            });
        });
      }
    },
    handleAdd() {
      this.templateList = [
        ...this.templateList,
        {
          id: ++this.count,
          content: this.task,
          isFinished: false,
        },
      ];
      this.task = "";
    },
    handleDelete(id) {
      this.templateList = this.templateList.filter((item) => {
        return item.id != id;
      });
    },
  },
  async created() {
    const faceId = this.$route.params.detailTemplateId;
    const result = await searchFaceToMap(faceId);
    this.contentId = result.contentId;
    const list = await this.$store.dispatch(
      "templateContent/searchTemplateContent",
      {
        id: this.contentId,
      }
    );
    this.templateList = list.todolist;
    this.count = this.templateList[this.templateList.length - 1].id;
  },
};
</script>

<style scoped lang="less">
.updateTemplate-container {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  overflow: hidden;
}
header {
  margin-left: 60px;
  margin-top: 20px;
  margin-bottom: 30px;
  .title {
    font-size: 30px;
    font-weight: bold;
  }
  .input-area {
    margin-top: 20px;
    margin-bottom: 20px;
    input {
      height: 35px;
      border: 1px solid rgb(138, 137, 137);
      outline: none;
      text-indent: 1em;
      border-radius: 5px;
      width: 500px;
    }
  }
  button {
    width: 100px;
    height: 30px;
    color: rgb(14, 9, 9);
    font-weight: bold;
    background-color: rgb(226, 208, 128);
  }
}
</style>
