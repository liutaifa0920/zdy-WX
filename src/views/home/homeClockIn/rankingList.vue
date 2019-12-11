<template>
  <div class="rankingList">
    <van-nav-bar
      class="topNavBar"
      title="打卡排行榜"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="rankingListBox">
      <div class="topBlock"></div>
      <div class="rankingListBoxTop">
        <img src="~@/assets/imgs/home/habitClock/yun.png" alt />
        <div class="rankingListBoxTopTil">
          <p>{{"张三"}} 排名第一</p>
          <span>我已坚持{{"12"}}天</span>
        </div>
      </div>
      <div class="rankingListBoxBot">
        <div class="rankingListBoxBotList" v-for="(item,i) in 15" :key="i">
          <div class="rankingListBoxBotListLeft">
            <div class="rankingListBoxBotListLeftItem" v-if="i == 0">
              <img src="~@/assets/imgs/home/habitClock/1.png" alt />
            </div>
            <div class="rankingListBoxBotListLeftItem" v-if="i == 1">
              <img src="~@/assets/imgs/home/habitClock/2.png" alt />
            </div>
            <div class="rankingListBoxBotListLeftItem" v-if="i == 2">
              <img src="~@/assets/imgs/home/habitClock/3.png" alt />
            </div>
            <div
              v-if="(i != 0) && (i != 1) && (i != 2) "
              class="rankingListBoxBotListLeftItem"
            >{{i+1}}</div>
            <img src="~@/assets/imgs/home/habitClock/bg.png" alt />
            <p>{{"张三"}}</p>
          </div>
          <div class="rankingListBoxBotListRight">{{"12"}}天</div>
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
}
.rankingList {
  background-color: #e5f2ff;
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
.rankingListBox {
  width: 100vw;
  height: 100vh;
  background: url(~@/assets/imgs/home/habitClock/bg.png) no-repeat;
  background-size: 100%;
}
.rankingListBoxTop {
  text-align: center;
  position: relative;
  margin-top: 1rem;
}
.rankingListBoxTop > img {
  width: 4.5rem;
  height: 4.5rem;
  background-color: red;
  border-radius: 50%;
  position: relative;
  top: 1.5rem;
  z-index: 2;
}
.rankingListBoxTopTil {
  width: 17.3rem;
  height: 7rem;
  margin: 0 auto;
  background: url(~@/assets/imgs/home/habitClock/yun.png) no-repeat;
  background-size: 100%;
  position: relative;
  color: white;
  padding-top: 2.3rem;
  box-sizing: border-box;
  z-index: 1;
}
.rankingListBoxTopTil > p {
  text-align: center;
}
.rankingListBoxTopTil > span {
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #0051a280;
  width: 9rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border-radius: 0.75rem;
}

/* BottomList */
.rankingListBoxBot {
  background-color: white;
  width: 91vw;
  height: calc(100vh - 16.6rem);
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 0.3rem 1rem;
  overflow-y: scroll;
  box-sizing: border-box;
}
.rankingListBoxBot::-webkit-scrollbar {
  display: none;
}
.rankingListBoxBotList {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}
.rankingListBoxBotListLeft {
  width: 50%;
  display: flex;
  justify-content: left;
  align-items: center;
}
.rankingListBoxBotListLeft > img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid white;
  margin-right: 0.8rem;
}
.rankingListBoxBotListLeftItem {
  color: #999999;
  font-weight: 600;
  width: 2rem;
  height: 2.1rem;
  text-align: center;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rankingListBoxBotListLeftItem > img {
  width: 100%;
}
.rankingListBoxBotListRight {
  font-size: 0.9rem;
}
</style>