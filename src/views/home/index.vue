<template>
  <div class="home">
    <!-- ---------------------- -->

    <!-- Title -->
    <div class="homeTop">
      <div class="homeTopListItemAction" v-show="!topToParentClassFlag">
        <p>{{homeTopListName}}</p>
        <span></span>
      </div>
      <ul class="homeTopList" v-show="!topToParentClassFlag">
        <li
          class="homeTopListItem"
          v-for="(item, i) in homeTopList"
          :style="i == homeTopListIndex ? 'width: 1px !important;padding: 0px;' : ''"
          :key="i"
          @click="homeTopListClick(i, item)"
        >{{i == homeTopListIndex ? '' : item.name}}</li>
      </ul>
      <img
        v-show="topToParentClassFlag"
        class="homeTopToParLog"
        src="../../assets/imgs/home/parentClassLog_w.png"
        alt="家长课堂"
      />
    </div>

    <!-- TopBlock -->
    <div style="height: 4rem"></div>

    <!-- Unit -->
    <div class="homeFunction">
      <van-grid :border="false" :column-num="homeFunctionList.length">
        <van-grid-item v-for="(item, i) in homeFunctionList" :key="i" @click="unitLinkTo(item, i)">
          <div class="homeFunctionImg">
            <img :src="item.imgUrl" :alt="item.name" />
          </div>
          <p class="homeFunctionTit">{{item.name}}</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- Attendance -->
    <div class="homeAttendance">
      <div class="homeAttendanceBox">
        <div class="homeAttendanceBoxTop">
          <p>今日出勤</p>
          <van-icon color="#999999" size="24px" name="ellipsis" @click="attendanceMoreClick" />
        </div>
        <div class="homeAttendanceBoxBot">
          <div class="homeAttendanceBoxBotItem">
            <div class="homeAttendanceBoxBotItemTime">
              <p>{{enterSchoolTime == "" ? "-- : --" : enterSchoolTime.split(" ")[1].substr(0, 5)}}</p>
              <p>{{enterSchoolTime == "" ? enterSchoolDate : enterSchoolTime.split(" ")[0]}}</p>
            </div>
            <div
              class="homeAttendanceBoxBotItemBtn"
              style="color:white;background-color:#E0E0E0;"
              @click="enterSchoolBtn"
            >进校</div>
          </div>
          <div class="blockLine"></div>
          <div class="homeAttendanceBoxBotItem">
            <div class="homeAttendanceBoxBotItemTime">
              <p>{{leaveSchoolTime == "" ? "-- : --" : leaveSchoolTime.split(" ")[1].substr(0, 5)}}</p>
              <p>{{leaveSchoolDate}}</p>
            </div>
            <div
              v-show="isLeave == 1"
              class="homeAttendanceBoxBotItemBtn"
              @click="leaveSchoolBtn"
            >离校</div>
            <div
              v-show="isLeave == 2"
              class="homeAttendanceBoxBotItemBtn"
              style="color:white;background-color:#E0E0E0;"
            >离校</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tip -->
    <div class="homeTip" @click="homeTipClick" v-show="classNoticeInfoNum != 0">
      <div class="homeTipLeft">
        <div class="homeTipLeftTit">
          <p>班级</p>
          <p>通知</p>
        </div>
        <p class="homeTipLeftCon">· 您有{{classNoticeInfoNum}}条未读的班级通知消息</p>
      </div>
      <p class="homeTipRight">{{noticeTimeFilter}} ></p>
    </div>

    <!-- parentClass -->
    <div class="homeParentClass">
      <div class="homeParentClassTit">
        <img src="../../assets/imgs/home/parentClassLog.png" alt="家长课堂" />
      </div>
      <div class="homeParentClassCon">
        <van-list
          class="homeParentClassConList"
          v-model="bottomLoading"
          :finished="bottomFinished"
          finished-text="我可是有底线的呦"
          @load="bottomOnLoad"
        >
          <van-cell
            v-for="(item, i) in parentClassInfo"
            :key="i"
            @click="homeBottomListClick(item.redirect_url)"
          >
            <template slot="title" class="homeParentClassConItem">
              <div class="homeParentClassConItemLeft">
                <p>{{item.title.length > 25 ? (item.title.substr(0, 25) + "...") : item.title}}</p>
                <div class="homeParentClassConItemLeftBot">
                  <span>{{item.source}}</span>
                  <div class="homeParentClassConItemLeftBotRight">
                    <img src="../../assets/imgs/home/parentClassConFire.png" alt="图片加载失败" />
                    <span>{{item.count_num}}</span>
                  </div>
                </div>
              </div>
              <img class="homeParentClassConItemRight" :src="item.img" />
            </template>
          </van-cell>
        </van-list>
      </div>
    </div>

    <!-- BottomBlock -->
    <div style="height: 3rem;background-color: white;"></div>

    <!-- ---------------------- -->
  </div>
