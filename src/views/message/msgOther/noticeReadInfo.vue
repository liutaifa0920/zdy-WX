<template>
  <div class="readInfo">
    <van-nav-bar class="topNavBar" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="topBlock"></div>
    <van-tabs swipeable animated>
      <van-tab
        v-for="(item, i) in titleName"
        :key="i + 'a'"
        :title="item + '(' + allList[i].length + ')'"
      >
        <van-grid :border="false" :column-num="5">
          <van-grid-item v-for="(items, index) in allList[i]" :key="index + 'b'">
            <van-image v-if="items.img[0] != '#'" :src="items.img" />
            <div
              v-if="items.img[0] == '#'"
              class="itemIcon"
              :style="'background-color: '+items.img+';'"
            >{{items.name[0]}}</div>
            <p class="itemName">{{items.name == ''? '...':items.name}}</p>
          </van-grid-item>
          <van-grid-item
            class="bottomItemBlock"
            style="height: 1px;"
            v-for="(items, index) in 10"
            :key="index + 'c'"
          ></van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { msgShowPeople } from "@/api/api";
export default {
  data() {
    return {
      noticeID: null,
      actionType: 0,
      allList: [
        [
          {
            img: ""
          }
        ],
        [
          {
            img: ""
          }
        ]
      ],
      readList: [],
      notReadList: [],
      titleName: ["未读", "已读"]
    };
  },
  mounted() {
    this.queryParams();
  },
  methods: {
    //   获取参数
    queryParams() {
      //   console.log(this.$route.query.noticeID);
      this.noticeID = this.$route.query.noticeID;
      this.queryShowPeople();
    },
    // 请求已读未读列表
    queryShowPeople() {
      let data = {
        ni: this.noticeID,
        v: sessionStorage.getItem("v")
      };
      msgShowPeople(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          let tempArr = [];
          this.readList = res.data.read;
          this.notReadList = res.data.not_read;
          tempArr.push(res.data.not_read);
          tempArr.push(res.data.read);
          this.allList = tempArr;
          console.log(this.allList);
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.readInfo .van-tabs__line {
  width: 50vw !important;
  background-color: #1989fa !important;
}
.readInfo .van-grid {
  height: calc(100vh - 6rem);
  overflow-y: scroll;
  justify-content: space-around !important;
}
.readInfo .van-grid-item__content {
  height: 9rem !important;
}
.readInfo .bottomItemBlock .van-grid-item__content {
  height: 1px !important;
  padding: 0 !important;
}
.readInfo .van-image {
  width: 3.6rem !important;
  height: 3.6rem !important;
}
.readInfo .van-image__img {
  border-radius: 50% !important;
  padding: 0 !important;
  width: 3.6rem !important;
  height: 3.6rem !important;
}
</style>

<style scoped>
p {
  margin: 0 !important;
}
.readInfo {
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

/* list */
.itemIcon {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background-color: #1989fa;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.itemName {
  width: 3.6rem;
  height: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>