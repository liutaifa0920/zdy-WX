<template>
  <div class="noticeInfo">
    <van-nav-bar class="topNavBar" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="topBlock"></div>
    <!-- 公告 班级通知模板 -->
    <div v-if="currnetType != 2" class="noticeInfoTitleBox">
      <div class="noticeInfoTitleBottom">
        <p
          class="noticeInfoTitle"
        >{{queryInfo.title.length > 10 ? (queryInfo.title.substr(0, 10) + "..."):queryInfo.title}}</p>
        <div class="noticeInfoMidBox">
          <div class="noticeInfoMidNameTime">
            <p>{{queryInfo.send_name}}&#x3000;{{queryInfo.add_time}}</p>
          </div>
          <div v-if="currnetType == 1" class="noticeInfoMidOrRead">
            <span @click="toLinkAbout">未读 : {{not_readNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <p v-if="currnetType != 2" class="noticeInfoScope">接收范围 : {{receiveRange}}</p>
    <div v-if="currnetType != 2" class="noticeInfoContent">
      <p>{{queryInfo.content}}</p>
      <div>
        <van-grid square :border="false" :column-num="3">
          <van-grid-item
            v-for="(item, i) in contentImg"
            :key="i + 'a'"
            @click="noticeInfoConImgClick(i)"
          >
            <van-image
              width="29vw"
              height="24vw"
              class="noticeInfoContentImg"
              fit="cover"
              :src="item"
            />
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- 成绩模板 -->
    <div v-if="currnetType == 2" class="score">
      <div class="scoreTitle">{{scoreInfo.title}}</div>
      <p class="scoreTime">
        <span>{{scoreInfo.add_time}}</span>
        <span>{{scoreInfo.teacher_name}}老师上传</span>
      </p>
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="(item, i) in scoreItem" :key="i + 'a'">
          <div class="scoreItem">
            <p>{{item.course_name}}</p>
            <p>{{item.score}}</p>
          </div>
        </van-grid-item>
      </van-grid>
      <div class="scoreBottom">总分: {{scoreInfo.total_score}}</div>
    </div>
  </div>
</template>

<script>
import { msgClassNoticeDetail, msgReadNotice, msgReadScore } from "@/api/api";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      noticeID: null,
      currnetType: null,
      queryInfo: {
        title: ""
      },
      receiveRange: null,
      not_readNum: "",
      receiveRange: "",
      contentImg: null,

      // score
      scoreInfo: {},
      scoreItem: null
    };
  },
  created() {
    this.queryParams();
  },
  methods: {
    // 班级通知详情
    queryClassNoticeInfo() {
      let data = {
        ci: sessionStorage.getItem("ci"),
        ui: sessionStorage.getItem("ui"),
        ni: this.noticeID,
        v: sessionStorage.getItem("v")
      };
      msgClassNoticeDetail(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.queryInfo = res.data;
          this.not_readNum = res.data.not_read.length;
          this.receiveRange = res.data.receive_range.join(", ");
          if (res.data.img != "") {
            this.contentImg = res.data.img.split(",");
          }
        }
      });
    },
    // 公告详情
    queryReadNoticeInfo() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        ni: this.noticeID,
        v: sessionStorage.getItem("v")
      };
      msgReadNotice(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.queryInfo = res.data.notice;
          this.not_readNum = res.data.not_num;
          if (res.data.notice.img != "") {
            this.contentImg = res.data.notice.img.split(",");
          }
          this.receiveRange = res.data.part_name.join(", ");
        }
      });
    },
    // 成绩详情
    queryReadScore() {
      let data = {
        sci: this.noticeID,
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      msgReadScore(data).then(res => {
        // console.log(res.data);
        if (res.code == 200) {
          this.scoreInfo = res.data.score_info;
          this.scoreItem = res.data.score;
        }
      });
    },
    // 获取传值
    queryParams() {
      this.currnetType = this.$route.query.noticeType;
      this.noticeID = this.$route.query.noticeID;
      console.log(this.currnetType);
      console.log(this.noticeID);
      if (this.currnetType == 1) {
        this.queryReadNoticeInfo();
      } else if (this.currnetType == 2) {
        this.queryReadScore();
      } else if (this.currnetType == 4) {
        this.queryClassNoticeInfo();
      }
    },
    toLinkAbout() {
      this.$router.push({
        path: "/noticeReadInfo",
        query:{
          noticeID: this.noticeID
        }
      });
    },
    noticeInfoConImgClick(i) {
      ImagePreview({
        images: this.contentImg,
        startPosition: i,
        onClose() {
          // do something
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.noticeInfo {
  /* padding: 0 0.8rem 0; */
  background-color: white;
}
p {
  margin: 0 !important;
  text-align: left;
}
.van-grid-item__content {
  padding: 0 !important;
}

/* allTop */
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

/* notice classNotice */
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
.noticeInfoTitleBox {
  width: 100%;
  height: 22vh;
  position: relative;
  background: url(~@/assets/imgs/msg/msgNoticeTitle.png) no-repeat;
  background-size: 100% 100%;
  padding: 0 0.8rem 0;
  padding-top: 9vh;
  box-sizing: border-box;
}
.noticeInfoTitleBottom {
  position: absolute;
  width: calc(100% - 1.6rem);
  height: 3.3rem;
  left: 0.8rem;
  bottom: 0.8rem;
}
.noticeInfoTitle {
  position: relative;
  width: 100%;
  font-size: 1.4rem;
  box-sizing: border-box;
  color: white;
}
.noticeInfoMidBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.noticeInfoMidNameTime {
  color: #999999;
  /* padding-top: 0rem; */
  font-size: 0.8rem;
  line-height: 1.7rem;
}
.noticeInfoMidOrRead {
  /* padding-top: 0.9rem; */
  font-size: 0.8rem;
  color: rgb(67, 175, 238) !important;
  line-height: 1.7rem;
}
.noticeInfoScope {
  width: 100%;
  overflow: hidden;
  background-color: #fafafa;
  text-overflow: ellipsis;
  color: #999999;
  font-size: 0.8rem;
  padding: 0.6rem 0.8rem;
  box-sizing: border-box;
}
.noticeInfoScope span {
  display: inline-block;
  margin-right: 0.8rem;
  padding: 0rem 0.2rem;
  /* border: 1px solid #bbb; */
  border-radius: 0.2rem;
}
.noticeInfoMidRecall {
  color: #0097fd;
  font-size: 1rem;
  position: absolute;
  right: 0rem;
  top: 0.6rem;
}
/* .noticeInfoMidOrRead > span:nth-child(1) {
  padding-right: 1rem;
} */
.noticeInfoContent {
  width: 100%;
  padding: 1rem 0.8rem 5.5rem;
  font-size: 1rem;
  letter-spacing: 0.02rem;
  box-sizing: border-box;
}

/* score */
/* top */
.scoreTitle {
  margin: 0.5rem 0;
  font-size: 1rem;
  padding: 0 1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  box-sizing: border-box;
}
/* time */
.scoreTime {
  text-align: center;
  font-size: 0.9rem;
  color: #999999;
}
.scoreTime > span {
  display: inline-block;
  margin: 0 0.5rem;
}
/* scoreLite */
.scoreItem {
  background: url(~@/assets/imgs/msg/msgScoreItem.png) no-repeat;
  background-size: 100% 100%;
  width: 75%;
  height: 6rem;
  color: #666666;
  border-radius: 0.4rem;
  position: relative;
}
.scoreItem > p:nth-child(1) {
  width: 100%;
  padding: 0 0.5rem;
  box-sizing: border-box;
  margin-top: 0.6rem !important;
  font-size: 0.8rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.scoreItem > p:nth-child(2) {
  font-weight: 600;
  font-size: 1.2rem;
  text-align: right;
  position: absolute;
  right: 0.5rem;
  bottom: 0.6rem;
  width: 100%;
}
/* bottom */
.scoreBottom {
  margin: 0.5rem 0 3rem;
  font-size: 1rem;
  padding: 0 1rem;
  font-weight: 600;
  box-sizing: border-box;
  color: #666666;
}
</style>
