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
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
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
</style>