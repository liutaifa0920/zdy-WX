<template>
  <div class="clockInStatistics">
    <van-nav-bar
      class="topNavBar"
      title="打卡统计"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <div class="topCalendar">
      <el-calendar>
        <template slot="dateCell" slot-scope="{date, data}">
          <div
            @click="clickDate(data)"
            :class="'topCalendarItem'+(data.isSelected && (new Date().getTime() >= new Date(data.day).getTime()) ? ' is-selected' : ' is-close')"
          >
            <p>
              {{new Date(data.day).getDay() == 0?'日':''}}
              {{new Date(data.day).getDay() == 1?'一':''}}
              {{new Date(data.day).getDay() == 2?'二':''}}
              {{new Date(data.day).getDay() == 3?'三':''}}
              {{new Date(data.day).getDay() == 4?'四':''}}
              {{new Date(data.day).getDay() == 5?'五':''}}
              {{new Date(data.day).getDay() == 6?'六':''}}
            </p>
            <p>{{ data.day.split('-').slice(1).join('-') }}</p>
            <div class="isClockIn">
              <img
                v-if="new Date().getTime() >= new Date(data.day).getTime()"
                src="~@/assets/imgs/home/habitClock/statisticsTop.png"
              />
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
    <div class="clockIn">
      <div class="clockInItem is-green" v-if="true" @click="toClockIn">去打卡</div>
      <div class="clockInItem is-gary" v-if="false">未打卡</div>
      <div class="clockInItem is-gary" v-if="false">已打卡</div>
    </div>
    <div class="garyBlock"></div>
    <div v-if="statisticsInfo.clock_log_data.length == 0" class="noContent">没有打卡动态哦~</div>
    <div
      v-if="statisticsInfo.clock_log_data.length != 0"
      class="clockInStatisticsToclass"
      @click="toClassClockInSta"
    >
      <p>班级打卡{{statisticsInfo.clock_num}}人，未打卡{{statisticsInfo.no_clock_num}}人</p>
      <p>></p>
    </div>
    <div v-if="statisticsInfo.clock_log_data.length != 0" class="clockInRecord">打卡记录</div>
    <!-- 单条动态 -->
    <div
      v-show="statisticsInfo.clock_log_data.length != 0"
      class="clockInfoList"
      v-for="(item, i) in statisticsInfo.clock_log_data"
      :key="i"
    >
      <div class="clockInfoListItem">
        <div @click="linkToHistory" class="clockInfoListItemLeft">
          <img :src="item.img" alt />
          <div class="clockInfoListItemTopRight">
            <p>{{item.name + item.relation}}</p>
            <p>{{item.clock_date}} 已坚持{{item.clock_num}}天</p>
          </div>
        </div>
        <img src="~@/assets/imgs/home/habitClock/更多.png" alt />
      </div>
      <div class="clockInfoListItemCon">
        <p @click="linkToHistory">{{item.content}}</p>
        <div>录音</div>
        <div>图片/视频</div>
      </div>
      <!-- 按钮行 -->
      <div class="clockInfoListItemBtn">
        <div class="clockInfoListItemIsGood">
          <img
            v-if="item.like_data.is_like == 0"
            src="~@/assets/imgs/home/habitClock/no_good.png"
            alt="未点赞"
          />
          <img
            v-if="item.like_data.is_like == 1"
            src="~@/assets/imgs/home/habitClock/is_good.png"
            alt="已点赞"
          />
          <p>{{item.like_data.like_num == 0 ? '':item.like_data.like_num}}</p>
        </div>
        <img src="~@/assets/imgs/home/habitClock/is_report.png" alt="评论" />
        <img src="~@/assets/imgs/home/habitClock/is_fenxiang.png" alt="分享" />
      </div>
      <!-- 回复区 -->
      <div class="clockInfoListItemReport">
        <!-- 点赞区 -->
        <div class="clockInfoListItemReportTop">
          <img src="~@/assets/imgs/home/habitClock/no_good.png" alt="点赞" />
          <p>{{item.like_data.like_user}}</p>
        </div>
        <!-- 评论内容 -->
        <div class="clockInfoListItemReportBot">
          <div class="clockInfoListItemReportBotLeft">
            <img src="~@/assets/imgs/home/habitClock/is_report.png" alt="评论" />
          </div>
          <div class="clockInfoListItemReportBotRig">
            <p v-for="(items ,index) in item.comment_data" :key="index">
              <span v-if="items.to_user.userid == 0" class="isName">{{items.commnet_user.name}}:</span>
              <span v-if="items.to_user.userid == 0" class="isContent">{{items.content}}</span>

              <span v-if="items.to_user.userid != 0" class="isName">{{items.commnet_user.name}}</span>
              <span v-if="items.to_user.userid != 0" style="padding-right: .2rem;">回复</span>
              <span v-if="items.to_user.userid != 0" class="isName">{{items.to_user.name}}:</span>
              <span v-if="items.to_user.userid != 0" class="isContent">{{items.content}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { homeHabitClockStatistics } from "@/api/api";
export default {
  data() {
    return {
      hi: "",
      dt: "",
      statisticsInfo: {
        clock_log_data: [
          {
            img:
              "http://xuxingtest.oss-cn-hangzhou.aliyuncs.com/face/20190624110133361657.png",
            name: "诸葛亮",
            relation: "爸爸",
            clock_date: "2019-12-09",
            clock_num: 3,
            img_path: "",
            video_path: "",
            voice_path: "",
            content: " dsjfk h hsdjk hjskd hfjkhs kj",
            like_data: {
              is_like: 0,
              like_num: 0,
              like_user: ""
            },
            comment_data: [
              {
                comment_id: 1, //评论id
                content: "放大范德萨", //评论内容
                commnet_user: {
                  //评论人Info
                  userid: 30001120,
                  student_id: 20004910,
                  name: "诸葛亮爸爸"
                },
                to_user: {
                  //被回复人
                  userid: 0,
                  receiver_student_id: 0,
                  name: ""
                }
              },
              {
                comment_id: 3,
                content: "我的评论哈哈哈哈哈哈哈哈",
                commnet_user: {
                  userid: 30001120,
                  student_id: 20004910,
                  name: "诸葛亮爸爸"
                },
                to_user: {
                  userid: 30001120,
                  receiver_student_id: 20004910,
                  name: "诸葛亮爸爸"
                }
              },
              {
                comment_id: 4,
                content: "我的评论哈哈哈哈哈哈哈哈",
                commnet_user: {
                  userid: 30001120,
                  student_id: 20004910,
                  name: "诸葛亮爸爸"
                },
                to_user: {
                  userid: 0,
                  receiver_student_id: 0,
                  name: ""
                }
              }
            ]
          }
        ],
        clock_num: 2,
        is_clock_today: 1,
        no_clock_num: 1
      }
    };
  },
  mounted() {
    this.queryHi();
  },
  methods: {
    // 获取习惯ID
    queryHi() {
      console.log(this.$route.query.hi);
      this.hi = this.$route.query.hi;
      this.queryNowDate();
      this.queryInfo();
    },
    // 获取当前日期
    queryNowDate() {
      this.dt =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      console.log(this.dt);
    },
    // 请求页面数据
    queryInfo() {
      // let data = {
      //   ui: sessionStorage.getItem("ui"),
      //   si: sessionStorage.getItem("si"),
      //   hi: this.hi,
      //   dt: this.dt,
      //   v: sessionStorage.getItem("v")
      // };
      let data = {
        ui: 30001089,
        si: 21004058,
        hi: this.hi,
        dt: this.dt,
        v: sessionStorage.getItem("v")
      };
      homeHabitClockStatistics(data).then(res => {
        console.log(res.data.statis);
        if (res.code == 200) {
          this.statisticsInfo = res.data.statis;
        }
      });
    },
    // 日期点击
    clickDate(data) {
      console.log(data.day);
      this.dt = data.day;
      this.queryInfo();
    },
    // 跳转历史打卡页面
    linkToHistory() {
      this.$router.push({
        path: "/historyClockIn"
      });
    },
    // 去打卡
    toClockIn() {
      this.$router.push({
        path: "/clockIn",
        query: {
          hi: this.hi
        }
      });
    },
    // linkTo 班级打卡统计
    toClassClockInSta() {
      this.$router.push({
        path: "/classClockInStatistics",
        query: {
          hi: this.hi,
          dt: this.dt
        }
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
.clockInStatistics .el-calendar-table .el-calendar-day {
  padding: 0 !important;
}
.clockInStatistics .is-today {
  color: #333333 !important;
}
.clockInStatistics .el-calendar__header {
  display: none;
}
.clockInStatistics .el-calendar-table > thead {
  display: none;
}
.clockInStatistics .el-calendar__body {
  padding: 0 !important;
}
.clockInStatistics .el-calendar-table tr,
.clockInStatistics .el-calendar-table td {
  border: none !important;
  border-bottom: 1px solid #e0e0e0 !important;
}
.clockInStatistics .el-calendar-table tbody {
  display: flex !important;
}
.clockInStatistics .el-calendar-day {
  width: 14vw !important;
  height: 5rem !important;
}
.clockInStatistics .el-calendar-table__row .prev {
  width: 14vw !important;
  height: 5rem !important;
}
</style>
<style scoped>
p {
  margin: 0 !important;
}
.clockInStatistics {
  background-color: white;
}
.is-selected {
  background-color: #38b48b50;
  color: #333333;
}
.is-close {
  background-color: white;
  color: #999999;
}

/* top */
.clockInStatistics {
  background-color: white;
  height: 100vh;
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
.topCalendar {
  widows: 100vw;
  height: 5.1rem;
  overflow-x: scroll;
}
.topCalendar::-webkit-scrollbar {
  display: none;
}
.topCalendarItem {
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
  padding-top: 0.5rem;
  box-sizing: border-box;
  text-align: center;
}
.isClockIn {
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
}
.isClockIn > img {
  width: 1rem;
}

/* clockInBtn */
.clockIn {
  width: 100vw;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.clockInItem {
  color: white;
  width: 9.2rem;
  font-size: 1rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
}
.is-green {
  background-color: #38b48b;
}
.is-gary {
  background-color: #e2e2e2;
}

/* block */
.garyBlock {
  width: 100vw;
  height: 0.8rem;
  background-color: #f4f4f4;
}
.noContent {
  width: 100%;
  height: calc(100% - 13.2rem);
  background-color: white;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

/* linkToclassClockInfo */
.clockInStatisticsToclass {
  padding: 0.8rem 1rem;
  box-sizing: border-box;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* clockInRecord */
.clockInRecord {
  width: 100vw;
  height: 2.8rem;
  font-weight: 600;
  font-size: 1rem;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #f4f4f4;
}

/* list */
.clockInfoList {
  width: 100vw;
  padding: 0.8rem;
  box-sizing: border-box;
  background-color: white;
}
.clockInfoListItem {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.clockInfoListItem > img {
  padding: 0 0 1rem 1rem;
  width: 1rem;
  height: 0.8rem;
}
.clockInfoListItemLeft {
  display: flex;
  justify-content: left;
}
.clockInfoListItemLeft > img {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  margin-right: 0.8rem;
}
.clockInfoListItemTopRight {
  height: 3.2rem;
}
.clockInfoListItemTopRight > p:nth-child(1) {
  font-size: 0.9rem;
  color: #313131;
}
.clockInfoListItemTopRight > p:nth-child(2) {
  font-size: 0.8rem;
  color: #999999;
}
.clockInfoListItemCon {
  padding-left: 4rem;
  font-size: 0.9rem;
}
.clockInfoListItemBtn {
  width: 100%;
  height: 2.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.clockInfoListItemIsGood {
  display: flex;
  align-items: center;
  height: 1rem;
}
.clockInfoListItemIsGood > img {
  width: 1rem;
  height: 1rem;
  margin-right: 0.4rem;
}
.clockInfoListItemIsGood > p {
  height: 0.8rem;
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #999999;
}
.clockInfoListItemBtn > img {
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
}

/* report */
.clockInfoListItemReport {
  background-color: #f5f5f5;
}
.clockInfoListItemReportTop {
  width: 100%;
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}
.clockInfoListItemReportTop::after {
  content: "";
  display: block;
  position: absolute;
  top: -0.8rem;
  left: 1.2rem;
  width: 0px;
  height: 0px;
  border-top: 0.4rem solid rgb(255, 255, 255);
  border-right: 0.4rem solid rgb(255, 255, 255);
  border-left: 0.4rem solid rgb(255, 255, 255);
  border-bottom: 0.4rem solid #f5f5f5;
}
.clockInfoListItemReportTop > img {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
.clockInfoListItemReportTop > p {
  font-size: 0.9rem;
  color: #313131;
}
.clockInfoListItemReportBot {
  width: 100%;
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: flex;
}
/* .clockInfoListItemReportBotLeft {
} */
.clockInfoListItemReportBotLeft > img {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
.clockInfoListItemReportBotRig {
}

.clockInfoListItemReportBotRig > p {
  font-size: 0.9rem;
  line-height: 0.9rem;
  margin-bottom: 0.3rem !important;
}
.isName {
  color: #38b48b;
  padding-right: 0.3rem;
  line-height: 1rem;
}
.isContent {
  color: #313131;
  line-height: 1rem;
}
</style>