<template>
  <div class="curplan-container">
    <div class="countDown" v-if="warnShow">
      <img src="../../assets/cloak.png" alt="" />
      <span
        class="cloakLine"
        :style="{ transform: `rotate(${(90 + rotateTime * 6) % 360}deg)` }"
      ></span>
    </div>
    <div class="timer">
      {{ formatTime }}
    </div>
    <div class="curplan-content" ref="curplan">
      <header>待办事项{{ planTimeArr[planTimeIndex] }}</header>
      <div class="content-container">
        <div class="content">
          <div class="title doingTag">正在进行</div>
          <Empty v-if="doingList.length == 0" />
          <div v-else class="lists">
            <div class="listItem" v-for="list in doingList" :key="list.id">
              <div class="item-content">
                <input type="text" v-model="list.content" />
              </div>
              <div class="btn-area">
                <button class="finish" @click="handleUpdate(list.id)">
                  完成
                </button>
                <button class="delete" @click="handleDelete(list.id)">
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="title finishedTag">已经完成</div>
          <Empty v-if="finishedList.length == 0" />
          <div v-else class="lists">
            <div class="listItem" v-for="list in finishedList" :key="list.id">
              <div class="item-content finished-content">
                <input disabled type="text" v-model="list.content" />
                <span
                  class="deleteline"
                  :style="{
                    opacity: list.isFinished ? 1 : 0,
                  }"
                ></span>
              </div>
              <div class="btn-area">
                <button class="finish" @click="handleUpdate(list.id)">
                  撤销
                </button>
                <button class="delete" @click="handleDelete(list.id)">
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="prev" @click="handleChangeIndex(-1)">&lt;</span>
      <span class="next" @click="handleChangeIndex(1)">&gt;</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Empty from "@/components/base/Empty";
