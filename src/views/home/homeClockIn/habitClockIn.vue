<template>
  <div class="habitClock">
    <van-nav-bar
      class="topNavBar"
      left-text="返回"
      title="习惯打卡"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <van-tabs v-model="tabAction" swipeable animated>
      <van-tab
        v-for="(item, i) in tabTitleList"
        :key="i + 'a'"
        :title="item.name"
        :name="item.value"
      >
        <div class="tabsConBox">
          <div
            v-show="tabAction == 1"
            v-for="(item, i) in clockInList"
            :key="i"
            class="habitClockItem"
          >
            <div class="habitClockItemTime">1分钟前</div>
            <div class="habitClockItemCon">
              <div class="habitClockItemConT">
                <span @click="clockItemClick(item)">每日阅读</span>
                <span @click="linkToToClockIn">去打卡</span>
              </div>
              <p @click="clockItemClick(item)" class="habitClockItemConCP1">已进行1天，已坚持打卡1天</p>
              <p @click="clockItemClick(item)" class="habitClockItemConCP2">40位学生参加，10位今日已打卡</p>
              <div class="habitClockItemConB">
                <p @click="linkToClockItem(1)">
                  <img src="~@/assets/imgs/home/habitClock/ranking.png" />
                  排行榜
                </p>
                <div class="habitClockItemConBB"></div>
                <p @click="linkToClockItem(2)">
                  <img src="~@/assets/imgs/home/habitClock/statistics.png" />
                  打卡统计
                </p>
                <!-- <div class="habitClockItemConBB"></div>
                <p @click="linkToClockItem(3)">分享</p>-->
              </div>
            </div>
          </div>
          <div
            v-show="tabAction == 2"
            v-for="(item, i) in clockInOverList"
            :key="i + 'b'"
            class="habitClockItem"
          >
            <div style="height: .6rem;width: 100vw;"></div>
            <div class="habitClockItemCon">
              <div class="habitClockItemConT">
                <span>每日阅读</span>
                <span style="background-color: #E0E0E0;">已结束</span>
              </div>
              <p @click="clockItemClick(item)" class="habitClockItemConCP1">已进行1天，已坚持打卡1天</p>
              <p @click="clockItemClick(item)" class="habitClockItemConCP2"></p>
              <div class="habitClockItemConB">
                <p @click="linkToClockItem(1)">
                  <img src="~@/assets/imgs/home/habitClock/ranking.png" />
                  排行榜
                </p>
                <div class="habitClockItemConBB"></div>
                <p @click="linkToClockItem(2)">
                  <img src="~@/assets/imgs/home/habitClock/statistics.png" />
                  打卡统计
                </p>
              </div>
            </div>
          </div>
          <div style="margin-bottom: 1rem;"></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabTitleList: [
        {
          name: "进行中",
          value: 1
        },
        {
          name: "已结束",
          value: 2
        }
      ],
      tabAction: 1,
      clockInList: [{}, {}, {}, {}],
      clockInOverList: [{}, {}, {}, {}, {}, {}, {}]
    };
  },
  mounted() {},
  methods: {
    // 打卡itemClick
    clockItemClick(item) {
      console.log(item);
      this.$router.push({
        path: "/habitClockInInfo"
      });
    },
    // 跳转至打卡页面
    linkToToClockIn() {
      this.$router.push({
        path: "/clockIn"
      });
    },
    // 打卡ItemBottomClick
    linkToClockItem(t) {
      if (t == 1) {
        this.$router.push({
          path: "/rankingList"
        });
      } else if (t == 2) {
        this.$router.push({
          path: "/clockInStatistics"
        });
      } else if (t == 3) {
        console.log("分享");
      }
    },
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.habitClock .van-tab--active {
  color: #38b48b !important;
}
.habitClock .van-tabs__line {
  background-color: #38b48b !important;
  width: 2.7rem !important;
}
</style>
<style scoped>
p {
  margin: 0 !important;
}
.habitClock .van-tabs {
  width: 100%;
  height: calc(100vh - 2.8rem) !important;
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
.tabsConBox {
  width: 100%;
  height: calc(100vh - 5.55rem) !important;
  overflow-y: scroll;
  background-color: #f4f4f4;
}

/* List */
.habitClockItem {
  /* margin: 0.5rem 0; */
}
.habitClockItemTime {
  color: #999999;
  font-size: 0.9rem;
  width: 100vw;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.habitClockItemCon {
  width: 92vw;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #f4f4f4;
  /* padding: 0.9rem; */
}
.habitClockItemConT {
  width: 100%;
  margin-top: 1rem;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.habitClockItemConT > span:nth-child(1) {
  font-size: 1.2rem;
  font-weight: 600;
}
.habitClockItemConT > span:nth-child(2) {
  background-color: #38b48b;
  color: white;
  font-size: 0.9rem;
  padding: 0.4rem 1.5rem;
  border-radius: 2rem;
}
.habitClockItemConCP1,
.habitClockItemConCP2 {
  text-align: left;
  /* padding: 0 1rem; */
  box-sizing: border-box;
}
.habitClockItemConCP1 {
  padding: 0.2rem 1rem 0 !important;
  font-size: 0.8rem;
  color: #b6b6b6;
}
.habitClockItemConCP2 {
  padding: 0.7rem 1rem !important;
  font-size: 0.9rem;
  color: #313131;
}

.habitClockItemConB {
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #38b48b10;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.habitClockItemConB > p {
  font-size: 0.9rem;
  height: 3rem;
  color: #b6b6b6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.habitClockItemConB img {
  width: 0.9rem;
  height: 0.9rem;
  margin-right: .3rem;
}
.habitClockItemConBB {
  width: 1px;
  height: 1rem;
  background-color: #b6b6b6;
}
</style>