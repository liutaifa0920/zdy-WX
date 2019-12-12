<template>
  <div class="classClockInStatistics">
    <van-nav-bar
      class="topNavBar"
      title="班级打卡统计"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <div
      class="CopyBtn"
      @click="copyClick"
      :data-clipboard-text="currentType == 1 ? noCopyClock : copyClock"
    >复制名单</div>
    <van-tabs v-model="currentType" animated swipeable>
      <van-tab :name="1" :title="'未打卡' + 15 + '人'">
        <div class="itemContentBox">
          <div class="itemContent">
            <p
              v-for="(itme, i) in 15"
              :key="i"
            >{{i == 0 ? ("以下学生未完成" + "2019年11月26日"+"“"+"每日阅读"+"”打卡:"):((i+1)+"." + "李四")}}</p>
          </div>
        </div>
      </van-tab>
      <van-tab :name="2" :title="'已打卡' + 8 + '人'">
        <div class="itemContentBox">
          <div class="itemContent">
            <p
              v-for="(itme, i) in 8"
              :key="i"
            >{{i == 0 ? ("以下学生已完成" + "2019年11月26日"+"“"+"每日阅读"+"”打卡:"):((i+1)+"." + "李四")}}</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { Toast } from "vant";
export default {
  data() {
    return {
      currentType: 1,
      listInfo: {
        habit_id: 12,
        title: "庞永富测试标题",
        date: "2019-12-09",
        clock_num: 2,
        no_clock_num: 1,
        clock: [
          {
            student_id: 20004910,
            name: "诸葛亮"
          },
          {
            student_id: 20004912,
            name: "张三"
          }
        ],
        no_clock: [
          {
            student_id: 21004058,
            name: "刘备"
          }
        ]
      },
      copyClock: null,
      noCopyClock: null
    };
  },
  mounted() {
    let tempNoClockText = "";
    this.listInfo.no_clock.map((e, i) => {
      tempNoClockText += i + 1 + "." + e.name + "\n";
    });
    this.noCopyClock =
      "以下学生未完成" +
      this.listInfo.date.substr(0, 4) +
      "年" +
      this.listInfo.date.substr(5, 2) +
      "月" +
      this.listInfo.date.substr(8) +
      "日“" +
      this.listInfo.title +
      "”打卡:\n" +
      tempNoClockText;

    let tempClockText = "";
    this.listInfo.clock.map((e, i) => {
      tempClockText += i + 1 + "." + e.name + "\n";
    });
    this.copyClock =
      "以下学生已完成" +
      this.listInfo.date.substr(0, 4) +
      "年" +
      this.listInfo.date.substr(5, 2) +
      "月" +
      this.listInfo.date.substr(8) +
      "日“" +
      this.listInfo.title +
      "”打卡:\n" +
      tempClockText;

    console.log(this.copyClock);
    console.log(this.noCopyClock);
  },
  methods: {
    // 复制名单
    copyClick() {
      let clipboard = new Clipboard(".CopyBtn");
      clipboard.on("success", e => {
        Toast("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        console.log("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.classClockInStatistics .van-tab {
  padding: 0 !important;
}
.classClockInStatistics .van-tabs__wrap {
  margin-left: 0.5rem;
}
.classClockInStatistics .van-tabs__wrap {
  width: 50vw;
}
.classClockInStatistics .van-tab--active {
  color: #38b48b;
}
.classClockInStatistics .van-tabs__line {
  width: 4.5rem !important;
  background-color: #38b48b;
}
.classClockInStatistics .van-tab__pane {
  padding: 0.8rem 1rem;
}
</style>
<style scoped>
p {
  margin: 0 !important;
}
/* top */
.classClockInStatistics {
  background-color: white;
  height: 100vh;
  position: relative;
}
.topNavBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.8rem;
}
.topBlock {
  width: 100%;
  height: 2.8rem;
}
.CopyBtn {
  position: absolute;
  right: 1rem;
  top: 3.3rem;
  padding: 0.5rem 0 0.5rem 1rem;
  z-index: 5;
  color: #38b48b;
  font-size: 0.8rem;
}

/* content */
.itemContent {
  background-color: #f4f4f4;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
  font-size: 0.95rem;
  color: #313131;
}
.itemContent > p {
  width: 100%;
  text-align: left !important;
}
.itemContentBox {
  width: 100%;
  height: calc(100vh - 7.5rem);
}
</style>