<template>
  <div class="clockInStatistics">
    <van-nav-bar
      class="topNavBar"
      title="打卡统计"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <!-- <div class="topCalendar">
      <el-calendar>
        <template slot="dateCell" slot-scope="{date, data}">
          <div
            @click="clickDate(data)"
            :class="'topCalendarItem'+(data.isSelected && (new Date().getTime() >= new Date(data.day).getTime()) ? ' is-selected' : ' is-close')"
          >
            <p>
              {{new Date(data.day).getDay() == 0?'日':''}}
              {{new Date(data.day).getDay() == 1?'一':''}}
              {{new Date(data.day).getDay() == 2?'二':''}}
              {{new Date(data.day).getDay() == 3?'三':''}}
              {{new Date(data.day).getDay() == 4?'四':''}}
              {{new Date(data.day).getDay() == 5?'五':''}}
              {{new Date(data.day).getDay() == 6?'六':''}}
            </p>
            <p>{{ data.day.split('-').slice(1).join('-') }}</p>
            <div class="isClockIn">
              <img
                v-if="new Date().getTime() >= new Date(data.day).getTime()"
                src="~@/assets/imgs/home/habitClock/statisticsTop.png"
              />
            </div>
          </div>
        </template>
      </el-calendar>
    </div>-->
    <!----------------------------------- 日历 -------------------------------->
    <div
      ref="topCalendar"
      class="topCalendar"
      @touchmove="calendarTouchMove"
      @touchstart="calendarTouchStart"
      @touchend="calendarTouchEnd"
    >
      <div
        class="topCalendarItem"
        @click="clickDate(item.date, i, item)"
        :class="(calendarListClickDate == item.date) && (new Date(dt).getTime() >= calendarStartDate) && (new Date(dt).getTime() < calendarEndDate) ? 'calendarIsClick' : ''"
        :style="(new Date(dt).getTime()) >= new Date(item.date).getTime()
         && 
         (new Date(dt).getTime()) < (new Date(item.date).getTime() + 86400000)
          && 
          ((new Date(item.date).getTime() >= calendarStartDate) && (new Date(item.date).getTime() < calendarEndDate)) ? 'background-color: #38b48b50 !important;': ''"
        v-for="(item, i) in calendarList"
        :key="i"
      >
        <p
          :class="((new Date(item.date).getTime() >= calendarStartDate) && (new Date(item.date).getTime() < calendarEndDate)) ?'':'calendarIsNo'"
          class="calendarweekName"
        >{{item.weekName}}</p>
        <p
          :class="((new Date(item.date).getTime() >= calendarStartDate) && (new Date(item.date).getTime() < calendarEndDate)) ?'':'calendarIsNo'"
          class="calendarDate"
        >{{item.date.split('-').slice(1).join('/')}}</p>
        <div
          :class="((new Date(item.date).getTime() >= calendarStartDate) && (new Date(item.date).getTime() < calendarEndDate)) ?'':'calendarIsNo'"
          v-if="item.clockInType == 1"
          class="calendarType"
        >
          <img src="~@/assets/imgs/home/habitClock/statisticsTop.png" />
        </div>
        <div
          :class="((new Date(item.date).getTime()+28800000 > calendarStartDate) && (new Date(item.date).getTime()+28800000 < calendarEndDate)) ?'':'calendarIsNo'"
          v-if="item.clockInType == 2"
          class="calendarType"
        >
          <div style="height: 1px; width: .6rem;background-color: #aaaaaa;margin: 1rem auto 0;"></div>
        </div>
        <div
          :class="((new Date(item.date).getTime()+28800000 > calendarStartDate) && (new Date(item.date).getTime()+28800000 < calendarEndDate)) ?'':'calendarIsNo'"
          v-if="item.clockInType == 3"
          class="calendarType"
        >
          <div style="height: 1px; width: .6rem;background-color: #aaaaaa;margin: 1rem auto 0;"></div>
        </div>
        <div
          :class="((new Date(item.date).getTime()+28800000 > calendarStartDate) && (new Date(item.date).getTime()+28800000 < calendarEndDate)) ?'':'calendarIsNo'"
          v-if="item.clockInType == 4"
          class="calendarType"
        >
          <div style="height: 1px; width: .6rem;background-color: #aaaaaa;margin: 1rem auto 0;"></div>
        </div>
      </div>
    </div>
    <!-- ------------------------------------------------------------------- -->
    <div class="clockIn">
      <div
        class="clockInItem is-green"
        v-if="currentBtnType == 2 && !noClockInBtn"
        @click="toClockIn"
      >去打卡</div>
      <!-- <div class="clockInItem is-gary" v-if="clockInInfo.is_clock_today == 0">未打卡</div> -->
      <div class="clockInItem is-gary" v-if="currentBtnType == 1">已打卡</div>
      <div class="clockInItem is-gary" v-if="noClockInBtn && currentBtnType == 2">未打卡</div>
      <p v-if="currentBtnType == 3" style="font-size: .9rem;color: #38b48b;">今日无需打卡</p>
    </div>
    <div class="garyBlock"></div>
    <div v-if="clockInInfo.clock_log_data.length == 0" class="noContent">没有打卡动态哦~</div>
    <div
      v-if="clockInInfo.clock_log_data.length != 0"
      class="clockInStatisticsToclass"
      @click="toClassClockInSta"
    >
      <p>班级打卡{{clockInInfo.clock_num}}人，未打卡{{clockInInfo.no_clock_num}}人</p>
      <p>></p>
    </div>
    <div v-if="clockInInfo.clock_log_data.length != 0" class="clockInRecord">打卡记录</div>
    <!-- 单条动态 -->
    <div
      v-show="clockInInfo.clock_log_data.length != 0"
      class="clockInfoList"
      v-for="(item, i) in clockInInfo.clock_log_data"
      :key="i"
    >
      <div class="clockInfoListItem">
        <div @click="linkToHistory(item)" class="clockInfoListItemLeft">
          <img v-if="item.img != ''" :src="item.img" alt />
          <div
            class="clockInfoListItemLeftIcon"
            v-if="item.img == ''"
          >{{item.name.substr(item.name.length - 2)}}</div>
          <div class="clockInfoListItemTopRight">
            <p>{{item.name + item.relation}}</p>
            <p>{{item.clock_date}} 已坚持{{item.clock_num}}天</p>
          </div>
        </div>
        <img
          class="deleClickImg"
          @click="moreDeleClockInBox(i)"
          src="~@/assets/imgs/home/habitClock/更多.png"
          alt
        />
        <div v-show="item.deleBoxFlag" class="moreDeleClockInBtn">
          <p class="deleClickName" @click="moreDeleClockInBtn(item)">删除</p>
        </div>
      </div>
      <div class="clockInfoListItemCon">
        <!-- 内容 -->
        <p @click="linkToHistory(item)">{{item.content}}</p>
        <!-- 录音 -->
        <div v-for="(items, index) in item.voice_path" :key="index+'audio'" class="recordPlayList">
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
      <div class="clockInfoListItemBtn">
        <div class="clockInfoListItemIsGood">
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
      <div class="clockInfoListItemReport">
        <!-- 点赞区 -->
        <div
          v-show="item.like_data.like_user != ''"
          class="clockInfoListItemReportTop"
          :style="item.comment_data.length == 0 ? 'border: 0px !important;': ''"
        >
          <img src="~@/assets/imgs/home/habitClock/no_good.png" alt="点赞" />
          <p>{{item.like_data.like_user}}</p>
        </div>
        <!-- 评论内容 -->
        <div v-show="item.comment_data.length != 0" class="clockInfoListItemReportBot">
          <div class="clockInfoListItemReportBotLeft">
            <img src="~@/assets/imgs/home/habitClock/is_report.png" alt="评论" />
          </div>
          <div class="clockInfoListItemReportBotRig">
            <p
              v-for="(items ,index) in item.comment_data"
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

    <!-- 视频弹窗 -->
    <van-overlay :show="videoShow" @click="videoShow = false">
      <div class="wrapper">
        <video autoplay ref="videoShow" :src="videoShowData"></video>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {
  homeHabitClockStatistics,
  homeHabitDelClock,
  homeHabitIsLike,
  homeHabitAddComment,
  homeHabitDelComment,
  homeHabitWeekClock
} from "@/api/api";
import { Toast, ImagePreview } from "vant";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      weekNameList: ["日", "一", "二", "三", "四", "五", "六"],
      calendarList: [],
      calendarListClickDate: "no",
      calendarIsTouch: false,
      calendarNum: null,
      calendarNumBefore: null,
      startDate: "",
      endDate: "",
      startDateResult: "",
      endDateResult: "",
      touchStartX: "",
      touchEndX: "",
      calendarStartDate: "",
      calendarEndDate: "",
      // --------------------------------
      hi: "",
      dt: "",
      clockInInfo: {
        clock_log_data: [
          {
            img: "",
            name: "",
            relation: "",
            clock_date: "",
            clock_num: 3,
            img_path: "",
            video_path: "",
            voice_path: "",
            content: "",
            like_data: {
              is_like: 0,
              like_num: 0,
              like_user: ""
            },
            comment_data: [
              {
                comment_id: 1, //评论id
                content: "", //评论内容
                commnet_user: {
                  //评论人Info
                  userid: "",
                  student_id: "",
                  name: ""
                },
                to_user: {
                  //被回复人
                  userid: 0,
                  receiver_student_id: 0,
                  name: ""
                }
              }
            ]
          }
        ],
        clock_num: 2,
        is_clock_today: 1,
        no_clock_num: 1
      },
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
      noClockInBtn: false,
      currentBtnType: "",
      // 删除自己评论
      deleReplyBox: false,
      touchingTimer: null,
      touchingTime: 0
    };
  },
  mounted() {
    this.queryHi();
  },
  methods: {
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
    queryHi() {
      // console.log(this.$route.query.hi);
      this.hi = this.$route.query.hi;
      this.calendarNum = 0;
      this.queryNowDate();
      this.calendarListCreate();
      this.queryInfo();
    },
    // 获取当前日期
    queryNowDate() {
      this.dt =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      // console.log(this.dt);
    },
    // 请求页面数据
    queryInfo() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        hi: this.hi,
        dt: this.dt,
        v: sessionStorage.getItem("v")
      };
      // let data = {
      //   ui: 30001089,
      //   si: 21004058,
      //   hi: this.hi,
      //   dt: this.dt,
      //   v: sessionStorage.getItem("v")
      // };
      homeHabitClockStatistics(data).then(res => {
        if (res.code == 200) {
          console.log(res.data.statis);
          res.data.statis.clock_log_data.map((e, i) => {
            res.data.statis.clock_log_data[i].deleBoxFlag = false;
          });
          this.clockInInfo = res.data.statis;
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
                // console.log(tempObj);
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
              // console.log(this.indexArr);
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
                  // console.log(m + ":" + s);
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
          // console.log(this.clockInInfo);
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
        }
      });
    },
    // 日期点击
    clickDate(date, i, item) {
      this.dt = date;
      console.log(this.calendarStartDate);
      console.log(new Date(this.dt).getTime());
      console.log(this.calendarEndDate);

      console.log(new Date(this.dt).getTime() >= this.calendarStartDate);
      console.log(new Date(this.dt).getTime() < this.calendarEndDate);
      if (
        new Date(this.dt).getTime() >= this.calendarStartDate &&
        new Date(this.dt).getTime() < this.calendarEndDate
      ) {
        this.calendarListClickDate = date;
        if (new Date(date).getTime() + 86400000 < new Date().getTime()) {
          this.noClockInBtn = true;
        } else {
          this.noClockInBtn = false;
        }
        this.queryInfo();
      }
      console.log(item.clockInType);
      this.currentBtnType = item.clockInType;
    },
    // 跳转历史打卡页面
    linkToHistory(item) {
      console.log(item);
      if (!this.clockInInfo.clock_log_data[this.currentDeleClick].deleBoxFlag) {
        this.$router.push({
          path: "/historyClockIn",
          query: {
            hi: this.hi,
            name: item.name,
            ui: item.userid,
            si: item.student_id
          }
        });
      } else {
        this.clockInInfo.clock_log_data[
          this.currentDeleClick
        ].deleBoxFlag = false;
        window.removeEventListener("click", this.listenClick);
      }
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
                return {};
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
      if (this.replyType == 1) {
        this.replyClockID = Bitem.clock_id;
        this.replyRci = Bitem.userid;
        this.replyRsi = Bitem.student_id;
      } else {
        this.replyClockID = Bitem.clock_id;
        this.replyRci = Sitem.userid;
        this.replyRsi = Sitem.student_id;
      }
      if (this.replyRsi != sessionStorage.getItem("si") * 1) {
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
              return {};
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
              return {};
            });
          });
          this.queryInfo();
        } else {
          Toast(res.msg);
        }
      });
    },
    calendarTouchMove(e) {
      // console.log(e);
    },
    // 日历列表-------------------------------------------------------
    calendarListCreate() {
      this.startDate = new Date();
      this.startDate.setTime(this.startDate.getTime() - 6 * 86400000);
      this.endDate = new Date();
      this.endDate.setTime(this.endDate.getTime());
      // console.log(this.startDate);
      // console.log(this.endDate);
    },
    // 日历按下
    calendarTouchStart(e) {
      this.calendarNumBefore = this.calendarNum;
      this.touchStartX = e.changedTouches[0].clientX;
      // console.log(e.changedTouches[0].clientX);
    },
    // 日历抬起
    calendarTouchEnd(e) {
      // console.log(e.changedTouches[0].clientX);
      this.calendarNumBefore = this.calendarNum;
      this.touchEndX = e.changedTouches[0].clientX;
      if (this.touchStartX - this.touchEndX >= 100) {
        this.calendarNum++;
      } else if (this.touchStartX - this.touchEndX < -100) {
        this.calendarNum--;
      }
      // console.log(this.calendarNum);
    },
    // 去打卡
    toClockIn() {
      this.$router.push({
        path: "/clockIn",
        query: {
          hi: this.hi
        }
      });
    },
    // linkTo 班级打卡统计
    toClassClockInSta() {
      this.$router.push({
        path: "/classClockInStatistics",
        query: {
          hi: this.hi,
          dt: this.dt
        }
      });
    },
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  watch: {
    calendarNum() {
      if (this.calendarNum < this.calendarNumBefore) {
        this.startDate.setTime(this.startDate.getTime() - 7 * 86400000);
        this.endDate.setTime(this.endDate.getTime() - 7 * 86400000);
      } else if (this.calendarNum == 0) {
        this.startDate = new Date();
        this.startDate.setTime(this.startDate.getTime() - 6 * 86400000);
        this.endDate = new Date();
        this.endDate.setTime(this.endDate.getTime());
      } else {
        this.startDate.setTime(this.startDate.getTime() + 7 * 86400000);
        this.endDate.setTime(this.endDate.getTime() + 7 * 86400000);
      }
      this.startDateResult =
        this.startDate.getFullYear() +
        "-" +
        (this.startDate.getMonth() + 1) +
        "-" +
        this.startDate.getDate();
      this.endDateResult =
        this.endDate.getFullYear() +
        "-" +
        (this.endDate.getMonth() + 1) +
        "-" +
        this.endDate.getDate();
      // console.log(this.startDate);
      // console.log(this.endDate);
      // console.log(this.startDateResult);
      // console.log(this.endDateResult);
      let tempCalendarList = new Date();
      this.calendarList = [];
      for (let i = 0; i < 7; i++) {
        if (i == 0) {
          tempCalendarList.setTime(this.startDate.getTime());
          // console.log(tempCalendarList);
        } else {
          tempCalendarList.setTime(tempCalendarList.getTime() + 1 * 86400000);
          // console.log(tempCalendarList);
        }
        // console.log(tempCalendarList);
        let tempObj = {
          date:
            tempCalendarList.getFullYear() +
            "-" +
            (tempCalendarList.getMonth() + 1) +
            "-" +
            tempCalendarList.getDate(),
          weekName: this.weekNameList[tempCalendarList.getDay()],
          clockInType: ""
        };
        this.calendarList.push(tempObj);
      }
      // console.log(this.calendarList);
      let data = {
        hi: this.hi,
        si: sessionStorage.getItem("si"),
        sd: this.startDateResult,
        ed: this.endDateResult,
        v: sessionStorage.getItem("v")
      };
      // let data = {
      //   hi: this.hi,
      //   si: 21004058,
      //   sd: this.startDateResult,
      //   ed: this.endDateResult,
      //   v: sessionStorage.getItem("v")
      // };
      homeHabitWeekClock(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.calendarStartDate = new Date(
            res.data.start_date.split(" ")[0]
          ).getTime();
          this.calendarEndDate = new Date(res.data.end_date).getTime();
          console.log(this.calendarStartDate);
          console.log(this.calendarEndDate);
          console.log(res.data.start_date);
          console.log(res.data.end_date);
          this.calendarList.map((e, i) => {
            if (res.data.clock_date.clock.indexOf(e.date) != -1) {
              e.clockInType = 1;
            } else if (res.data.clock_date.no_clock.indexOf(e.date) != -1) {
              e.clockInType = 2;
            } else if (res.data.no_clock_date.indexOf(e.date) != -1) {
              e.clockInType = 3;
            } else {
              e.clockInType = 4;
            }
          });
          if (res.data.no_clock_date.indexOf(this.endDateResult) != -1) {
            this.currentBtnType = 3;
          } else if (
            res.data.clock_date.clock.indexOf(this.endDateResult) != -1
          ) {
            this.currentBtnType = 1;
          } else if (
            res.data.clock_date.no_clock.indexOf(this.endDateResult) != -1
          ) {
            this.currentBtnType = 2;
          }
          console.log(this.calendarList);
        }
      });
    }
  }
};
</script>
<style>
.clockInStatistics .el-calendar-table .el-calendar-day {
  padding: 0 !important;
}
.clockInStatistics .is-today {
  color: #333333 !important;
}
.clockInStatistics .el-calendar__header {
  display: none;
}
.clockInStatistics .el-calendar-table > thead {
  display: none;
}
.clockInStatistics .el-calendar__body {
  padding: 0 !important;
}
.clockInStatistics .el-calendar-table tr,
.clockInStatistics .el-calendar-table td {
  border: none !important;
  border-bottom: 1px solid #e0e0e0 !important;
}
.clockInStatistics .el-calendar-table tbody {
  display: flex !important;
}
.clockInStatistics .el-calendar-day {
  width: 14vw !important;
  height: 5rem !important;
}
.clockInStatistics .el-calendar-table__row .prev {
  width: 14vw !important;
  height: 5rem !important;
}
</style>
<style scoped>
p {
  margin: 0 !important;
}
.clockInStatistics {
  background-color: white;
}
.is-selected {
  background-color: #38b48b50;
  color: #333333;
}
.is-close {
  background-color: white;
  color: #999999;
}

