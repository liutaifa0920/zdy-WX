<template>
  <div class="msg">
    <!-- <van-nav-bar class="msgTopNav" title="消息" left-text right-text />
    <div class="msgTopBlock"></div>-->
    <ul class="msgList">
      <li
        class="msgListItem"
        v-for="(item, i) in msgListInfo"
        :key="i"
        @click="linkToItem(item.type)"
      >
        <div class="msgListItemLeft">
          <img v-if="item.type == 1" src="../../assets/imgs/msg/msgNotice.png" :alt="item.title" />
          <img v-if="item.type == 2" src="../../assets/imgs/msg/msgList.png" :alt="item.title" />
          <img
            v-if="item.type == 3"
            src="../../assets/imgs/msg/msgPsychology.png"
            :alt="item.title"
          />
          <img
            v-if="item.type == 4"
            src="../../assets/imgs/msg/msgClassNotice.png"
            :alt="item.title.length > 15 ? (item.title.substr(0, 15) + '...'): item.title"
          />
          <div class="msgListItemLeftRight">
            <p>{{item.title.length > 15 ? (item.title.substr(0, 15) + "..."): item.title}}</p>
            <p>{{"消息简介"}}</p>
          </div>
        </div>
        <div class="msgListItemRight">{{item.update_time.split(" ")[0].substr(5)}}</div>
      </li>
    </ul>
    <div class="msgBottomBlock"></div>
  </div>
</template>
<script>
import { msgIndex } from "@/api/api";
export default {
  data() {
    return {
      msgListInfo: []
    };
  },
  created() {
    this.queryMsgListInfo();
  },
  compoted: {},
  methods: {
    // 请求消息列表
    queryMsgListInfo() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      msgIndex(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.msgListInfo = res.data;
        }
      });
    },
    // itemClick
    linkToItem(t) {
      console.log(t);
      this.$router.push({
        path: "/noticeList",
        query: {
          noticeType: t
        }
      });
    }
  }
};
</script>

<style scoped>
.msg {
  background-color: #fafafa;
  height: 100vh;
}
p {
  margin: 0 !important;
}

/* top */
.msgTopNav {
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  left: 0;
}
.msgTopBlock {
  width: 100%;
  height: 3rem;
}
.msgList {
  width: 100%;
}
.msgListItem {
  width: 100%;
  height: 4rem;
  background-color: white;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  /* background-color: rgb(55, 175, 135); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
}
.msgListItemLeft {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.msgListItemLeft > img {
  width: 1.5rem;
  margin: 0 1rem 0 0.5rem;
}
.msgListItemLeftRight {
  height: 3rem;
}
.msgListItemLeftRight > p {
  text-align: left;
}
.msgListItemLeftRight > p:nth-child(1) {
  font-size: 1rem;
  color: #333333;
  height: 1rem;
  line-height: 1rem;
  margin: 0.55rem 0 !important;
}
.msgListItemLeftRight > p:nth-child(2) {
  font-size: 0.9rem;
  height: 0.9rem;
  line-height: 0.9rem;
  color: #999999;
}
.msgListItemRight {
  font-size: 0.9rem;
  color: #666666;
}

.msgBottomBlock {
  width: 100%;
  height: 3rem;
}
</style>