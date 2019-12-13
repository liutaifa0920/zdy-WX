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
    <div class="clockInStatisticsToclass" @click="toClassClockInSta">
      <p>班级打卡{{"20"}}人，未打卡{{"2"}}人</p>
      <p>></p>
    </div>
    <div class="clockInRecord">打卡记录</div>
    <!-- 单条动态 -->
    <div class="clockInfoList" v-for="(item, i) in 5" :key="i">
      <div class="clockInfoListItem">
        <div @click="linkToHistory" class="clockInfoListItemLeft">
          <img src="~@/assets/imgs/home/habitClock/bg.png" alt />
          <div class="clockInfoListItemTopRight">
            <p>{{"李四爸爸"}}</p>
            <p>{{"2019-11-16 18:24"}} 已坚持{{"1"}}天</p>
          </div>
        </div>
        <img src="~@/assets/imgs/home/habitClock/更多.png" alt />
      </div>
      <div class="clockInfoListItemCon">
        <p @click="linkToHistory">{{"知点云是由山东旭兴网络科技有限公司专为K12公办学校研发的数字孪生教育SaaS软件。"}}</p>
        <div>录音</div>
        <div>图片/视频</div>
      </div>
      <!-- 按钮行 -->
      <div class="clockInfoListItemBtn">
        <div class="clockInfoListItemIsGood">
          <img v-if="true" src="~@/assets/imgs/home/habitClock/no_good.png" alt="未点赞" />
          <img v-if="false" src="~@/assets/imgs/home/habitClock/is_good.png" alt="已点赞" />
          <p>{{5}}</p>
        </div>
        <img src="~@/assets/imgs/home/habitClock/is_report.png" alt="评论" />
        <img src="~@/assets/imgs/home/habitClock/is_fenxiang.png" alt="分享" />
      </div>
      <!-- 回复区 -->
      <div class="clockInfoListItemReport">
        <!-- 点赞区 -->
        <div class="clockInfoListItemReportTop">
          <img src="~@/assets/imgs/home/habitClock/no_good.png" alt="点赞" />
          <p>{{"王五老师"}}</p>
        </div>
        <!-- 评论内容 -->
        <div class="clockInfoListItemReportBot">
          <div class="clockInfoListItemReportBotLeft">
            <img src="~@/assets/imgs/home/habitClock/is_report.png" alt="评论" />
          </div>
          <div class="clockInfoListItemReportBotRig">
            <p v-for="(item ,i) in 3" :key="i">
              <span>{{"王五老师"}}:</span>
              <span>棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 跳转历史打卡页面
    linkToHistory() {
      this.$router.push({
        path: "/historyClockIn"
      });
    },
    // 去打卡
    toClockIn() {
      this.$router.push({
        path: "/clockIn"
      });
    },
    // linkTo 班级打卡统计
    toClassClockInSta() {
      this.$router.push({
        path: "/classClockInStatistics"
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
/* .clockInfoListItemReportBotRig{
} */
.clockInfoListItemReportBotRig > p {
  /* height: 0.9rem; */
  font-size: 0.9rem;
  line-height: 0.9rem;
  margin-bottom: 0.3rem !important;
}
.clockInfoListItemReportBotRig > p > span:nth-child(1) {
  color: #38b48b;
  padding-right: 0.3rem;
  line-height: 1rem;
}
.clockInfoListItemReportBotRig > p > span:nth-child(2) {
  color: #313131;
  line-height: 1rem;
}
</style>