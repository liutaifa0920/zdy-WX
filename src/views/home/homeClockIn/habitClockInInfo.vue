<template>
  <div class="clockInfo">
    <van-nav-bar
      class="topNavBar"
      title="打卡详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <div class="clockInfoMain">
      <div class="clockInfoTit">
        <span>每日阅读</span>
        <div class="clockInfoTitRight">
          <span>打卡设置</span>
          <img src="~@/assets/imgs/home/habitClock/向下.png" alt />
        </div>
      </div>
      <p class="clockInfoTimeName">{{"2019-11-11 16:30"}}</p>
      <p class="clockInfoTimeName">{{"二年级十一班"+" "+"张三老师"}}</p>
      <p class="clockInfoInfo">
        <span>剩余：{{"20天"}}</span>
        <span>频次：{{"每周一/二/三/四/五/六"}}</span>
      </p>
    </div>
    <div class="clockInfoCon">
      <p>坚持阅读养成好习惯-朗读音频打卡</p>
      <p>
        详情
        <img src="~@/assets/imgs/home/habitClock/2爱向下.png" alt />
      </p>
    </div>
    <!-- List -->
    <div class="clockInfoListTit">班级打卡动态</div>
    <!-- 单条动态 -->
    <div class="clockInfoList" v-for="(item, i) in 5" :key="i">
      <div class="clockInfoListItem">
        <div class="clockInfoListItemLeft">
          <img src="~@/assets/imgs/home/habitClock/bg.png" alt />
          <div class="clockInfoListItemTopRight">
            <p>{{"李四爸爸"}}</p>
            <p>{{"2019-11-16 18:24"}} 已坚持{{"1"}}天</p>
          </div>
        </div>
        <img src="~@/assets/imgs/home/habitClock/更多.png" alt />
      </div>
      <div class="clockInfoListItemCon">
        <p>{{"知点云是由山东旭兴网络科技有限公司专为K12公办学校研发的数字孪生教育SaaS软件。"}}</p>
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
    <div class="bottomBlock"></div>
    <div class="bottomBlock"></div>
    <div class="clockBottomNav">
      <div class="clockBottomNavItem" @click="routeToRankingList">
        <img src="~@/assets/imgs/home/habitClock/ranking.png" alt />
        <p>排行榜</p>
      </div>
      <div class="clockBottomNavItem" @click="routeToClockInStatistics">
        <img src="~@/assets/imgs/home/habitClock/statistics.png" alt />
        <p>打卡统计</p>
      </div>
      <div class="clockBottomNavBtn" @click="linkToClockIn">打卡</div>
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
    // 跳转排行榜
    routeToRankingList() {
      this.$router.push({
        path: "/rankingList"
      });
    },
    // 跳转打卡统计
    routeToClockInStatistics() {
      this.$router.push({
        path: "/clockInStatistics"
      });
    },
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
    // 分享
    onClickRight() {
      console.log("分享");
    },
    // 去打卡
    linkToClockIn() {
      this.$router.push({
        path: "/clockIn"
      });
    }
  }
};
</script>
<style scoped>
p {
  margin: 0 !important;
  text-align: left;
}
.clockInfo {
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

.clockInfoMain {
  width: 100vw;
  padding: 0.8rem;
  box-sizing: border-box;
  border-bottom: 1px solid #d3d3d3;
}
.clockInfoTit {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4rem;
}
.clockInfoTit > span:nth-child(1) {
  font-size: 1.1rem;
  color: #000000;
}
.clockInfoTitRight {
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.8rem;
  color: #38b48b;
}
.clockInfoTitRight > img {
  width: 0.8rem;
  height: 0.8rem;
  background-color: #eeeeee;
  margin-left: 0.4rem;
}
.clockInfoTimeName {
  color: #999999;
  font-size: 0.8rem;
}
.clockInfoInfo {
  font-size: 0.9rem;
  margin-top: 0.4rem !important;
}
.clockInfoCon {
  width: 100vw;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
  box-sizing: border-box;
}
.clockInfoCon > p:nth-child(1) {
  font-size: 1rem;
}
.clockInfoCon > p:nth-child(2) {
  font-size: 0.9rem;
  height: 3rem;
  color: #38b48b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.clockInfoCon img {
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.4rem;
}
.clockInfoListTit {
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