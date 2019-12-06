<template>
  <div class="clockInfo">
    <van-nav-bar
      class="topNavBar"
      title="打卡详情"
      left-text="返回"
      right-text="分享"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="topBlock"></div>
    <div class="clockInfoMain">
      <p>
        <span>每日阅读</span>
        <span>打卡设置</span>
      </p>
      <p>{{"2019-11-11 16:30"}}</p>
      <p>{{"二年级十一班"+" "+"张三老师"}}</p>
      <p>
        <span>剩余：{{"20天"}}</span>
        <span>频次：{{"每周一/二/三/四/五/六"}}</span>
      </p>
    </div>
    <div class="clockInfoCon">
      <p>坚持阅读养成好习惯-朗读音频打卡</p>
      <img src="~@/assets/imgs/home/home_report.png" alt />
    </div>
    <!-- List -->
    <div class="clockInfoListTit">班级打卡动态</div>
    <div class="clockInfoList" v-for="(item, i) in 5" :key="i">
      <div>
        <img src alt />
        <p>{{"李四爸爸"}}</p>
        <p>{{"2019-11-16 18:24"}} 已坚持{{"1"}}天</p>
      </div>
      <p>{{"知点云是由山东旭兴网络科技有限公司专为K12公办学校研发的数字孪生教育SaaS软件。"}}</p>
    </div>
    <div class="bottomBlock"></div>
    <div class="clockBottomNav">
      <div class="clockBottomNavItem" @click="routeToRankingList">
        <img src alt />
        <p>排行榜</p>
      </div>
      <div class="clockBottomNavItem" @click="routeToClockInStatistics">
        <img src alt />
        <p>打卡统计</p>
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
    // 跳转排行榜
    routeToRankingList() {
      this.$router.push({
        path: "/rankingList"
      });
    },
    // 跳转打卡统计
    routeToClockInStatistics(){
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

/* BottomNav */
.bottomBlock {
  width: 100vw;
  height: 3.5rem;
}
.clockBottomNav {
  background-color: white;
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
}
</style>