/* calendar */
.topCalendar {
  width: 100vw;
  height: 2.8rem;
  display: flex;
  border-bottom: 1px solid #e0e0e0 !important;
  color: #999999;
}
.topCalendarItem {
  width: 14.25%;
  height: 2.8rem;
  padding-top: 0.4rem;
  box-sizing: border-box;
}
.calendarweekName {
  margin-bottom: 0.4rem !important;
}
.calendarDate {
  margin-bottom: 0.4rem !important;
}
.calendarType > img {
  width: 1rem;
}
.calendarIsClick {
  background-color: #38b48b20;
}
.calendarIsNo {
  color: #ececec !important;
}
.calendarIsNo > div {
  background-color: #ececec !important;
}
/* top */
.clockInStatistics {
  background-color: white;
  height: 100vh;
}
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
.topCalendar {
  widows: 100vw;
  height: 5.1rem;
  overflow-x: scroll;
}
.topCalendar::-webkit-scrollbar {
  display: none;
}
.topCalendarItem {
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
  padding-top: 0.5rem;
  box-sizing: border-box;
  text-align: center;
}
.isClockIn {
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
}
.isClockIn > img {
  width: 1rem;
}

/* clockInBtn */
.clockIn {
  width: 100vw;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.clockInItem {
  color: white;
  width: 9.2rem;
  font-size: 1rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
}
.is-green {
  background-color: #38b48b;
}
.is-gary {
  background-color: #e2e2e2;
}

/* block */
.garyBlock {
  width: 100vw;
  height: 0.8rem;
  background-color: #f4f4f4;
}
.noContent {
  width: 100%;
  height: calc(100% - 13.2rem);
  background-color: white;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

/* linkToclassClockInfo */
.clockInStatisticsToclass {
  padding: 0.8rem 1rem;
  box-sizing: border-box;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* clockInRecord */
.clockInRecord {
  width: 100vw;
  height: 2.8rem;
  font-weight: 600;
  font-size: 1rem;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #f4f4f4;
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
  position: relative;
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
/* ---------------------------------------------------------------------------------- */
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
.clockInfoListItemCon > p {
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: 1rem !important;
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
  position: relative;
}
.clockInfoListItemReportTop::after {
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
/* .clockInfoListItemReportBotRig {
} */

.clockInfoListItemReportBotRig > p {
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
</style>