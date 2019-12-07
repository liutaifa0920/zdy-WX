<template>
  <div class="notice">
    <van-nav-bar
      class="topNavBar"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <ul class="noticeList">
      <li
        class="noticeListItem"
        v-for="(item,i) in noticeList"
        :key="i"
        @click="noticeItemClick(item)"
      >
        <div class="noticeListItemTime">
          <span>{{item.add_time.split(" ")[0].substr(5)}}</span>
        </div>
        <div class="noticeListItemCon">
          <p
            class="noticeListItemConTit"
          >{{item.title.length > 14 ? (item.title.substr(0, 14) + "..."):item.title}}</p>
          <div
            v-if="item.img != ''"
            class="noticeListItemConImg"
            :style="currentType == 2 ? 'height: 8rem;' : 'display: none;'"
          >
            <img :src="item.img" :alt="item.title" />
          </div>
          <div
            v-if="currentType == 1 || currentType == 4"
            class="noticeListItemConCon"
            :style="item.img == '' || currentType == 4 ? 'height: 8rem;':'height: 3.5rem;'"
          >{{item.content}}</div>
          <p class="noticeListItemConMore" v-if="currentType == 1 || currentType == 4">查看详情</p>
          <p class="noticeListItemConMore" v-if="currentType == 2">{{item.name}}老师上传</p>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import { msgClassNotice, msgNotice, msgScore } from "@/api/api";
export default {
  data() {
    return {
      currentType: null,
      title: "",
      noticeList: []
    };
  },
  mounted() {
    this.queryNoticeType();
  },
  methods: {
    // 获取消息类型
    queryNoticeType() {
      console.log(this.$route.query.noticeType);
      this.currentType = this.$route.query.noticeType;
      if (this.currentType == 1) {
        this.title = "公告";
      } else if (this.currentType == 2) {
        this.title = "成绩";
      } else if (this.currentType == 3) {
        this.title = "心理测评";
      } else if (this.currentType == 4) {
        this.title = "班级通知";
      }
      if (this.currentType == 1) {
        this.queryNoticeList();
      } else if (this.currentType == 2) {
        this.queryScore();
      } else if (this.currentType == 4) {
        this.queryClassNoticeList();
      }
    },
    // 获取公告列表
    queryNoticeList() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      msgNotice(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.noticeList = res.data.notice;
        }
      });
    },
    // 获取班级通知列表
    queryClassNoticeList() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      msgClassNotice(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.noticeList = res.data.notice;
        }
      });
    },
    // 获取成绩列表
    queryScore() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      msgScore(data).then(res => {
        console.log(res.data.score);
        if (res.code == 200) {
          this.title = res.data.student_name + "的成绩";
          this.noticeList = res.data.score;
        }
      });
    },
    // 消息点击
    noticeItemClick(item) {
      if (this.currentType == 1 || this.currentType == 4) {
        // console.log(item.notice_id);
        this.$router.push({
          path: "/noticeInfo",
          query: {
            noticeType: this.currentType,
            noticeID: item.notice_id
          }
        });
      } else if (this.currentType == 2) {
        // console.log(item.score_id);
        this.$router.push({
          path: "/noticeInfo",
          query: {
            noticeType: this.currentType,
            noticeID: item.score_id
          }
        });
      }
    },
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
.notice {
  background-color: #f7f7f7 !important;
  height: 100vh !important;
  overflow-y: scroll;
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
  margin-bottom: 1rem;
}

/* List */
.noticeList {
}
.noticeListItem {
  width: 91.7vw;
  margin: 0 auto;
}
.noticeListItemTime {
  width: 100%;
  color: white;
}
.noticeListItemTime > span {
  background-color: #777777;
  padding: 0.2rem 1rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
}
.noticeListItemCon {
  position: relative;
  height: 13rem;
  box-shadow: 0 0 0.2rem rgb(216, 216, 216);
  border-radius: 0.3rem;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  margin: 1rem 0;
  overflow: hidden;
}
.noticeListItemConTit {
  text-align: left;
  font-size: 1rem;
}
.noticeListItemConImg {
  width: 100%;
  height: 4rem;
  margin-top: 0.5rem;
}
.noticeListItemConImg > img {
  width: 100%;
  height: 100%;
}
.noticeListItemConCon {
  font-size: 0.9rem;
  text-align: left;
  margin-top: 0.5rem;
  border-bottom: 1px solid #ebebeb;
  overflow: hidden;
}
.noticeListItemConMore {
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  width: 100%;
  font-size: 0.9rem;
  padding-right: 1rem;
  box-sizing: border-box;
  text-align: right;
  color: #999;
}
</style>