export default {
  components: {
    Empty,
  },
  data() {
    return {
      time: Math.floor(Date.now() / 1000),
      timer: null,
      planTime: "day",
      appkey: localStorage.getItem("appkey"),
      planTimeArr: ["day", "week", "month"],
      planTimeIndex: 0,
      flag: false,
      warnShow: false,
      angle: 90,
      rotateTime: 0,
      lock: false,
    };
  },
  methods: {
    //查找待办事项
    searchBacklog() {
      this.$store.dispatch("backlog/searchBacklog", {
        appkey: this.appkey,
        time: this.time,
        planTime: this.planTimeArr[this.planTimeIndex],
      });
    },
    //改变planTimeArr的索引
    async handleChangeIndex(direction) {
      if (!this.flag) {
        this.flag = true;
        if (direction == 1) {
          this.planTimeIndex = ++this.planTimeIndex % 3;
        } else if (direction == -1) {
          if (this.planTimeIndex == 0) {
            this.planTimeIndex = this.planTimeArr.length - 1;
          } else {
            this.planTimeIndex = --this.planTimeIndex % 3;
          }
        }
        await this.searchBacklog();
        this.flag = false;
      }
    },
    handleDelete(id) {
      //删除事项
      this.$store
        .dispatch("backlog/deleteBacklog", {
          id,
        })
        .then(() => {
          this.$showMessage({
            type: "success",
            content: "删除成功",
            container: this.$refs.curplan,
          });
        });
      //更新完成度
      this.updateCompleteness();
    },
    //更新事项的完成状态
    async handleUpdate(id) {
      const result = this.curBacklog.find((item) => {
        return item.id == id;
      });
      const finishedTime = result.isFinished ? -10 : Date.now() / 1000;
      this.$store
        .dispatch("backlog/updateBacklog", {
          id,
          content: result.content,
          isFinished: !result.isFinished,
          finishedTime,
        })
        .then(async () => {
          if (this.doingList.length == 0 && this.finishedList.length != 0) {
            this.$showMessage({
              type: "success",
              content: "任务已全部完成",
              container: this.$refs.curplan,
            });
          }
          this.updateCompleteness();
        });
      // await this.searchBacklog();
    },
    //更新完成度
    async updateCompleteness() {
      const startTime = new Date(this.time * 1000).setHours(0, 0, 0, 0);
      const endTime = new Date(startTime + 86400 * 1000).getTime();
      const completeResult = await this.$store.dispatch(
        "completeness/searchCompleteness",
        {
          startTime: startTime,
          endTime: endTime,
          appkey: this.appkey,
        }
      );
      console.log("time", startTime, endTime);
      const backlogResult = await this.$store.dispatch(
        "backlog/searchSoonExpire",
        {
          appkey: this.appkey,
          nowTime: startTime,
          endTime: endTime,
        }
      );
      console.log("backresult", backlogResult);
      //计算完成度
      let completeness;
      if (backlogResult.length > 0) {
        const finished = backlogResult.filter((item) => {
          return item.isFinished == true;
        }).length;
        completeness = (finished / backlogResult.length) * 100;
      }
      //如果数据库中已经有今天的完成度数据，在待办事项中查找完成了多少项，并且更新完成度
      //如果数据库中没有今天的完成度数据，在待办事项中统计完成度

      //如果数据库中没有今天的完成度数据
      if (completeResult.length == 0) {
        const finishedTaskNum = backlogResult.length > 0 ? completeness : 0;
        const complete = await this.$store.dispatch(
          "completeness/addCompleteness",
          {
            time: Date.now() / 1000,
            finishedTaskNum: finishedTaskNum,
            appkey: this.appkey,
          }
        );
        //获取完成度的id
        this.completeId = complete.id;
        //如果数据库中没有今天的完成度数据
      } else {
        //获取完成度的id
        this.completeId = completeResult[0].id;
        const finishedTaskNum = backlogResult.length > 0 ? completeness : 0;
        this.$store.dispatch("completeness/updateCompleteness", {
          id: this.completeId,
          finishedTaskNum: finishedTaskNum,
        });
      }
    },
  },
  computed: {
    ...mapState("backlog", ["curBacklog"]),
    doingList() {
      return this.curBacklog.filter((item) => {
        return item.isFinished == false;
      });
    },
    finishedList() {
      return this.curBacklog.filter((item) => {
        return item.isFinished == true;
      });
    },
    formatTime() {
      const date = new Date(this.time * 1000);
      return (
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日 " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
    farToEnd() {
      if (this.doingList.length == 0) {
        return -100;
      } else {
        let mostNearest = this.doingList[0].endTime;
        this.doingList.forEach((item) => {
          if (mostNearest > item.endTime) {
            mostNearest = item.endTime;
          }
        });
        let time = mostNearest - this.time;
        return time;
      }
    },
  },
  async created() {
    this.timer = setInterval(() => {
      this.time = this.time + 1;
    }, 1000);
    this.searchBacklog();
    if (!localStorage.getItem("warnOne")) {
      localStorage.setItem("warnOne", false);
    }
    if (!localStorage.getItem("warnTwo")) {
      localStorage.setItem("warnTwo", false);
    }
    this.updateCompleteness();
  },
  beforeDestroy() {
    this.timer = null;
  },
  watch: {
    farToEnd(val) {
      if (
        val <= 600 &&
        val > 180 &&
        localStorage.getItem("warnOne") == "false"
      ) {
        setTimeout(() => {
          alert(
            `任务还有不到十分钟就要截至了,你当前还有${this.doingList.length}项任务未完成`
          );
        }, 0);
        localStorage.setItem("warnOne", true);
      } else if (
        val <= 180 &&
        val > 60 &&
        localStorage.getItem("warnTwo") == "false"
      ) {
        setTimeout(() => {
          alert(
            `任务还有不到三分钟就要截至了,你当前还有${this.doingList.length}项任务未完成`
          );
        }, 0);
        localStorage.setItem("warnTwo", true);
      } else if (val <= 60 && val >= 0 && this.warnShow == false) {
        this.warnShow = true;
        let timer = setInterval(() => {
          if (this.farToEnd <= 60 && this.farToEnd > 0) {
            this.rotateTime = 61 - this.farToEnd;
          } else if (this.farToEnd <= 0) {
            clearInterval(timer);
            alert("主公，你懈怠了，一件军机大事未处理完毕");
            localStorage.setItem("warnOne", false);
            localStorage.setItem("warnTwo", false);
            this.searchBacklog();
            this.warnShow = false;
          }
        }, 1000);
      }
    },
    doingList() {
      if (this.farToEnd > 60) {
        this.warnShow = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.curplan-container {
  width: 100%;
  height: 100%;
  background: url("https://wallpaperaccess.com/full/1140733.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  .curplan-content {
    width: 60%;
    margin: 50px auto;
    position: relative;
    @media screen and (max-width: 860px) {
      width: 85%;
    }
    @media screen and (max-height: 860px) {
      margin-top: 0px;
    }
    & > span {
      display: block;
      width: 80px;
      height: 80px;
      line-height: 80px;
      font-size: 100px;
      color: #fff;
      font-weight: bold;
      position: absolute;
      text-shadow: 3px 3px 3px rgb(46, 34, 34);
      cursor: pointer;
      &.next {
        bottom: 50%;
        right: -100px;
        animation: moveRight 1s infinite;
        transform: translateY(50%);
        &:hover {
          animation: none;
        }
      }
      &.prev {
        bottom: 50%;
        left: -90px;
        transform: translateY(50%);
        animation: moveLeft 1s infinite;
        &:hover {
          animation: none;
        }
      }
      @media screen and (max-width: 860px) {
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 40px;
        border-radius: 20px;
        &.next {
          bottom: -25px;
          animation: none;
          right: 20%;
          background: orange;
        }
        &.prev {
          bottom: -25px;
          animation: none;
          left: 20%;
          background: green;
          text-align: center;
          border-radius: 20px;
          height: 40px;
        }
      }
    }
    header {
      background-color: rgb(0, 255, 200);
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
    }
    .content {
      margin-top: 10px;
      height: 316px;
      width: 100%;
      opacity: 0.9;
      display: flex;
      position: relative;
      @media screen and (max-height: 800px) {
        height: 265px;
      }
      @media screen and (max-height: 700px) {
        height: 215px;
      }
      &:first-of-type {
        background-color: rgb(175, 175, 174);
      }
      &:last-of-type {
        background-color: rgb(240, 65, 22);
      }
      .lists {
        width: 100%;
        overflow-y: scroll;
        height: 100%;
        background-color: rgb(78, 76, 76);
        .listItem {
          height: 48px;
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin: 4px 10px 4px 8px;
          .item-content {
            position: relative;
            background-color: #fff;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80%;
            border-radius: 5px;
            @media screen and (max-width: 1650px) {
              width: 77%;
            }
            @media screen and (max-width: 1400px) {
              width: 72%;
            }
            @media screen and (max-width: 1210px) {
              width: 68%;
            }
            @media screen and (max-width: 860px) {
              width: 74%;
            }
            @media screen and (max-width: 730px) {
              width: 68%;
            }
            @media screen and (max-width: 605px) {
              width: 62%;
            }
            @media screen and (max-width: 525px) {
              width: 66%;
            }
            .deleteline {
              display: inline-block;
              width: 100%;
              border-top: 4px solid rgb(192, 102, 102);
              position: absolute;
              top: 21px;
              left: 0px;
            }
            &.finished-content {
              background-color: rgb(235, 235, 228);
            }
            input {
              width: 560px;
              height: 20px;
              display: block;
              outline: none;
              border: none;
              text-indent: 8px;
              height: 30px;
              font-size: 18px;
              &:focus {
                border: 1px solid rgb(8, 8, 8);
                border-radius: 5px;
              }
              @media screen and (max-width: 525px) {
                width: 90%;
              }
            }
          }
          .btn-area {
            & > button {
              width: 60px;
              height: 40px;
              margin: 4px;
              border-radius: 5px;
              @media screen and (max-width: 515px) {
                border-radius: 50%;
                width: 40px;
                margin: 0px;
                &.finish {
                  background-color: #7ebf50;
                }
                &.delete {
                  background-color: #cc3600;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .title {
        flex: 0 0 auto;
        font-size: 40px;
        writing-mode: vertical-rl;
        display: flex;
        width: 8%;
        justify-content: center;
        align-items: center;
        &.doingTag {
          color: rgb(240, 65, 22);
        }
        &.finishedTag {
          background-color: rgb(240, 65, 22);
          color: #fff;
        }
        @media screen and (max-width: 1400px) {
          width: 50px;
          font-size: 20px;
        }
        @media screen and (max-width: 525px) {
          width: 0%;
          font-size: 0px;
        }
      }
    }
  }
}
.timer {
  position: absolute;
  padding: 10px 5px;
  text-align: center;
  border-radius: 10px;
  font-size: 20px;
  bottom: 20px;
  right: 10px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  background-image: linear-gradient(#e66465, #9198e5);
  @media screen and (max-width: 860px) {
    display: none;
  }
}
@keyframes moveLeft {
  0% {
    left: -90px;
  }
  30% {
    left: -80px;
  }
  70% {
    left: -90px;
  }
  100% {
    left: -100px;
  }
}
@keyframes moveRight {
  0% {
    right: -100px;
  }
  30% {
    right: -90px;
  }
  70% {
    right: -100px;
  }
  100% {
    right: -110px;
  }
}
// @media
.countDown {
  position: absolute;
  right: 0;
  img {
    width: 250px;
  }
  .cloakLine {
    display: inline-block;
    width: 100px;
    height: 5px;
    background-color: black;
    z-index: 200;
    position: absolute;
    top: 115px;
    left: 38px;
    transform-origin: 87px;
  }
}
</style>
