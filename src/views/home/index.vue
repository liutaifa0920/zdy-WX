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
          :key="i"
          @click="homeTopListClick(i, item)"
        >{{item.name}}</li>
      </ul>
      <img
        v-show="topToParentClassFlag"
        class="homeTopToParLog"
        src="../../assets/imgs/home/parentClassLog_w.png"
        alt="家长课堂"
      />
    </div>

    <!-- TopBlock -->
    <div style="height: 5rem"></div>

    <!-- Unit -->
    <div class="homeFunction">
      <van-grid :border="false" :column-num="3">
        <van-grid-item
          v-for="(item, i) in homeFunctionList"
          :key="i"
          @click="unitLinkTo(item.linkToUrl)"
        >
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
          <van-icon color="#999999" size="24px" name="ellipsis" />
        </div>
        <div class="homeAttendanceBoxBot">
          <div class="homeAttendanceBoxBotItem">
            <div class="homeAttendanceBoxBotItemTime">
              <p>{{enterSchoolTime}}</p>
              <p>{{enterSchoolDate}}</p>
            </div>
            <div class="homeAttendanceBoxBotItemBtn" @click="enterSchoolBtn">进校</div>
          </div>
          <div class="blockLine"></div>
          <div class="homeAttendanceBoxBotItem">
            <div class="homeAttendanceBoxBotItemTime">
              <p>{{leaveSchoolTime}}</p>
              <p>{{leaveSchoolDate}}</p>
            </div>
            <div class="homeAttendanceBoxBotItemBtn" @click="leaveSchoolBtn">离校</div>
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
      <p class="homeTipRight">{{classNoticeInfoTime}} ></p>
    </div>

    <!-- parentClass -->
    <div class="homeParentClass">
      <div class="homeParentClassTit">
        <img src="../../assets/imgs/home/parentClassLog.png" alt="家长课堂" />
        <van-icon class="homeParentClassTitDrop" color="#999999" size="24px" name="ellipsis" />
      </div>
      <div class="homeParentClassCon">
        <!-- <ul class="homeParentClassConList">
          <li
            class="homeParentClassConItem"
            v-for="(item, i) in parentClassInfo"
            :key="i"
            @click="homeBottomListClick(item.redirect_url)"
          >
            <div class="homeParentClassConItemLeft">
              <p>{{ item.title }}</p>
              <div class="homeParentClassConItemLeftBot">
                <span>{{item.source}}</span>
                <div class="homeParentClassConItemLeftBotRight">
                  <img src="../../assets/imgs/home/parentClassConFire.png" alt="图片加载失败" />
                  <span>{{item.count_num}}</span>
                </div>
              </div>
            </div>
            <img class="homeParentClassConItemRight" :src="item.img" />
          </li>
        </ul>-->

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
                <p>{{ item.title }}</p>
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
import { homeParentClass, homeNewindex, homeShowStudent } from "@/api/api";
import { unBase64 } from "@/utils/unBase64.js";
export default {
  name: "home",
  data() {
    return {
      params: null,
      homeTopListIndex: 0,
      homeTopListName: "",
      homeTopList: [],
      homeTopListShow: [],
      homeFunctionList: [
        {
          name: "课堂报告",
          imgUrl: require("../../assets/imgs/home/home_class.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/classroom/index.html#views/classroomreport?para=eyJzdHVkZW50SWQiOiIyMDAwMDAwMCIsImNvbXBhbnlJZCI6IjEwMDAxNTMiLCJ1c2VySWQiOiIzMDAwMTEzNyIsImRhdGEiOiJleUpqYVNJNk1UQXdNREUxTXl3aWMya2lPaUl5TURBd01EQXdNQ0lzSW5OdUlqb2lOalUxTmpoQk9UaEdSRFExUlRoRU1rRXdNVEZGTnpKQ01qbEJPVGc1T0RVaUxDSjBjeUk2TVRVM05EUTNOREF3TlN3aWRXa2lPak13TURBeE1UTTNmUT09Iiwic3R1ZGVudE5hbWUiOiJoZWxsbyJ9"
        },
        {
          name: "作业",
          imgUrl: require("../../assets/imgs/home/home_work.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/task/index.html#/?para=eyJzdHVkZW50SWQiOiIyMDAwMDAwMCIsImNvbXBhbnlJZCI6IjEwMDAxNTMiLCJ1c2VySWQiOiIzMDAwMTEzNyIsImRhdGEiOiJleUpqYVNJNk1UQXdNREUxTXl3aWMya2lPaUl5TURBd01EQXdNQ0lzSW5OdUlqb2lOalUxTmpoQk9UaEdSRFExUlRoRU1rRXdNVEZGTnpKQ01qbEJPVGc1T0RVaUxDSjBjeUk2TVRVM05EUTNOREF3TlN3aWRXa2lPak13TURBeE1UTTNmUT09Iiwic3R1ZGVudE5hbWUiOiJoZWxsbyJ9"
        },
        {
          name: "学情报告",
          imgUrl: require("../../assets/imgs/home/home_report.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/classroom/index.html#views/studentReport?para=eyJzdHVkZW50SWQiOiIyMDAwMDAwMCIsImNvbXBhbnlJZCI6IjEwMDAxNTMiLCJ1c2VySWQiOiIzMDAwMTEzNyIsImRhdGEiOiJleUpqYVNJNk1UQXdNREUxTXl3aWMya2lPaUl5TURBd01EQXdNQ0lzSW5OdUlqb2lOalUxTmpoQk9UaEdSRFExUlRoRU1rRXdNVEZGTnpKQ01qbEJPVGc1T0RVaUxDSjBjeUk2TVRVM05EUTNOREF3TlN3aWRXa2lPak13TURBeE1UTTNmUT09Iiwic3R1ZGVudE5hbWUiOiJoZWxsbyJ9"
        }
      ],
      enterSchoolTime: "-- : --",
      leaveSchoolTime: "-- : --",
      enterSchoolDate: "2019-11-22",
      leaveSchoolDate: "2019-11-22",
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
    this.queryHomeInfo();
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
        this.params = this.params.replace("#/", "").split("=")[1];
        this.params = JSON.parse(unBase64(decodeURIComponent(this.params)));
        console.log(this.params);
        localStorage.setItem("ui", this.params.userId);
        localStorage.setItem("si", this.params.studentId);
        localStorage.setItem("v", "10108");
      }
    },
    // 首页数据信息
    queryHomeInfo() {
      let data = {
        ui: localStorage.getItem("ui"),
        si: localStorage.getItem("si"),
        v: localStorage.getItem("v")
      };
      homeNewindex(data).then(res => {
        console.log(res.data);
        this.classNoticeInfoNum = res.data.notice.notice_num;
        this.classNoticeInfoTime = this.noticeTimeFilter(
          res.data.notice.date_time
        );
        this.parentClassInfo = res.data.article;
        this.bottomLoadMorePg = this.parentClassInfo.length;
        localStorage.setItem("parentName", res.data.parent_name);
      });
    },
    // 首页顶部学生
    queryShowStudent() {
      let data = {
        ui: localStorage.getItem("ui"),
        si: localStorage.getItem("si"),
        v: localStorage.getItem("v")
      };
      homeShowStudent(data).then(res => {
        // console.log(res.data.student);
        this.homeTopList = res.data.student;
        if (localStorage.getItem("studentInfo")) {
          this.homeTopListName = JSON.parse(localStorage.getItem("studentInfo")).name
        } else {
          this.setTopListAction();
        }
      });
    },
    // 设置顶部选中
    setTopListAction() {
      this.homeTopListName = this.homeTopList[0].name;
      localStorage.setItem("studentInfo", JSON.stringify(this.homeTopList[0]));
    },
    // 首页家长课堂
    queryParentClass() {
      let data = {
        ui: localStorage.getItem("ui"),
        si: localStorage.getItem("si"),
        pg: this.bottomLoadMorePg,
        v: localStorage.getItem("v")
      };
      homeParentClass(data).then(res => {
        // console.log(res.data.article);
        this.loadMoreList = res.data.article;
        this.parentClassInfo = this.parentClassInfo.concat(this.loadMoreList);
        this.bottomLoadMorePg = this.parentClassInfo.length;
        // 加载状态结束
        this.bottomLoading = false;
        // 数据全部加载完成
        if (this.parentClassInfo.length >= 40) {
          this.bottomFinished = true;
        }
      });
    },
    // title点击
    homeTopListClick(i, item) {
      console.log(item);
      this.homeTopListIndex = i;
      this.homeTopListName = item.name;
      localStorage.setItem("si", item.student_id);
      localStorage.setItem("studentInfo", JSON.stringify(item));
      this.queryHomeInfo();
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
    unitLinkTo(n) {
      window.location.href = n;
    },
    // 进校 离校按钮
    enterSchoolBtn() {
      console.log("进校");
    },
    leaveSchoolBtn() {
      console.log("离校");
    },
    // 班级通知按钮
    homeTipClick() {
      console.log("班级通知");
    },
    // 通知时间描述
    noticeTimeFilter(time) {
      let curTime = new Date();
      let postTime = new Date(time);
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
        return exceedWeek + "周前";
      } else {
        if (exceedDay < 7 && exceedDay > 0) {
          return exceedDay + "天前";
        } else {
          if (exceedHour < 24 && exceedHour > 0) {
            return exceedHour + "小时前";
          } else {
            return exceedMin + "分钟前";
          }
        }
      }
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
        }, 1500);
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
  height: 5rem;
  width: 100vw;
  padding: 0 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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
  z-index: 200;
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
  z-index: 500;
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
