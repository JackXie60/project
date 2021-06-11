<template>
  <div class="todolistTemplate-container">
    <header>
      <button class="createBtn">
        <router-link
          style="text-decoration:none"
          :to="{ name: 'createTemplate', params: { planTime: this.planTime } }"
          >创建模板</router-link
        >
      </button>
    </header>
    <div class="content">
      <ul class="img-list">
        <li
          @click="handleUseTemplate(img.id)"
          v-for="img in imgs"
          :key="img.id"
        >
          <button id="deleteBtn" class="btn" @click.stop="handleDelete(img.id)">
            删除模板
          </button>
          <img :src="img.imgSrc" :alt="img.desc" />
          <span class="title">{{ img.desc }}</span>
          <button id="changeBtn" class="btn" @click="handleClick(img.id)">
            修改模板
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { searchFaceToMap, deleteFaceToMap } from "@/service/faceToMap.js";
import { deleteTemplateContent } from "@/service/templateContent.js";
export default {
  props: ["imgs", "planTime"],
  methods: {
    handleClick(id) {
      if (this.$route.query.detailTemplateId == id) {
        return;
      }
      this.$router.push({
        name: "updateTemplate",
        params: {
          detailTemplateId: id,
        },
      });
    },
    handleUseTemplate(id) {
      this.$emit("useTemplate", id);
    },
    async handleDelete(id) {
      const confirm = window.confirm("确认删除?");
      if (confirm) {
        await this.$store.dispatch("template/deleteTemplateFace", id);
        searchFaceToMap(id).then(async (res) => {
          await deleteFaceToMap(res.id);
          await deleteTemplateContent(res.contentId);
          this.$showMessage({
            type: "success",
            content: "删除成功",
          });
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.todolistTemplate-container {
  position: relative;
  padding: 20px 30px 0px 30px;
  background-color: burlywood;
  @media screen and (max-width: 1470px) {
    display: flex;
    align-items: center;
  }
  .content::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  header {
    position: relative;
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    .createBtn {
      top: 20px;
      left: 50%;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      transform: translateX(-40px);
      position: absolute;
      border: none;
      outline: none;
      cursor: pointer;
      box-shadow: 2px 2px 2px rgb(59, 45, 45);
      &:active {
        box-shadow: none;
      }
    }
    @media screen and (max-width: 1470px) {
      flex: 0 0 auto;
      width: 150px;
    }
    @media screen and (max-width: 890px) {
      width: 80px;
      margin-right: 10px;
    }
  }
  .content {
    overflow-y: scroll;
    height: 606px;
    border: 2px solid rgb(104, 51, 26);
    background: url("../../../assets/bg.jpg");
    @media screen and (max-width: 1470px) {
      display: flex;
      height: 95%;
      width: 60vw;
      align-items: center;
      margin-bottom: 15px;
    }
    @media screen and (max-width: 890px) {
      width: 280px;
    }
    .img-list {
      list-style: none;
      padding: 0;
      margin: 0;
      @media screen and (max-width: 1470px) {
        display: flex;
        align-items: center;
      }
      li {
        width: 250px;
        height: 200px;
        padding: 10px 0px;
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
        @media screen and (max-width: 1470px) {
          margin: 0px 0px 0px 10px;
        }
        > img {
          cursor: pointer;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(0.9);
          border: 2px solid rgb(138, 99, 99);
          transition: width 0.3s;
          box-sizing: border-box;
        }
        .title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgb(10, 6, 0);
          font-weight: bold;
          font-size: 16px;
        }
        .btn {
          width: 60px;
          height: 20px;
          border: none;
          outline: none;
          border-radius: 5px;
          display: none;
          position: absolute;
          bottom: 45px;
          left: 50%;
          margin-left: -35px;
          font-size: 12px;
          cursor: pointer;
          transition: width 0.5s;
        }
        &::after {
          content: "";
          width: 250px;
          height: 180px;
          margin-top: 12px;
          margin-left: 4px;
          background-color: rgb(75, 63, 63);
          opacity: 0.3;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        &:hover::after {
          opacity: 0;
        }
        &:hover span {
          font-size: 20px;
        }
        &:hover img {
          transform: scale(1);
        }
        &:hover #changeBtn {
          left: 115px;
          background: turquoise;
          display: inline-block;
          animation: amplification 0.3s forwards;
        }
        &:hover #deleteBtn {
          left: 115px;
          background: rgb(231, 46, 46);
          display: inline-block;
          z-index: 10;
          color: #fff;
          transform: translateY(-80px);
          animation: amplification 0.3s forwards;
        }
      }
    }
  }
}
@keyframes amplification {
  0% {
    width: 70px;
    height: 20px;
    left: 120px;
    font-size: 12px;
  }
  100% {
    left: 115px;
    width: 80px;
    height: 30px;
    font-size: 16px;
  }
}
</style>