</template>

<script>
import {
  homeParentClass,
  homeNewindex,
  homeShowStudent,
  homeModify
} from "@/api/api";
import { Dialog } from "vant";
import { base64 } from "@/utils/base64.js";
import { unBase64 } from "@/utils/unBase64.js";
import { signFun } from "@/utils/sign.js";

export default {
  name: "home",
  data() {
    return {
      params: null,
      homeTopListIndex: 0,
      homeTopListName: null,
      homeTopList: [],
      homeTopListShow: [],
      homeFunctionList: [
        {
          name: "课堂报告",
          imgUrl: require("../../assets/imgs/home/home_class.png"),
          linkToUrl:
            "http://wechat.sdxxtop.com/parent/classroom/index.html#views/classroomreport?para="
        },
        {
          name: "作业",
          imgUrl: require("../../assets/imgs/home/home_work.png"),
          linkToUrl: "http://wechat.sdxxtop.com/parent/task/index.html#/?para="
        },
        {
          name: "学情报告",
          imgUrl: require("../../assets/imgs/home/home_report.png"),
          linkToUrl:
            "http://wechat.sdxxtop.com/parent/classroom/index.html#views/studentReport?para="
        },
        {
          name: "习惯打卡",
          imgUrl: require("../../assets/imgs/home/habitClock.png"),
          linkToUrl: ""
        }
      ],
      enterSchoolTime: "-- : --",
      leaveSchoolTime: "-- : --",
      enterSchoolDate: "2019-11-22",
      leaveSchoolDate: "2019-11-22",
      isLeave: 1,
      classNoticeInfoNum: "",
      classNoticeInfoTime: "",
      parentClassInfo: [],
      topToParentClassFlag: false,
      loadMoreList: [],
      bottomLoading: false,
      bottomFinished: false,
      bottomLoadMorePg: 0
    };
  },
  mounted() {
    window.addEventListener("scroll", this.homeRootScroll);
    this.signAttendanceFilter();
    this.queryParams();
    // this.queryHomeInfo();
    this.queryShowStudent();
  },
  destroyed() {
    window.removeEventListener("scroll", this.homeRootScroll);
  },
  methods: {
    // 处理接收参数
    queryParams() {
      this.params = window.location.href.split("?")[1];
      if (this.params != undefined) {
        let toUser = false;
        if (this.params.indexOf("php=1") != -1) {
          toUser = true;
          this.params = this.params.replace("&php=1", "");
        }

        console.log(this.params);
        this.params = this.params.replace("#/", "").split("=")[1];
        this.params = JSON.parse(unBase64(decodeURIComponent(this.params)));
        console.log(this.params);
        sessionStorage.setItem("ci", this.params.ci);
        sessionStorage.setItem("ui", this.params.ui);
        sessionStorage.setItem("si", this.params.si);
        sessionStorage.setItem("v", "10108");
        if (toUser) {
          // this.$router.push({
          //   path: "/layout/user"
          // });
          window.location.href =
            "http://wechat.sdxxtop.com/parent/index.html#/layout/user";
        }
      } else {
        sessionStorage.setItem(
          "si",
          JSON.parse(localStorage.getItem("studentInfo")).student_id
        );
      }
    },
    // 首页数据信息
    queryHomeInfo() {
      console.log(sessionStorage.getItem("si"));
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      homeNewindex(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.classNoticeInfoNum = res.data.notice.notice_num;
          this.classNoticeInfoTime = res.data.notice.date_time;
          // alert(this.noticeTimeFilter);
          this.parentClassInfo = res.data.article;
          this.bottomLoadMorePg = this.parentClassInfo.length;
          sessionStorage.setItem("parentName", res.data.parent_name);

          this.enterSchoolTime = res.data.sign[0].sign_arrive;
          this.leaveSchoolTime = res.data.sign[0].sign_leave;
          this.isLeave = res.data.sign[0].is_leave;
        }
      });
    },
    // 首页顶部学生
    queryShowStudent() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      homeShowStudent(data).then(res => {
        console.log(res.data.student);
        if (res.code == 200) {
          this.homeTopList = res.data.student;
          this.homeTopList.map((e, i) => {
            if (e.student_id == sessionStorage.getItem("si") * 1) {
              this.homeTopListIndex = i;
            }
          });
          console.log("--------------------------------------------");
          console.log(this.homeTopListIndex);
          console.log("--------------------------------------------");

          if (localStorage.getItem("studentInfo")) {
            // console.log(localStorage.getItem("studentInfo"));
            this.homeTopListName = JSON.parse(
              localStorage.getItem("studentInfo")
            ).name;
            sessionStorage.setItem(
              "si",
              JSON.parse(localStorage.getItem("studentInfo")).student_id
            );
            this.homeTopList.map((e, i) => {
              if (e.student_id == sessionStorage.getItem("si") * 1) {
                this.homeTopListIndex = i;
              }
            });
            this.setParams();
          } else {
            this.setTopListAction();
          }
        }
      });
    },
    // 设置顶部选中
    setTopListAction() {
      this.homeTopListName = this.homeTopList[0].name;
      localStorage.setItem("studentInfo", JSON.stringify(this.homeTopList[0]));
      this.setParams();
    },
    // 拼接跳转页面路径参数
    setParams() {
      let tempDataObj = {
        ci: sessionStorage.getItem("ci"),
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si")
      };
      let tempDataObjSN = signFun(
        tempDataObj,
        "9E1613256C1F4815219A633762B53704"
      );
      let tempObj = {
        companyId: sessionStorage.getItem("ci"),
        userId: sessionStorage.getItem("ui"),
        studentId: sessionStorage.getItem("si"),
        data: tempDataObjSN,
        studentName: this.homeTopListName
      };
      this.urlParamStr = base64(JSON.stringify(tempObj));
      localStorage.setItem("urlParamStr", this.urlParamStr);
      this.queryHomeInfo();
    },
    // 首页家长课堂
    queryParentClass() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        pg: this.bottomLoadMorePg,
        v: sessionStorage.getItem("v")
      };
      homeParentClass(data).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.loadMoreList = res.data.article;
          this.parentClassInfo = this.parentClassInfo.concat(this.loadMoreList);
          this.bottomLoadMorePg = this.parentClassInfo.length;
          // 加载状态结束
          this.bottomLoading = false;
          // 数据全部加载完成
          if (this.parentClassInfo.length >= 50) {
            this.bottomFinished = true;
          }
        }
      });
    },
    // title点击
    homeTopListClick(i, item) {
      this.homeTopListIndex = i;
      this.homeTopListName = item.name;
      // console.clear();
      console.log(sessionStorage.getItem("si"));
      sessionStorage.setItem("si", item.student_id);

      localStorage.setItem("studentInfo", JSON.stringify(item));
      // sessionStorage.setItem("studentInfo", JSON.stringify(item));
      this.queryHomeInfo();
      this.setParams();
    },
    // 出勤时间日期处理
    signAttendanceFilter() {
      let y = new Date().getFullYear();
      let m = new Date().getMonth() + 1;
      let d = new Date().getDate();
      this.enterSchoolDate = this.leaveSchoolDate = y + "-" + m + "-" + d;
    },
    // 滚动控制title
    homeRootScroll(e) {
      let topToPar = window.scrollY;
      if (topToPar > 330) {
        this.topToParentClassFlag = true;
      } else {
        this.topToParentClassFlag = false;
      }
    },
    // 中间功能跳转
    unitLinkTo(item, i) {
      if (i != 3) {
        console.log(item.linkToUrl + this.urlParamStr)
        window.location.href = item.linkToUrl + this.urlParamStr;
      } else {
        console.log(item.name);
        this.$router.push({
          path: "/habitClockIn"
        });
      }
    },
    // 今日出勤详情点击
    attendanceMoreClick() {
      let tempData = JSON.parse(unBase64(this.urlParamStr)).data;
      window.location.href =
        "http://wechat.sdxxtop.com/parent/student/attend/data/" + tempData;
    },
    // 进校 离校按钮
    enterSchoolBtn() {
      // console.log("进校");
    },
    leaveSchoolBtn() {
      // console.log("离校");
      this.setLeaveSchool();
    },
    // 确认离校弹框
    setLeaveSchool() {
      Dialog.confirm({
        title: "确认离校",
        message: "确定接到了您的孩子, 并且离校?"
      })
        .then(() => {
          this.confirmLeave();
        })
        .catch(() => {
          // on cancel
        });
    },
    // 确认离校请求
    confirmLeave() {
      // console.log(sessionStorage.getItem("si"));
      let data = {
        si: sessionStorage.getItem("si"),
        st: this.enterSchoolDate,
        v: sessionStorage.getItem("v")
      };
      homeModify(data).then(res => {
        if (res.code == 200) {
          this.queryHomeInfo();
        }
      });
    },
    // 班级通知按钮
    homeTipClick() {
      this.$router.push({
        path: "/noticeList",
        query: {
          noticeType: 4
        }
      });
    },
    // 家长课堂点击
    homeBottomListClick(u) {
      window.location.href = u;
    },
    // 下拉加载更多
    bottomOnLoad() {
      if (this.bottomLoading == true) {
        setTimeout(() => {
          this.queryParentClass();
        }, 500);
      }
    }
  },
  computed: {
    // 通知时间描述
    noticeTimeFilter() {
      let curTime = new Date();
      let postTime = new Date(this.classNoticeInfoTime);
      let timeDiff = curTime.getTime() - postTime.getTime();

      let min = 60 * 1000;
      let hour = min * 60;
      let day = hour * 24;
      let week = day * 7;

      let exceedWeek = Math.floor(timeDiff / week);
      let exceedDay = Math.floor(timeDiff / day);
      let exceedHour = Math.floor(timeDiff / hour);
      let exceedMin = Math.floor(timeDiff / min);
      if (exceedWeek > 0) {
        return exceedWeek.toString() + "周前";
      } else {
        if (exceedDay < 7 && exceedDay > 0) {
          return exceedDay.toString() + "天前";
        } else {
          if (exceedHour < 24 && exceedHour > 0) {
            return exceedHour.toString() + "小时前";
          } else {
            if (exceedMin.toString() + "分钟前" == "NaN分钟前") {
              this.classNoticeInfoTime = this.classNoticeInfoTime
                .split(" ")[0]
                .split("-")
                .splice(1)
                .join("/");
              return this.classNoticeInfoTime;
            }
            return exceedMin.toString() + "分钟前";
          }
        }
      }
    }
  }
};
</script>

