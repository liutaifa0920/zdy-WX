<template>
  <div class="home">
    <!-- ---------------------- -->

    <!-- Title -->
    <div class="homeTop">
      <ul class="homeTopList" v-show="!topToParentClassFlag">
        <li
          :class="'homeTopListItem' + (homeTopListName == i ?' homeTopListItemAction' : '')"
          v-for="(item, i) in 8"
          :key="i"
          @click="homeTopListClick(i)"
        >
          张小萌
          <span></span>
        </li>
      </ul>
      <img
        v-show="topToParentClassFlag"
        class="homeTopToParLog"
        src="../../assets/imgs/parentClassLog_w.png"
        alt="家长课堂"
      />
    </div>

    <!-- TopBlock -->
    <div style="height: 5rem"></div>

    <!-- Function -->
    <div class="homeFunction">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="(item, i) in homeFunctionList" :key="i">
          <div class="homeFunctionImg">
            <img :src="item.url" :alt="item.name" />
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
            <div class="homeAttendanceBoxBotItemBtn">进校</div>
          </div>
          <div class="block"></div>
          <div class="homeAttendanceBoxBotItem">
            <div class="homeAttendanceBoxBotItemTime">
              <p>{{leaveSchoolTime}}</p>
              <p>{{leaveSchoolDate}}</p>
            </div>
            <div class="homeAttendanceBoxBotItemBtn">离校</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tip -->
    <div class="homeTip">
      <div class="homeTipLeft">
        <div class="homeTipLeftTit">
          <p>班级</p>
          <p>通知</p>
        </div>
        <p class="homeTipLeftCon">· 您有1条未读的班级通知消息</p>
      </div>
      <p class="homeTipRight">1个小时前 ></p>
    </div>

    <!-- parentClass -->
    <div class="homeParentClass">
      <div class="homeParentClassTit">
        <img src="../../assets/imgs/parentClassLog.png" alt="家长课堂" />
        <van-icon class="homeParentClassTitDrop" color="#999999" size="24px" name="ellipsis" />
      </div>
      <div class="homeParentClassCon">
        <ul class="homeParentClassConList">
          <li class="homeParentClassConItem" v-for="(item, i) in parentClassInfo" :key="i">
            <div class="homeParentClassConItemLeft">
              <p>{{item.content.length > 27 ? (item.content.substr(0,27) + '...') : item.content}}</p>
              <div class="homeParentClassConItemLeftBot">
                <span>{{item.school}}</span>
                <div class="homeParentClassConItemLeftBotRight">
                  <img src="../../assets/imgs/parentClassConFire.png" alt="图片加载失败" />
                  <span>{{item.num}}</span>
                </div>
              </div>
            </div>
            <img
              class="homeParentClassConItemRight"
              src="http://img1.imgtn.bdimg.com/it/u=1366904711,2699461808&fm=26&gp=0.jpg"
              alt
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- BottomBlock -->
    <div style="height: 5rem;background-color: white;"></div>

    <!-- ---------------------- -->
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      homeTopListName: 0,
      homeFunctionList: [
        {
          name: "课堂报告",
          url: require("../../assets/imgs/home_class.png")
        },
        {
          name: "作业",
          url: require("../../assets/imgs/home_work.png")
        },
        {
          name: "学堂报告",
          url: require("../../assets/imgs/home_report.png")
        }
      ],
      enterSchoolTime: "-- : --",
      leaveSchoolTime: "-- : --",
      enterSchoolDate: "2019-11-22",
      leaveSchoolDate: "2019-11-22",
      parentClassInfo: [
        {
          content:
            "期中考试后这位班主任家长会上家长会上家长会上的发言无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content: "这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content:
            "[荐读] 期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content:
            "[荐读] 期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content:
            "[荐读] 期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content:
            "[荐读] 期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content:
            "[荐读] 期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content:
            "[荐读] 期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content:
            "[荐读] 期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        },
        {
          content:
            "[荐读] 期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！",
          school: "知点云校园 ",
          num: 15,
          url: require("../../assets/imgs/homeTab2_h.png")
        }
      ],
      topToParentClassFlag: false
    };
  },
  methods: {
    homeTopListClick(i) {
      this.homeTopListName = i;
      console.log(this.homeTopListName);
    },
    homeRootScroll(e) {
      let topToPar = window.scrollY;
      // console.log(topToPar);
      if (topToPar > 330) {
        this.topToParentClassFlag = true;
      } else {
        this.topToParentClassFlag = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.homeRootScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.homeRootScroll);
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
  left: 0;
  bottom: -0.1rem;
  display: flex;
  color: white;
  width: 100vw;
  height: 3.32rem;
  overflow-y: scroll;
  padding: 0 0.5rem;
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
  height: 2.8rem;
  font-size: 1.8rem;
  line-height: 2.8rem;
  padding: 0 0.5rem;
  white-space: nowrap;
  position: relative;
  box-sizing: border-box;
  /* transition: 1s; */
}
.homeTopListItemAction > span {
  position: absolute;
  bottom: -0.525rem;
  left: 0.5rem;
  display: block;
  background-color: #fcd81e;
  width: 2.4rem;
  height: 0.25rem;
  z-index: 500;
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
.homeAttendanceBoxBotItem {
  width: 43%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.homeParentClassConList li:last-child{
  margin-bottom: 0 !important;
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
}
.homeParentClassConItemLeft > p {
  font-size: 0.9rem;
}
.homeParentClassConItemLeftBot {
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
