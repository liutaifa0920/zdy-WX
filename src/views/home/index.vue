<template>
  <div class="home">
    <!-- ---------------------- -->
    <!-- 模板组件 不可使用 开发删除即可 -->
    <!-- <init-template></init-template> -->

    <!-- Title -->
    <div class="homeTop">
      <ul class="homeTopList">
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
    </div>

    <!-- Function -->
    <div class="homeFunction">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="(item, i) in homeFunctionList" :key="i">
          <img class="homeFunctionImg" :src="item.url" :alt="item.name" />
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
      <div>
        <ul>
          <li v-for="(item, i) in parentClassInfo" :key="i">
            <div>
              <p></p>
              <div>
                <span></span>
                <div></div>
              </div>
            </div>
            <img src="" alt="">
          </li>
        </ul>
      </div>
    </div>

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
          url: require("../../assets/imgs/home_class.png")
        },
        {
          name: "学堂报告",
          url: require("../../assets/imgs/home_class.png")
        }
      ],
      enterSchoolTime: "-- : --",
      leaveSchoolTime: "-- : --",
      enterSchoolDate: "2019-11-22",
      leaveSchoolDate: "2019-11-22",
      parentClassInfo:[
        {
          content: '【荐读】期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！',
          school: '知点云校园 ',
          num: 15,
          url: require('../../assets/imgs/home_class.png')
        },
        {
          content: '【荐读】期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！',
          school: '知点云校园 ',
          num: 15,
          url: require('../../assets/imgs/home_class.png')
        },
        {
          content: '【荐读】期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！',
          school: '知点云校园 ',
          num: 15,
          url: require('../../assets/imgs/home_class.png')
        },
        {
          content: '【荐读】期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！',
          school: '知点云校园 ',
          num: 15,
          url: require('../../assets/imgs/home_class.png')
        },
        {
          content: '【荐读】期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！',
          school: '知点云校园 ',
          num: 15,
          url: require('../../assets/imgs/home_class.png')
        },
        {
          content: '【荐读】期中考试后，这位班主任家长会上的发言，点醒无数父母和孩子！',
          school: '知点云校园 ',
          num: 15,
          url: require('../../assets/imgs/home_class.png')
        }
      ]
    };
  },
  components: {
    // initTemplate: () => import("@/components/init.vue")
  },
  methods: {
    homeTopListClick(i) {
      this.homeTopListName = i;
      console.log(this.homeTopListName);
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
}
.homeTop {
  position: relative;
  background-color: #38b48b;
  height: 12.4vh;
  padding: 0 0.5rem;
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
  height: 24vh;
  background-color: white;
  padding: 0.5rem;
  box-sizing: border-box;
  box-shadow: 0 0 4px rgb(238, 238, 238) !important;
  z-index: 5000;
}
.homeFunctionImg {
  width: 2.5rem;
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
  box-shadow: 0 0 5px rgb(240, 240, 240) !important;
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
  background-color: #38B48B;
  color: white;
  padding: .2rem .6rem;
  font-size: 1rem;
  border-radius: 3rem;

}

/* Tip */
.homeTip {
  /* height: 4rem; */
  width: 100vw;
  padding: 1rem;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .8rem !important;
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
.homeParentClass{
  background-color: white;
}
.homeParentClassTit{
  width: 100%;
  height: 3rem;
  padding: 0 .3rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.homeParentClassTit > img{
  width: 4rem;
  padding-left: .5rem;
  border-left: .2rem solid #fcd81e;
}
.homeParentClassTitDrop{
  margin-right: .5rem;
}
</style>