<style scoped>
p {
  margin: 0 !important;
}
.home {
  background-color: #fafafa;
  color: #313131;
  position: relative;
  width: 100vw;
}
.van-cell {
  padding: 0.3rem 0 !important;
}
.van-cell__title {
  display: flex;
  justify-content: space-between;
}
.van-cell::after {
  display: none !important;
}
.van-cell:last-child {
  padding: 0.3rem 0 !important;
}
/* top */
.homeTop {
  position: relative;
  background-color: #38b48b;
  height: 4rem;
  width: 100vw;
  padding: 0 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.homeTopToParLog {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  width: 4rem;
}

.homeTopList {
  position: absolute;
  right: 1.5rem;
  bottom: -0.1rem;
  display: flex;
  color: white;
  width: calc(70vw - 0.5rem);
  height: 3.32rem;
  overflow-y: scroll;
  /* padding: 0 0.5rem; */
  box-sizing: border-box;
}

.homeTopList::-webkit-scrollbar {
  display: none;
}
.homeTopListItem {
  font-size: 1rem;
  line-height: 2.8rem;
  vertical-align: middle;
  padding: 0 0.5rem;
  white-space: nowrap;
  box-sizing: border-box;
  /* transition: 1s; */
}
.homeTopListItemAction {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(30vw - 0.5rem);
  height: 4rem;
  color: white;
  text-align: left;
  font-size: 1.8rem;
  line-height: 4rem;
  padding: 0 0.5rem;
  white-space: nowrap;
  box-sizing: border-box;
  /* transition: 1s; */
}
.homeTopListItemAction > p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.homeTopListItemAction > span {
  position: absolute;
  bottom: -0.15rem;
  left: 0.5rem;
  display: block;
  background-color: #fcd81e;
  width: 2.4rem;
  height: 0.25rem;
  z-index: 5000;
}

/* Function */
.homeFunction {
  height: 9.5rem;
  background-color: white;
  padding: 0.5rem;
  box-sizing: border-box;
  box-shadow: 0 0 4px rgb(238, 238, 238) !important;
  z-index: 500;
}
.homeFunctionImg {
  width: 2.6rem;
  height: 3rem;
  display: flex;
  align-items: center;
}
.homeFunctionImg img {
  width: 100%;
}
.homeFunctionTit {
  padding: 0;
  margin: 0 !important;
  margin-top: 0rem !important;
  font-size: 0.8rem;
}

/* Attendance */
.homeAttendance {
  width: 100vw;
  height: 4.5rem;
  position: relative;
}
.homeAttendanceBox {
  width: 90vw;
  height: 6.5rem;
  margin: 0 auto;
  padding: 0.8rem 1.2rem;
  box-sizing: border-box;
  position: relative;
  top: -3rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 0 5px rgb(224, 224, 224) !important;
}
.homeAttendanceBoxTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.homeAttendanceBoxTop > p {
  font-size: 1.1rem;
}
.homeAttendanceBoxBot {
  width: 100%;
  height: 2.4rem;
  display: flex;
  justify-content: space-between;
}
.blockLine {
  width: 1px;
  height: 2.65rem;
  background-color: #e0e0e0;
}
.homeAttendanceBoxBotItem {
  width: 43%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.homeAttendanceBoxBotItemTime {
  white-space: nowrap;
}
.homeAttendanceBoxBotItemTime p:nth-child(1) {
  font-size: 1.6rem;
}
.homeAttendanceBoxBotItemTime p:nth-child(2) {
  font-size: 0.6rem;
}
.homeAttendanceBoxBotItemBtn {
  background-color: #38b48b;
  color: white;
  white-space: nowrap;
  padding: 0.2rem 0.6rem;
  font-size: 1rem;
  border-radius: 3rem;
}

/* Tip */
.homeTip {
  height: 4rem;
  width: 100vw;
  padding: 1rem;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem !important;
}
.homeTipLeft {
  display: flex;
  justify-content: left;
  align-items: center;
}
.homeTipLeftTit p:nth-child(1) {
  color: #00b25e;
  white-space: nowrap;
}
.homeTipLeftTit p:nth-child(2) {
  background-color: #eb6100;
  color: white;
  font-size: 0.8rem;
  margin-top: 0.1rem !important;
  padding: 0 0.1rem;
  white-space: nowrap;
}
.homeTipLeftCon {
  margin-left: 1rem !important;
  font-size: 0.9rem;
  text-align: left;
  width: 52vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.homeTipRight {
  color: #999999;
  font-size: 0.9rem;
  white-space: nowrap;
}

/* ParentClass */
.homeParentClass {
  background-color: white;
}
.homeParentClassTit {
  width: 100%;
  height: 3rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.homeParentClassTit > img {
  width: 4rem;
  padding-left: 0.5rem;
  border-left: 0.2rem solid #fcd81e;
}
.homeParentClassTitDrop {
  margin-right: 0.5rem;
}
.homeParentClassCon {
  width: 100vw;
}
.homeParentClassConList {
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
}
.homeParentClassConList p {
  text-align: left !important;
}
.homeParentClassConItem {
  width: 100%;
  height: 4.3rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}
.homeParentClassConItemLeft {
  width: 71%;
  height: 4.3rem;
  position: relative;
}
.homeParentClassConItemLeft > p {
  font-size: 0.9rem;
}
.homeParentClassConItemLeftBot {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.7rem;
  color: #999999;
}
.homeParentClassConItemLeftBotRight img {
  width: 0.8rem;
  margin-right: 0.2rem;
}
.homeParentClassConItemRight {
  width: 26%;
  height: 4.3rem;
}
</style>
