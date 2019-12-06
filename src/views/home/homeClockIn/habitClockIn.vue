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
            @click="clockItemClick(item)"
          >
            <div>
              <span>每日阅读</span>
              <span>去打卡</span>
            </div>
            <p>已进行1天，已坚持打卡1天</p>
            <p>40位学生参加，10位今日已打卡</p>
            <div>
              <p>排行榜</p>
              <p></p>
              <p>打卡统计</p>
            </div>
          </div>
          <div
            v-show="tabAction == 2"
            v-for="(item, i) in clockInOverList"
            :key="i + 'b'"
            class="habitClockItem"
            @click="clockItemClick(item)"
          >
            <div>
              <span>每日阅读</span>
              <span>已结束</span>
            </div>
            <p>已进行1天，已坚持打卡1天</p>
            <p></p>
            <div>
              <p>排行榜</p>
              <p></p>
              <p>打卡统计</p>
            </div>
          </div>
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
    // 打卡item
    clockItemClick(item) {
        console.log(item)
        this.$router.push({
          path: "/habitClockInInfo"
        })
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
}

/* List */
.habitClockItem {
  background-color: blanchedalmond;
  margin: 0.5rem 0;
}
</style>