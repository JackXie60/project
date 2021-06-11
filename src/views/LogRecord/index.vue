<template>
  <div class="logRecord-container">
    <div class="score">
      你当前完成度得分:<span>{{ score }}</span> 分
    </div>
    <div class="content-area">
      <div class="content" ref="logRecordContent"></div>
      <select name="year" id="year" v-model="newYear">
        <option disabled value="">请选择</option>
        <option :value="nowYear">{{ nowYear }}</option>
        <option :value="nowYear - 1">{{ nowYear - 1 }}</option>
        <option :value="nowYear - 2">{{ nowYear - 2 }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { HeatmapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import getYearTime from "@/util/getYearTime.js";

export default {
  async created() {
    echarts.use([
      TitleComponent,
      CalendarComponent,
      TooltipComponent,
      VisualMapComponent,
      HeatmapChart,
      CanvasRenderer,
    ]);
    //初始化当前年
    this.nowYear = new Date().getFullYear();
    this.newYear = this.nowYear;
  },
  data() {
    return {
      completeList: [],
      nowYear: 0,
      data: [],
      newYear: 0,
      score: 0,
    };
  },
  methods: {
    getVirtulData(year) {
      year = year || "2021";
      var date = +echarts.number.parseDate(year + "-01-01");
      var end = +echarts.number.parseDate(+year + 1 + "-01-01");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([echarts.format.formatTime("yyyy-MM-dd", time), 0]);
      }
      return data;
    },
    //获取完成度数据，并进行数据的封装用于echarts显示
    async getRealData(nowYear) {
      const { yearStart, yearEnd } = getYearTime(nowYear);
      let completeness = await this.$store.dispatch(
        "completeness/searchCompleteness",
        {
          appkey: this.appkey,
          startTime: yearStart,
          endTime: yearEnd,
        }
      );
      console.log("complete", completeness);
      //计算统计的天数
      let processDay;
      if (completeness == null || completeness.length == 0) {
        processDay = 0;
      } else {
        const endDay = new Date(
          completeness[completeness.length - 1].time * 1000
        ).setHours(0, 0, 0, 0);
        const startDay = new Date(completeness[0].time * 1000).setHours(
          0,
          0,
          0,
          0
        );
        processDay = (endDay - startDay) / (86400 * 1000);
      }
      //根据统计的天数和每天的完成度来计算出总的完成度得分
      this.score = (
        completeness.reduce((nowVal, newVal) => {
          return nowVal + newVal.finishedTaskNum;
        }, 0) /
        (processDay + 1)
      ).toFixed(1);
      completeness = completeness.map((item) => {
        return [
          echarts.format.formatTime("yyyy-MM-dd", item.time * 1000),
          item.finishedTaskNum,
        ];
      });
      let data = this.getVirtulData(nowYear);
      const completenessDate = completeness.map((item) => {
        return item[0];
      });
      data = data.filter((item) => {
        if (completenessDate.includes(item[0])) {
          return false;
        } else {
          return true;
        }
      });
      data.push(...completeness);
      return data;
    },
    resize() {
      this.myChart.resize();
    },
  },
  //获取appkey
  computed: {
    appkey() {
      return localStorage.getItem("appkey");
    },
  },
  async mounted() {
    this.myChart = echarts.init(this.$refs.logRecordContent);
    this.option = {
      title: {
        top: 30,
        left: "center",
        text: `${this.nowYear}年任务完成度统计`,
      },
      tooltip: {
        position: "top",
      },
      visualMap: {
        min: 0,
        max: 100,
        type: "piecewise",
        orient: "horizontal",
        left: "center",
        bottom: 120,
        left: 20,
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ["auto", 24],
        range: "2021",
        itemStyle: {
          borderWidth: 1,
        },
        yearLabel: { show: false },
      },
      series: {
        name: "完成度",
        type: "heatmap",
        coordinateSystem: "calendar",
        data: await this.getRealData(this.nowYear),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    };
    this.option && this.myChart.setOption(this.option);
    //改变窗口大小重新设置echart图标大小
    window.addEventListener("resize", this.resize);
  },
  watch: {
    async newYear(val) {
      console.log(1);
      this.option.series.data = await this.getRealData(val);
      console.log(2);
      this.option.calendar.range = `${val}`;
      this.option.title.text = `${val}年任务完成度统计`;
      this.myChart.setOption(this.option);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
};
</script>

<style scoped lang="less">
@import "~@/style/center.less";
.logRecord-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgb(241, 238, 234);
  overflow: hidden;
  .content-area {
    position: relative;
    width: 1200px;
    height: 500px;
    border: 1px solid rgb(148, 144, 144);
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 90px;
    background-color: #fff;
    @media screen and (max-width: 1500px) {
      width: 1000px;
    }
    @media screen and (max-width: 1270px) {
      width: 700px;
    }
    @media screen and (max-width: 720px) {
      width: 500px;
    }
    .content {
      .center();
      width: 100%;
      height: 90%;
    }
    #year {
      position: absolute;
      bottom: 100px;
      right: 25px;
      text-align: center;
      height: 30px;
      border: 1px solid #ccc;
      outline: none;
      border-radius: 5px;
    }
  }
  .score {
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 24px;
    font-weight: bold;
    > span {
      color: red;
    }
  }
}
</style>
