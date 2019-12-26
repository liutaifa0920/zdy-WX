<template>
  <div class="history">
    <van-nav-bar
      class="topNavBar"
      title="打卡详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>

    <van-pull-refresh v-model="isLoadingUpload" @refresh="onRefresh">
      <div class="historyMain">
        <div class="historyTit">
          <span>{{clockInInfo.habit_info.title}}</span>
          <!-- <div class="historyTitRight">
          <span>打卡设置</span>
          <img src="~@/assets/imgs/home/habitClock/向下.png" alt />
          </div>-->
        </div>
        <p class="historyTimeName">{{clockInInfo.habit_info.add_time}}</p>
        <p
          class="historyTimeName"
        >{{clockInInfo.habit_info.class_name+" "+ clockInInfo.habit_info.teacher_name+"老师"}}</p>
        <p class="historyInfo">
          <span>剩余：{{clockInInfo.habit_info.remain_days}}天</span>
          <span>频次：{{clockInInfo.habit_info.sign_frequency}}</span>
        </p>
      </div>
      <div class="historyCon" :style="contentIsOpen?'height: 8rem !important':''">
        <p>{{contentIsOpen ? clockInInfo.habit_info.content : clockInInfo.habit_info.content.substr(0,10)}}</p>
        <div v-show="!contentIsOpen" @click="contentIsOpen = true">
          详情
          <img src="~@/assets/imgs/home/habitClock/2爱向下.png" alt />
        </div>
        <div v-show="contentIsOpen" @click="contentIsOpen = false">
          详情
          <img src="~@/assets/imgs/home/habitClock/2爱向上.png" alt />
        </div>
      </div>
      <!-- List -->
      <div class="historyListTit">{{clockInName}}的历史打卡日记</div>
      <!-- 单条动态 -->
      <div class="historyList" v-for="(item, i) in clockInInfo.clock_log_data" :key="i">
        <div class="historyListItem">
          <div class="historyListItemLeft">
            <img v-if="item.img != ''" :src="item.img" alt />
            <div
              class="clockInfoListItemLeftIcon"
              v-if="item.img == ''"
            >{{item.name.substr(item.name.length - 2)}}</div>
            <div class="historyListItemTopRight">
              <p>{{item.name + item.relation}}</p>
              <p>{{item.clock_date}} 已坚持{{item.clock_num}}天</p>
            </div>
          </div>
          <img
            v-show="si == item.student_id"
            class="deleClickImg"
            @click="moreDeleClockInBox(i)"
            src="~@/assets/imgs/home/habitClock/更多.png"
            alt
          />
          <div v-show="item.deleBoxFlag" class="moreDeleClockInBtn">
            <p class="deleClickName" @click="moreDeleClockInBtn(item)">删除</p>
          </div>
        </div>
        <div class="historyListItemCon">
          <!-- 内容 -->
          <p>{{item.content}}</p>
          <!-- 录音 -->
          <div
            v-for="(items, index) in item.voice_path"
            :key="index+'audio'"
            class="recordPlayList"
          >
            <audio ref="audioRoot" @timeupdate="audioTimeUpdate(i, index)" :src="items.file"></audio>
            <img
              v-if="items.status"
              @click="recorderPlay(items, i, index)"
              src="~@/assets/imgs/home/habitClock/playB.png"
            />
            <img
              v-if="!items.status"
              @click="recorderPause(items, i, index)"
              src="~@/assets/imgs/home/habitClock/pauseB.png"
            />
            <van-slider
              v-model="items.value"
              :max="100"
              :min="0"
              bar-height="4px"
              style="width:55%;"
              active-color="#99CCFF"
              inactive-color="#E5E5E5"
              @change="audioSliderChange(items.value, i, index)"
              @drag-start="audioDragS(i, index)"
            >
              <div slot="button" class="adiouButton" @click="audioSliderBtnClick(i, index)"></div>
            </van-slider>
            <p>{{ "0" + Math.floor(Math.floor((items.duration[1]*60 + items.duration.split(":")[1]*1) * items.value/100)/60)+ ":"+ (Math.floor(Math.floor((items.duration[1]*60 + items.duration.split(":")[1]*1) * items.value/100)%60) >= 10?Math.floor(Math.floor((items.duration[1]*60 + items.duration.split(":")[1]*1) * items.value/100)%60):("0"+Math.floor(Math.floor((items.duration[1]*60 + items.duration.split(":")[1]*1) * items.value/100)%60))) + "/" + items.duration}}</p>
          </div>
          <!-- 图片 / 视频 -->
          <div class="IVList">
            <div
              v-show="itemIV != ''"
              class="IVListItem"
              v-for="(itemIV, index) in item.video_path.split(',')"
              :key="index + 'video'"
              @click="IVListVideoCLick(i, index)"
            >
              <video :src="itemIV"></video>
              <img
                style="position: absolute;top: 0;right: 0;left: 0;bottom: 0;margin: auto;width: 2rem;height:2rem;background-color: transparent;"
                src="~@/assets/imgs/home/habitClock/item播放.png"
                alt
              />
            </div>
            <div
              v-show="itemIV != ''"
              class="IVListItem"
              v-for="(itemIV, index) in item.img_path.split(',')"
              :key="index + 'img'"
              @click="IVListImgCLick(i, index)"
            >
              <img :src="itemIV" alt />
            </div>
            <div
              class="IVListItem"
              style="margin-bottom: 0;height: 0px;"
              v-for="(itemIV, index) in 3"
              :key="index + 'block'"
            ></div>
          </div>
        </div>
        <!-- 按钮行 -->
        <div class="historyListItemBtn">
          <div class="historyListItemIsGood">
            <img
              v-if="item.like_data.is_like == 0"
              @click="isLikeClick(1, item, i)"
              src="~@/assets/imgs/home/habitClock/no_good.png"
              alt="未点赞"
            />
            <img
              v-if="item.like_data.is_like == 1"
              @click="isLikeClick(0, item, i)"
              src="~@/assets/imgs/home/habitClock/is_good.png"
              alt="已点赞"
            />
            <p>{{item.like_data.like_num == 0 ? '':item.like_data.like_num}}</p>
          </div>
          <img
            @click="itemReportClick(1, item)"
            src="~@/assets/imgs/home/habitClock/is_report.png"
            alt="评论"
          />
          <!-- <img src="~@/assets/imgs/home/habitClock/is_fenxiang.png" alt="分享" /> -->
        </div>
        <!-- 回复区 -->
        <div class="historyListItemReport">
          <!-- 点赞区 -->
          <div
            v-show="item.like_data.like_user != ''"
            class="historyListItemReportTop"
            :style="item.comment_data.length == 0 ? 'border: 0px !important;': ''"
          >
            <img src="~@/assets/imgs/home/habitClock/no_good.png" alt="点赞" />
            <p>{{item.like_data.like_user}}</p>
          </div>
          <!-- 评论内容 -->
          <div v-show="item.comment_data.length != 0" class="historyListItemReportBot">
            <div class="historyListItemReportBotLeft">
              <img src="~@/assets/imgs/home/habitClock/is_report.png" alt="评论" />
            </div>
            <div class="historyListItemReportBotRig">
              <p
                v-for="(items, index) in item.comment_data"
                :key="index"
                @click="itemReportClick(2, item, items.commnet_user, i, index)"
                @touchstart="copyReplyStart"
                @touchend="copyReplyEnd(i, index)"
              >
                <span class="replyBlock"></span>
                <span v-if="items.to_user.userid == 0" class="isName">{{items.commnet_user.name}}:</span>
                <span v-if="items.to_user.userid == 0" class="isContent">{{items.content}}</span>
                <span v-if="items.to_user.userid != 0" class="isName">{{items.commnet_user.name}}</span>
                <span v-if="items.to_user.userid != 0" style="padding-right: .2rem;">回复</span>
                <span v-if="items.to_user.userid != 0" class="isName">{{items.to_user.name}}:</span>
                <span v-if="items.to_user.userid != 0" class="isContent">{{items.content}}</span>
                <span
                  @click="setDeleReply(item, items)"
                  class="deleReply"
                  v-show="items.deleReplyBox"
                >删除</span>
                <span
                  @click="setCopyReply(index)"
                  :class="'CopyBtn'+ index + ' copybox'"
                  :data-clipboard-text="items.content"
                  v-show="items.copyReplyBox"
                >复制</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomBlock"></div>
      <div v-if="isReporting" class="itemReportBottomBox">
        <input
          class="itemReportInput"
          ref="reportInput"
          type="text"
          @blur="reportInputBlur"
          v-model="itemReport"
        />
        <div class="itemReportOKBtn" @click="setReport">评论</div>
      </div>
    </van-pull-refresh>

    <!-- 视频弹窗 -->
    <van-overlay :show="videoShow" @click="videoShow = false">
      <div class="wrapper">
        <video autoplay ref="videoShow" :src="videoShowData"></video>
      </div>
    </van-overlay>
    <van-overlay :show="uploadShow">
      <div class="uploadWrapper">
        <div>
          <div style="margin-bottom: 1rem;display: flex;justify-content: center;">
            <van-loading color="#38b48b" />
          </div>
          <div style="color: #38b48b;font-size: .9rem;">加载中</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {
  homeHabitMyClockDetail,
  homeHabitDelClock,
  homeHabitIsLike,
  homeHabitAddComment,
  homeHabitDelComment
} from "@/api/api";
import { Toast, ImagePreview } from "vant";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      si: "",
      hi: "",
      clockInName: "",
      lookUi: "",
      lookSi: "",
      clockInInfo: {
        habit_info: {
          title: "",
          content: ""
        }
      },
      contentIsOpen: false,
      currentDeleClick: 0,
      itemReport: "",
      isReporting: false,
      // --------------------------------------------------------
      adiouList: [
        {
          value: 0,
          file: "",
          duration: "",
          status: true
        }
      ],
      indexArr: [],
      currentPlayIndex: 0,
      videoShow: false,
      videoShowData: "",
      replyType: 0,
      replyClockID: 0,
      replyRci: 0,
      replyRsi: 0,
      isGooding: true,
      isLoadingUpload: true,
      // 删除自己评论
      deleReplyBox: false,
      touchingTimer: null,
      touchingTime: 0,
      uploadShow: false
    };
  },
  mounted() {
    this.si = sessionStorage.getItem("si");
    this.queryParam();
    this.queryInfo();
  },
  methods: {
    onRefresh() {
      this.clockInInfo.clock_log_data.map(e => {
        e.voice_path = e.voice_path.map(() => {
          return {};
        });
      });
      this.queryInfo();
    },
    // 全局监听
    listenClick(e) {
      console.log(e.target.className);
      console.log(this.currentDeleClick);
      if (this.clockInInfo.clock_log_data[this.currentDeleClick].deleBoxFlag) {
        if (
          e.target.className != "deleClickName" &&
          e.target.className != "deleClickImg"
        ) {
          this.clockInInfo.clock_log_data[
            this.currentDeleClick
          ].deleBoxFlag = false;
          window.removeEventListener("click", this.listenClick);
          e.stopPropagation();
        }
      }
    },
    // 获取习惯ID
    queryParam() {
      console.log(this.$route.query);
      this.hi = this.$route.query.hi;
      // this.clockInName = this.$route.query.name;
      this.lookUi = this.$route.query.ui;
      this.lookSi = this.$route.query.si;
    },
    queryInfo() {
      this.uploadShow = true;
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        lsi: this.lookSi,
        hi: this.hi,
        v: sessionStorage.getItem("v")
      };
      // let data = {
      //   ui: this.lookUi,
      //   si: this.lookSi,
      //   lui: 30001089,
      //   lsi: 21004058,
      //   hi: this.hi,
      //   v: sessionStorage.getItem("v")
      // };
      homeHabitMyClockDetail(data).then(res => {
        if (res.code == 200) {
          res.data.statis.clock_log_data.map((e, i) => {
            res.data.statis.clock_log_data[i].deleBoxFlag = false;
          });
          this.clockInInfo = res.data.statis;
          console.log(this.clockInInfo);
          this.clockInName = this.clockInInfo.habit_info.student_name;
          // ------------------------------------------------------------------
          this.clockInInfo.clock_log_data.map(e => {
            if (e.voice_path != "") {
              e.voice_path = e.voice_path.split(",").map(item => {
                let tempObj = {
                  value: 0,
                  file: item,
                  duration: "",
                  status: true
                };
                console.log(tempObj);
                return tempObj;
              });
            } else {
              e.voice_path = [];
            }
          });
          console.log(this.clockInInfo);
          this.$nextTick(() => {
            this.indexArr = [];
            if (this.$refs.audioRoot) {
              this.clockInInfo.clock_log_data.map((e, i) => {
                e.voice_path.map((item, index) => {
                  let obj = {
                    B: i,
                    S: index
                  };
                  this.indexArr.push(obj);
                });
              });
              console.log(this.indexArr);
              this.$refs.audioRoot.map((e, i) => {
                this.$refs.audioRoot[i].oncanplay = () => {
                  let time = Math.floor(e.duration);
                  let m =
                    Math.floor(time / 60) >= 10
                      ? Math.floor(time / 60)
                      : "0" + Math.floor(time / 60);
                  let s =
                    Math.floor(time % 60) >= 10
                      ? Math.floor(time % 60)
                      : "0" + Math.floor(time % 60);
                  console.log(m + ":" + s);
                  this.clockInInfo.clock_log_data[
                    this.indexArr[i].B
                  ].voice_path[this.indexArr[i].S].duration = m + ":" + s;
                };
              });
              setTimeout(() => {
                this.$refs.audioRoot.map((e, i) => {
                  this.$refs.audioRoot[i].currentTime = 0;
                });
              }, 60);
            }
          });
          // ----------------------------------------
          this.clockInInfo.clock_log_data.map((e, i) => {
            if (e.comment_data.length != 0) {
              e.comment_data.map((item, index) => {
                item.deleReplyBox = false;
                item.copyReplyBox = false;
              });
            }
          });
          console.log(this.clockInInfo);
          this.isGooding = true;
          this.uploadShow = false;
        }
      });
      this.isLoadingUpload = false;
    },
    // 删除打卡
    moreDeleClockInBox(i) {
      window.addEventListener("click", this.listenClick);
      this.clockInInfo.clock_log_data.map((e, i) => {
        this.clockInInfo.clock_log_data[i].deleBoxFlag = false;
      });
      this.clockInInfo.clock_log_data[i].deleBoxFlag = true;
      this.currentDeleClick = i;
    },
    // 删除打卡
    moreDeleClockInBtn(item) {
      console.log(item.clock_id);
      let data = {
        coi: item.clock_id,
        v: sessionStorage.getItem("v")
      };
      homeHabitDelClock(data).then(res => {
        if (res.code == 200) {
          Toast("删除成功");
          window.removeEventListener("click", this.listenClick);
          this.queryInfo();
        } else {
          Toast(res.msg);
        }
      });
    },
    // 录音*------------------------------------------------
    // findCurrentPlay
    findCurrentPlay(B, S) {
      let currentPlay = {
        B,
        S
      };
      for (let i = 0; i < this.indexArr.length; i++) {
        if (
          this.indexArr[i].B == currentPlay.B &&
          this.indexArr[i].S == currentPlay.S
        ) {
          this.currentPlayIndex = i;
          break;
        }
      }
    },
    // 播放
    recorderPlay(Sitem, B, S) {
      this.clockInInfo.clock_log_data.map((e, B) => {
        e.voice_path.map((item, S) => {
          this.clockInInfo.clock_log_data[B].voice_path[S].status = true;
        });
      });
      this.$refs.audioRoot.map((e, i) => {
        this.$refs.audioRoot[i].pause();
      });
      this.clockInInfo.clock_log_data[B].voice_path[S].status = false;
      this.findCurrentPlay(B, S);
      this.$refs.audioRoot[this.currentPlayIndex].play();
    },
    // 暂停
    recorderPause(Sitem, B, S) {
      this.clockInInfo.clock_log_data[B].voice_path[S].status = true;
      this.findCurrentPlay(B, S);
      this.$refs.audioRoot[this.currentPlayIndex].pause();
    },
    // 进度条开始拖动
    audioDragS(B, S) {
      this.findCurrentPlay(B, S);
      this.$refs.audioRoot[this.currentPlayIndex].pause();
    },
    // 进度条按钮Click
    audioSliderBtnClick(B, S) {
      this.findCurrentPlay(B, S);
    },
    // 进度条change
    audioSliderChange(value, B, S) {
      this.findCurrentPlay(B, S);
      this.$refs.audioRoot.map((e, i) => {
        this.$refs.audioRoot[i].pause();
        // this.$refs.audioRoot[i].currentTime = 0;
      });
      this.clockInInfo.clock_log_data.map((e, B) => {
        e.voice_path.map((item, S) => {
          this.clockInInfo.clock_log_data[B].voice_path[S].status = true;
        });
      });
      let durationTime = this.$refs.audioRoot[this.currentPlayIndex].duration;
      this.$refs.audioRoot[this.currentPlayIndex].currentTime =
        (value / 100) * durationTime;
      this.$refs.audioRoot[this.currentPlayIndex].play();
      this.clockInInfo.clock_log_data[
        this.indexArr[this.currentPlayIndex].B
      ].voice_path[this.indexArr[this.currentPlayIndex].S].status = false;
    },
    // 音频播放进度更新
    audioTimeUpdate(B, S) {
      this.findCurrentPlay(B, S);
      let currentTime = this.$refs.audioRoot[this.currentPlayIndex].currentTime;
      let durationTime = this.$refs.audioRoot[this.currentPlayIndex].duration;
      this.clockInInfo.clock_log_data[B].voice_path[S].value =
        (currentTime / durationTime) * 100;
      if (currentTime == durationTime) {
        this.clockInInfo.clock_log_data[B].voice_path[S].status = true;
        this.clockInInfo.clock_log_data[B].voice_path[S].value = 0;
        this.$refs.audioRoot[this.currentPlayIndex].pause();
      }
    },
    // 图片预览
    IVListImgCLick(B, S) {
      let arr = this.clockInInfo.clock_log_data[B].img_path.split(",");
      ImagePreview({
        images: arr,
        startPosition: S
      });
    },
    // 视频预览
    IVListVideoCLick(B, S) {
      this.videoShow = true;
      this.videoShowData = this.clockInInfo.clock_log_data[B].video_path.split(
        ","
      )[S];
      console.log(this.videoShowData);
      this.$refs.videoShow.currentTime = 0;
    },
    // 点赞
    isLikeClick(t, item, i) {
      console.log(t);
      console.log(item);
      if (this.isGooding) {
        this.isGooding = false;
        let data = {
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          hi: this.hi,
          coi: item.clock_id,
          il: t,
          v: sessionStorage.getItem("v")
        };
        // let data = {
        //   ui: 30001089,
        //   si: 21004058,
        //   hi: this.hi,
        //   coi: item.clock_id,
        //   il: t,
        //   v: sessionStorage.getItem("v")
        // };
        homeHabitIsLike(data).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.clockInInfo.clock_log_data.map(e => {
              e.voice_path = e.voice_path.map(() => {
                let tempObj = {
                  value: 0,
                  file: "",
                  duration: "",
                  status: true
                };
                console.log(tempObj);
                return tempObj;
              });
            });
            this.queryInfo();
            // this.clockInInfo.clock_log_data[i].like_data.is_like = t;
            // if (t == 1) {
            //   this.clockInInfo.clock_log_data[i].like_data.like_num++;
            // } else {
            //   this.clockInInfo.clock_log_data[i].like_data.like_num--;
            // }
          } else {
            Toast(res.msg);
          }
        });
      }
    },
    // 评论tuoch
    copyReplyStart() {
      this.touchingTimer = setInterval(() => {
        this.touchingTime++;
      }, 500);
    },
    copyReplyEnd(B, S) {
      clearInterval(this.touchingTimer);
      if (this.touchingTime >= 1) {
        this.clockInInfo.clock_log_data.map(e => {
          e.comment_data.map(item => {
            item.copyReplyBox = false;
          });
        });
        this.clockInInfo.clock_log_data[B].comment_data[S].copyReplyBox = true;
        this.$forceUpdate();
        this.touchingTime = 0;
        window.addEventListener("click", this.copyReplyBoxListen);
      }
    },
    // 评论click
    itemReportClick(t, Bitem, Sitem, B, S) {
      this.replyType = t;
      console.log(t);
      if (this.replyType == 1) {
        this.replyClockID = Bitem.clock_id;
        this.replyRci = Bitem.userid;
        this.replyRsi = Bitem.student_id;
      } else {
        this.replyClockID = Bitem.clock_id;
        this.replyRci = Sitem.userid;
        this.replyRsi = Sitem.student_id;
      }
      if (
        this.replyRsi != sessionStorage.getItem("si") * 1 ||
        this.replyType == 1
      ) {
        this.isReporting = true;
        this.$nextTick(() => {
          // console.log(this.replyRci);
          // console.log(this.replyRsi);
          // console.log(sessionStorage.getItem("ui"));
          // console.log(sessionStorage.getItem("si"));
          this.$refs.reportInput.focus();
        });
      } else {
        // console.log(Bitem);
        // console.log(Sitem);
        this.clockInInfo.clock_log_data.map(e => {
          e.comment_data.map(item => {
            item.deleReplyBox = false;
          });
        });
        this.clockInInfo.clock_log_data[B].comment_data[S].deleReplyBox = true;
        this.$forceUpdate();
        window.addEventListener("click", this.deleReplyBoxListen);
      }
    },
    // 关闭删除click监听
    deleReplyBoxListen(event) {
      console.log(event.target.className);
      if (
        event.target.className != "replyBlock" &&
        event.target.className != "deleReply"
      ) {
        this.clockInInfo.clock_log_data.map(e => {
          e.comment_data.map(item => {
            item.deleReplyBox = false;
          });
        });
        this.$forceUpdate();
        window.removeEventListener("click", this.deleReplyBoxListen);
      }
    },
    // 关闭删除click监听
    copyReplyBoxListen(event) {
      console.log(event.target.className);
      if (event.target.className.indexOf("CopyBtn") == -1) {
        this.clockInInfo.clock_log_data.map(e => {
          e.comment_data.map(item => {
            item.copyReplyBox = false;
          });
        });
        this.$forceUpdate();
        window.removeEventListener("click", this.copyReplyBoxListen);
      }
    },
    // 复制评论
    setCopyReply(S) {
      this.clockInInfo.clock_log_data.map(e => {
        e.comment_data.map(item => {
          item.deleReplyBox = false;
          item.copyReplyBox = false;
        });
      });
      this.$forceUpdate();
      window.removeEventListener("click", this.copyReplyBoxListen);
      let clipboard = new Clipboard(".CopyBtn" + S);
      clipboard.on("success", e => {
        Toast("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        console.log("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
    // 删除评论
    setDeleReply(Bitem, Sitem) {
      console.log(Bitem);
      console.log(Sitem);
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        cmi: Sitem.comment_id,
        hi: this.hi,
        coi: Bitem.clock_id,
        v: sessionStorage.getItem("v")
      };
      homeHabitDelComment(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.clockInInfo.clock_log_data.map(e => {
            e.voice_path = e.voice_path.map(() => {
              let tempObj = {
                value: 0,
                file: "",
                duration: "",
                status: true
              };
              console.log(tempObj);
              return tempObj;
            });
          });
          this.queryInfo();
          window.removeEventListener("click", this.deleReplyBoxListen);
        }
      });
    },
    // 回复input失去焦点
    reportInputBlur() {
      window.addEventListener("click", this.replyListen);
    },
    // 评论框点击监听
    replyListen(e) {
      if (
        e.target.className != "itemReportOKBtn" &&
        e.target.className != "itemReportInput" &&
        e.target.className != "itemReportBottomBox"
      ) {
        this.isReporting = false;
      }
      window.removeEventListener("click", this.replyListen);
    },
    // 发送评论按钮
    setReport() {
      let data = {};
      if (this.itemReport == "") {
        Toast("评论不能为空");
        return;
      }
      if (this.replyType == 1) {
        data = {
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          rci: 0,
          rsi: 0,
          hi: this.hi,
          coi: this.replyClockID,
          ct: this.itemReport,
          v: sessionStorage.getItem("v")
        };
        // data = {
        //   ui: 30001089,
        //   si: 21004058,
        //   rci: 0,
        //   rsi: 0,
        //   hi: this.hi,
        //   coi: this.replyClockID,
        //   ct: this.itemReport,
        //   v: sessionStorage.getItem("v")
        // };
      } else {
        data = {
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          rci: this.replyRci,
          rsi: this.replyRsi,
          hi: this.hi,
          coi: this.replyClockID,
          ct: this.itemReport,
          v: sessionStorage.getItem("v")
        };
        // data = {
        //   ui: 30001089,
        //   si: 21004058,
        //   rci: this.replyRci,
        //   rsi: this.replyRsi,
        //   hi: this.hi,
        //   coi: this.replyClockID,
        //   ct: this.itemReport,
        //   v: sessionStorage.getItem("v")
        // };
      }
      homeHabitAddComment(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.itemReport = "";
          this.isReporting = false;
          this.clockInInfo.clock_log_data.map(e => {
            e.voice_path = e.voice_path.map(() => {
              let tempObj = {
                value: 0,
                file: "",
                duration: "",
                status: true
              };
              console.log(tempObj);
              return tempObj;
            });
          });
          this.queryInfo();
        } else {
          Toast(res.msg);
        }
      });
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
  text-align: left;
}
.history {
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

.historyMain {
  width: 100vw;
  padding: 0.8rem;
  box-sizing: border-box;
  border-bottom: 1px solid #d3d3d3;
}
.historyTit {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4rem;
}
.historyTit > span:nth-child(1) {
  font-size: 1.1rem;
  color: #000000;
}
.historyTitRight {
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.8rem;
  color: #38b48b;
}
.historyTitRight > img {
  width: 0.8rem;
  height: 0.8rem;
  background-color: #eeeeee;
  margin-left: 0.4rem;
}
.historyTimeName {
  color: #999999;
  font-size: 0.8rem;
}
.historyInfo {
  font-size: 0.9rem;
  margin-top: 0.4rem !important;
}
.historyCon {
  width: 100vw;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 0.8rem;
  box-sizing: border-box;
  position: relative;
}
.historyCon > p:nth-child(1) {
  font-size: 1rem;
}
.historyCon > div {
  font-size: 0.9rem;
  height: 3rem;
  color: #38b48b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0rem;
  right: 0.8rem;
}
.historyCon img {
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.4rem;
}
.historyListTit {
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
  text-align: center;
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
.historyList {
  width: 100vw;
  padding: 0.8rem;
  box-sizing: border-box;
  background-color: white;
}
.historyListItem {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
}
.historyListItem > img {
  padding: 0 0 1rem 1rem;
  width: 1rem;
  height: 0.8rem;
}
.historyListItemLeft {
  display: flex;
  justify-content: left;
}
.historyListItemLeft > img {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  margin-right: 0.8rem;
}
.clockInfoListItemLeftIcon {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  margin-right: 0.8rem;
  color: white;
  font-size: 0.9rem;
  text-align: center;
  line-height: 3.2rem;
  background-color: #38b48b;
}
.moreDeleClockInBtn {
  position: absolute;
  top: 0;
  right: 1.5rem;
  background-color: #434343;
  color: white;
  font-size: 0.9rem;
  width: 4.5rem;
  height: 2rem;
  border-radius: 0.2rem;
}
.moreDeleClockInBtn > p {
  width: 4.5rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
}

/* ------------------------------------------- audioList */

.recordPlayList {
  width: 100%;
  height: 3rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 0.2rem;
  padding-left: 1rem;
  box-sizing: border-box;
  background-color: #f7fbff;
  position: relative;
}
.recordPlayList > img {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 1rem;
}
.adiouButton {
  width: 1rem;
  height: 1rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px #9b9b9b;
  border-radius: 50%;
}
.recordPlayList > p {
  font-size: 0.8rem;
  color: #99ccff;
  margin-left: 1rem !important;
}

/* ------------------------------------------- IVList */
.IVList {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.IVListItem {
  width: 4.5rem;
  height: 4.5rem;
  background-color: #eeeeee;
  margin-bottom: 1rem;
  position: relative;
}
.IVListItem > img {
  width: 4.5rem;
  height: 4.5rem;
  background-color: #eeeeee;
}
.IVListItem > video {
  width: 4.5rem;
  height: 4.5rem;
  background-color: #eeeeee;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.wrapper > video {
  width: 100vw;
  height: 100vh;
}
/* ...................................................... */
.historyListItemTopRight {
  height: 3.2rem;
}
.historyListItemTopRight > p:nth-child(1) {
  font-size: 0.9rem;
  color: #313131;
}
.historyListItemTopRight > p:nth-child(2) {
  font-size: 0.8rem;
  color: #999999;
}
.historyListItemCon {
  padding-left: 4rem;
  font-size: 0.9rem;
}
.historyListItemCon > p {
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: 1rem !important;
}
.historyListItemBtn {
  width: 100%;
  height: 2.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.historyListItemIsGood {
  display: flex;
  align-items: center;
  height: 1rem;
}
.historyListItemIsGood > img {
  width: 1rem;
  margin-right: 0.4rem;
}
.historyListItemIsGood > p {
  height: 0.8rem;
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #999999;
}
.historyListItemBtn > img {
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
}

/* report */
.historyListItemReport {
  background-color: #f5f5f5;
}
.historyListItemReportTop {
  width: 100%;
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}
.historyListItemReportTop::after {
  content: "";
  display: block;
  position: absolute;
  top: -0.8rem;
  left: 1.2rem;
  width: 0px;
  height: 0px;
  border-top: 0.4rem solid rgb(255, 255, 255);
  border-right: 0.4rem solid rgb(255, 255, 255);
  border-left: 0.4rem solid rgb(255, 255, 255);
  border-bottom: 0.4rem solid #f5f5f5;
}
.historyListItemReportTop > img {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
.historyListItemReportTop > p {
  font-size: 0.9rem;
  color: #313131;
}
.historyListItemReportBot {
  width: 100%;
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: flex;
}
/* .historyListItemReportBotLeft {
} */
.historyListItemReportBotLeft > img {
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
}
/* .historyListItemReportBotRig{
} */
.historyListItemReportBotRig > p {
  /* height: 0.9rem; */
  font-size: 0.9rem;
  line-height: 0.9rem;
  margin-bottom: 0.3rem !important;
  position: relative;
}
.replyBlock {
  background-color: rgba(255, 0, 0, 0);
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.deleReply {
  width: 3.8rem;
  box-sizing: border-box;
  background-color: #313131;
  color: white;
  padding: 0.6rem 1rem;
  position: absolute;
  top: -2.5rem;
  right: 0;
  left: 0;
  margin: auto;
  border-radius: 0.3rem;
}
.deleReply::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -1rem;
  right: 0;
  left: 0;
  margin: auto;
  width: 0;
  height: 0;
  border-top: 0.5rem solid #313131;
  border-bottom: 0.5rem solid transparent;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
}
.copybox {
  width: 3.8rem;
  box-sizing: border-box;
  background-color: #313131;
  color: white;
  padding: 0.6rem 1rem;
  position: absolute;
  top: -2.5rem;
  right: 0;
  left: 0;
  margin: auto;
  border-radius: 0.3rem;
}
.copybox::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -1rem;
  right: 0;
  left: 0;
  margin: auto;
  width: 0;
  height: 0;
  border-top: 0.5rem solid #313131;
  border-bottom: 0.5rem solid transparent;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
}
.isName {
  color: #38b48b;
  padding-right: 0.3rem;
  line-height: 1rem;
}
.isContent {
  color: #313131;
  line-height: 1rem;
}

.itemReportBottomBox {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100vw;
  background-color: white;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}
.itemReportBottomBox > input {
  width: calc(100% - 6rem);
  height: 2rem;
  padding: 0 1rem;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  border-radius: 0.2rem;
}
.itemReportOKBtn {
  background-color: #38b48b;
  color: white;
  text-align: center;
  width: 5rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
}
.van-overlay {
  background-color: white !important;
  z-index: 100;
}
.uploadWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>