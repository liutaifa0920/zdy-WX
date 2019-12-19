<template>
  <div class="history">
    <van-nav-bar
      class="topNavBar"
      title="打卡详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <div class="historyMain">
      <div class="historyTit">
        <span>{{clockInInfo.habit_info.title}}</span>
        <div class="historyTitRight">
          <span>打卡设置</span>
          <img src="~@/assets/imgs/home/habitClock/向下.png" alt />
        </div>
      </div>
      <p class="historyTimeName">{{clockInInfo.habit_info.add_time}}</p>
      <p
        class="historyTimeName"
      >{{clockInInfo.habit_info.class_name+" "+ clockInInfo.habit_info.teacher_name+"老师"}}</p>
      <p class="historyInfo">
        <span>剩余：{{clockInInfo.habit_info.remain_days}}天</span>
        <span>频次：{{clockInInfo.habit_info.sign_frequency}}</span>
      </p>
    </div>
    <div class="historyCon">
      <p>{{clockInInfo.habit_info.content}}</p>
      <p>
        详情
        <img src="~@/assets/imgs/home/habitClock/2爱向下.png" alt />
      </p>
    </div>
    <!-- List -->
    <div class="historyListTit">{{clockInName}}的历史打卡日记</div>
    <!-- 单条动态 -->
    <div class="historyList" v-for="(item, i) in clockInInfo.clock_log_data" :key="i">
      <div class="historyListItem">
        <div class="historyListItemLeft">
          <img v-if="item.img != ''" :src="item.img" alt />
          <div
            class="clockInfoListItemLeftIcon"
            v-if="item.img == ''"
          >{{item.name.substr(item.name.length - 2)}}</div>
          <div class="historyListItemTopRight">
            <p>{{item.name + item.relation}}</p>
            <p>{{item.clock_date}} 已坚持{{item.clock_num}}天</p>
          </div>
        </div>
        <img src="~@/assets/imgs/home/habitClock/更多.png" alt />
      </div>
      <div class="historyListItemCon">
        <p>{{item.content}}</p>
        <div>录音</div>
        <div>图片/视频</div>
      </div>
      <!-- 按钮行 -->
      <div class="historyListItemBtn">
        <div class="historyListItemIsGood">
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
      <div class="historyListItemReport">
        <!-- 点赞区 -->
        <div v-show="item.like_data.like_user != ''" class="historyListItemReportTop">
          <img src="~@/assets/imgs/home/habitClock/no_good.png" alt="点赞" />
          <p>{{item.like_data.like_user}}</p>
        </div>
        <!-- 评论内容 -->
        <div v-show="item.comment_data.length != 0" class="historyListItemReportBot">
          <div class="historyListItemReportBotLeft">
            <img src="~@/assets/imgs/home/habitClock/is_report.png" alt="评论" />
          </div>
          <div class="historyListItemReportBotRig">
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
    <div class="bottomBlock"></div>
  </div>
