<template>
  <div class="classClockInStatistics">
    <van-nav-bar
      class="topNavBar"
      title="班级作业查看统计"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <div
      v-show="isCopyFlag"
      class="CopyBtn"
      @click="copyClick"
      :data-clipboard-text="currentType == 1 ? noCopyClock : copyClock"
    >复制名单</div>
    <van-tabs v-model="currentType" animated swipeable>
      <van-tab :name="1" :title="'未查看' + listInfo.no_read_num + '人'">
        <div class="itemContentBox">
          <div v-show="listInfo.no_read_student.length != 0" class="itemContent">
            <p>{{"以下学生未完成" + listInfo.taskDate + "“" + listInfo.taskTitle + "”打卡:"}}</p>
            <p
              v-show="listInfo.no_read_student.length > 0"
              v-for="(item, i) in listInfo.no_read_student"
              :key="i"
            >{{(i + 1) + "." + item.student_name}}</p>
          </div>
          <p class="noClockText" v-show="listInfo.no_read_student.length == 0">今日没有打卡动态哦~</p>
        </div>
      </van-tab>
      <van-tab :name="2" :title="'已查看' + listInfo.read_num + '人'">
        <div class="itemContentBox">
          <div v-show="listInfo.read_student.length != 0" class="itemContent">
            <p>{{"以下学生已完成" + listInfo.taskDate + "“" + listInfo.taskTitle + "”打卡:"}}</p>
            <p
              v-show="listInfo.read_student.length > 0"
              v-for="(item, i) in listInfo.read_student"
              :key="i"
            >{{(i + 1) + "." + item.student_name}}</p>
          </div>
          <p class="noClockText" v-show="listInfo.read_student.length == 0">今日没有打卡动态哦~</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { Toast } from "vant";
import { homeWorkTaskSee } from "@/api/api";
export default {
  data() {
    return {
      ti: "",
      currentType: 1,
      listInfo: {
        read_student: [], //阅读的学生列表
        no_read_student: [
          //未阅读的学生列表
          {
            student_id: 20004910, //学生id
            part_id: 10001317,
            grade_id: 780,
            class_id: 781,
            student_name: "", //学生姓名
            sex: 0
          }
        ],
        read_num: "", //阅读的数量
        no_read_num: "", //未阅读的数量
        task_title: "", //标题
        taskDate: ""
      },
      copyClock: null,
      noCopyClock: null,
      isCopyFlag: true
    };
  },
  mounted() {
    this.queryHi();
  },
  methods: {
    // 获取习惯ID 日期
    queryHi() {
      console.log(this.$route.query);
      this.ti = this.$route.query.id;
      this.queryInfo();
    },
    // 请求页面数据
    queryInfo() {
      let data = {
        ti: this.ti,
        si: sessionStorage.getItem("si"),
        ci: sessionStorage.getItem("ci"),
        tp: 2,
        v: sessionStorage.getItem("v")
      };
      homeWorkTaskSee(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.listInfo = res.data;
          // 临时字符串
          let tempNoClockText = "";
          this.listInfo.no_read_student.map((e, i) => {
            tempNoClockText += i + 1 + "." + e.student_name + "\n";
          });
          this.noCopyClock =
            "以下学生未完成" +
            this.listInfo.taskDate +
            "“" +
            this.listInfo.taskTitle +
            "”打卡:\n" +
            tempNoClockText;

          let tempClockText = "";
          this.listInfo.read_student.map((e, i) => {
            tempClockText += i + 1 + "." + e.student_name + "\n";
          });
          this.copyClock =
            "以下学生已完成" +
            this.listInfo.taskDate +
            "“" +
            this.listInfo.taskTitle +
            "”打卡:\n" +
            tempClockText;

          console.log(this.copyClock);
          console.log(this.noCopyClock);
          if (
            this.currentType == 1 &&
            this.listInfo.no_read_student.length == 0
          ) {
            this.isCopyFlag = false;
          } else if (
            this.currentType == 2 &&
            this.listInfo.read_student.length == 0
          ) {
            this.isCopyFlag = false;
          } else {
            this.isCopyFlag = true;
          }
        }
      });
    },
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
  },
  watch: {
    currentType() {
      if (this.currentType == 1 && this.listInfo.no_read_student.length == 0) {
        this.isCopyFlag = false;
      } else if (
        this.currentType == 2 &&
        this.listInfo.read_student.length == 0
      ) {
        this.isCopyFlag = false;
      } else {
        this.isCopyFlag = true;
      }
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
  overflow: scroll;
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
.noClockText {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 30vh;
  box-sizing: border-box;
  font-size: 0.9rem;
  color: #aaaaaa;
}
</style>