</template>
<script>
import { homeHabitMyClockDetail } from "@/api/api";
export default {
  data() {
    return {
      hi: "",
      clockInName: "",
      lookUi: "",
      lookSi: "",
      clockInInfo: {
        habit_info: {
          title: ""
        }
      }
    };
  },
  mounted() {
    this.queryParam();
    this.queryInfo();
  },
  methods: {
    // 获取习惯ID
    queryParam() {
      console.log(this.$route.query);
      this.hi = this.$route.query.hi;
      this.clockInName = this.$route.query.name;
      this.lookUi = this.$route.query.ui;
      this.lookSi = this.$route.query.si;
    },
    queryInfo() {
      // let data = {
      //   ui: this.lookUi,
      //   si: this.lookSi,
      //   lui: sessionStorage.getItem("ui"),
      //   lsi: sessionStorage.getItem("si"),
      //   hi: this.hi,
      //   v: sessionStorage.getItem("v")
      // };
      let data = {
        ui: this.lookUi,
        si: this.lookSi,
        lui: 30001089,
        lsi: 21004058,
        hi: this.hi,
        v: sessionStorage.getItem("v")
      };
      homeHabitMyClockDetail(data).then(res => {
        if (res.code == 200) {
          this.clockInInfo = res.data.statis;
          console.log(this.clockInInfo);
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
<style scoped>
p {
  margin: 0 !important;
  text-align: left;
}
.history {
  background-color: white;
}

/* top */
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

.historyMain {
  width: 100vw;
  padding: 0.8rem;
  box-sizing: border-box;
  border-bottom: 1px solid #d3d3d3;
}
.historyTit {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4rem;
}
.historyTit > span:nth-child(1) {
  font-size: 1.1rem;
  color: #000000;
}
.historyTitRight {
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.8rem;
  color: #38b48b;
}
.historyTitRight > img {
  width: 0.8rem;
  height: 0.8rem;
  background-color: #eeeeee;
  margin-left: 0.4rem;
}
.historyTimeName {
  color: #999999;
  font-size: 0.8rem;
}
.historyInfo {
  font-size: 0.9rem;
  margin-top: 0.4rem !important;
}
.historyCon {
  width: 100vw;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
  box-sizing: border-box;
}
.historyCon > p:nth-child(1) {
  font-size: 1rem;
}
.historyCon > p:nth-child(2) {
  font-size: 0.9rem;
  height: 3rem;
  color: #38b48b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.historyCon img {
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.4rem;
}
.historyListTit {
  width: 100vw;
  height: 2.8rem;
  font-weight: 600;
  color: #313131;
  font-size: 1rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #f4f4f4;
}

/* BottomNav */
.bottomBlock {
  width: 100vw;
  height: 3.5rem;
}
.clockBottomNav {
  background-color: #f5f5f5;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 3.5rem;
  display: flex;
  align-items: center;
  z-index: 500;
}
.clockBottomNavItem {
  width: 50vw;
  height: 3.5rem;
  text-align: center;
}
.clockBottomNavItem > p {
  text-align: center !important;
  color: #999999;
  font-size: 0.95rem;
}
.clockBottomNavItem > img {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.5rem;
}
.clockBottomNavBtn {
  position: absolute;
  top: -2.5rem;
  left: 0;
  right: 0;
  margin: auto;
  width: 5rem;
  height: 5rem;
  background-color: #38b48b;
  color: white;
  border: 0.3rem solid #ffffff90;
  box-sizing: border-box;
  line-height: 4.4rem;
  text-align: center;
  border-radius: 50%;
}

/* list */
.historyList {
  width: 100vw;
  padding: 0.8rem;
  box-sizing: border-box;
  background-color: white;
}
.historyListItem {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.historyListItem > img {
  padding: 0 0 1rem 1rem;
  width: 1rem;
  height: 0.8rem;
}
.historyListItemLeft {
  display: flex;
  justify-content: left;
}
.historyListItemLeft > img {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  margin-right: 0.8rem;
}
.clockInfoListItemLeftIcon {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  margin-right: 0.8rem;
  color: white;
  font-size: 0.9rem;
  text-align: center;
  line-height: 3.2rem;
  background-color: #38b48b;
}
.historyListItemTopRight {
  height: 3.2rem;
}
.historyListItemTopRight > p:nth-child(1) {
  font-size: 0.9rem;
  color: #313131;
}
.historyListItemTopRight > p:nth-child(2) {
  font-size: 0.8rem;
  color: #999999;
}
.historyListItemCon {
  padding-left: 4rem;
  font-size: 0.9rem;
}
.historyListItemBtn {
  width: 100%;
  height: 2.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.historyListItemIsGood {
  display: flex;
  align-items: center;
  height: 1rem;
}
.historyListItemIsGood > img {
  width: 1rem;
  height: 1rem;
  margin-right: 0.4rem;
}
.historyListItemIsGood > p {
  height: 0.8rem;
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #999999;
}
.historyListItemBtn > img {
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
}

/* report */
.historyListItemReport {
  background-color: #f5f5f5;
}
.historyListItemReportTop {
  width: 100%;
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}
.historyListItemReportTop::after {
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
.historyListItemReportTop > img {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
.historyListItemReportTop > p {
  font-size: 0.9rem;
  color: #313131;
}
.historyListItemReportBot {
  width: 100%;
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: flex;
}
/* .historyListItemReportBotLeft {
} */
.historyListItemReportBotLeft > img {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
/* .historyListItemReportBotRig{
} */
.historyListItemReportBotRig > p {
  /* height: 0.9rem; */
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