<template>
  <div class="homeWorklistInfo">
    <van-nav-bar
      class="topNavBar"
      title="作业详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <div class="clockInfoMain">
      <div class="clockInfoTit">
        <span>{{clockInInfoTop.title}}({{weeksList[new Date(clockInInfoTop.add_time).getDay()]}})</span>
      </div>
      <p
        class="clockInfoTimeName"
      >{{clockInInfoTop.add_time.substr(0, 16)}} {{clockInInfoTop.send_name}}老师</p>
    </div>
    <div class="clockInfoCon" :style="contentIsOpen?'height: 8rem !important':''">
      <p>{{contentIsOpen ? clockInInfoTop.content : clockInInfoTop.content.substr(0,13)+ "..."}}</p>
      <div v-show="!contentIsOpen" @click="contentIsOpen = true">
        详情
        <img src="~@/assets/imgs/home/habitClock/2爱向下.png" alt />
      </div>
      <div v-show="contentIsOpen" @click="contentIsOpen = false">
        详情
        <img src="~@/assets/imgs/home/habitClock/2爱向上.png" alt />
      </div>
    </div>
    <div class="garyBlock"></div>
    <div v-if="clockInInfo.length != 0" class="clockInStatisticsToclass" @click="toClassClockInSta">
      <p>已查看{{clockInInfoTop.read_num}}人，未查看{{clockInInfoTop.no_read_num}}人</p>
      <p>></p>
    </div>
    <div class="clockInRecord">反馈情况</div>
    <van-tabs v-model="tabActive" swipeable animated>
      <van-tab :title="'已提交'+ clockInInfoTop.comment_list.one +'人'">
        <!-- 单条动态 -->
        <div
          v-show="clockInInfo.length != 0"
          class="clockInfoList"
          v-for="(item, i) in clockInInfo"
          :key="i"
        >
          <div class="clockInfoListItem">
            <div class="clockInfoListItemLeft">
              <img
                v-if="item.head_img[0] != '' && item.head_img[0] != '#'"
                :src="item.head_img"
                alt
              />
              <div
                class="clockInfoListItemLeftIcon"
                :style="'background-color: '+ item.head_img +';'"
                v-if="item.head_img[0] == '#'"
              >{{item.parent_name.substr(item.parent_name.length - 2)}}</div>
              <div class="clockInfoListItemTopRight">
                <p>{{item.parent_name}}</p>
                <p>{{item.add_time}} 已坚持{{100}}天</p>
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
              <p class="reviseClickName" @click="moreReviseClockInBtn(item)">修改</p>
            </div>
          </div>
          <div class="clockInfoListItemCon">
            <!-- 内容 -->
            <p>{{item.content}}</p>
            <!-- 录音 -->
            <div
              v-show="item.voice_url.length > 0"
              v-for="(items, index) in item.voice_url"
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
            <div class="IVList" v-if="item.video_url">
              <div
                v-show="itemIV != ''"
                class="IVListItem"
                v-for="(itemIV, index) in strToArr(item.video_url)"
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
                v-for="(itemIV, index) in item.image_url.split(',')"
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
                v-if="!item.isLike"
                @click="isLikeClick(1, item, i)"
                src="~@/assets/imgs/home/habitClock/no_good.png"
                alt="未点赞"
              />
              <img
                v-if="item.isLike"
                @click="isLikeClick(2, item, i)"
                src="~@/assets/imgs/home/habitClock/is_good.png"
                alt="已点赞"
              />
              <!-- <p>{{item.fabulousList.length == 0 ? '':item.fabulousList.length}}</p> -->
            </div>
            <img
              @click="itemReportClick(1, item)"
              src="~@/assets/imgs/home/habitClock/is_report.png"
              alt="评论"
            />
          </div>
          <!-- 回复区 -->
          <div class="clockInfoListItemReport">
            <!-- 点赞区 -->
            <div
              v-show="item.fabulousList.length != 0"
              class="clockInfoListItemReportTop"
              :style="item.fabulousList.length == 0 ? 'border: 0px !important;': ''"
            >
              <img src="~@/assets/imgs/home/habitClock/no_good.png" alt="点赞" />
              <p>
                <span
                  v-for="(fabulousListItem, fabulousListItemI) in item.fabulousList"
                  :key="fabulousListItemI"
                >{{fabulousListItem.name}} {{(fabulousListItemI + 1) != item.fabulousList.length ? ',': ''}}</span>
              </p>
            </div>
            <!-- 评论内容 -->
            <div v-show="item.comment_list.length != 0" class="clockInfoListItemReportBot">
              <div class="clockInfoListItemReportBotLeft">
                <img src="~@/assets/imgs/home/habitClock/is_report.png" alt="评论" />
              </div>
              <div class="clockInfoListItemReportBotRig">
                <p
                  v-for="(items ,index) in item.comment_list"
                  :key="index"
                  @click="itemReportClick(2, item, items, i, index)"
                  @touchstart="copyReplyStart"
                  @touchend="copyReplyEnd(i, index)"
                >
                  <span class="replyBlock"></span>
                  <span v-if="items.receiverId == 0" class="isName">{{items.commentator}}:</span>
                  <span v-if="items.receiverId == 0" class="isContent">{{items.content}}</span>
                  <span v-if="items.receiverId != 0" class="isName">{{items.commentator}}</span>
                  <span v-if="items.receiverId != 0" style="padding-right: .2rem;">回复</span>
                  <span v-if="items.receiverId != 0" class="isName">{{items.receiver}}:</span>
                  <span v-if="items.receiverId != 0" class="isContent">{{items.content}}</span>
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
      </van-tab>
      <van-tab :title="'未提交'+ clockInInfoTop.comment_list.two +'人'">
        <div class="noSubmitList">
          <p
            class="noSubmitListItem"
            v-for="(noSubmitItem, noSubmitItemI) in clockInInfoTop.comment_list.two_comment"
            :key="noSubmitItemI"
          >{{noSubmitItemI + 1}}、 {{noSubmitItem.name}}</p>
        </div>
      </van-tab>
      <van-tab :title="'优秀作业'+ clockInInfoTop.comment_list.three +'人'">内容 3</van-tab>
    </van-tabs>

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
  homeWorkReadTaskNew,
  homeWorkComment,
  homeWorkDelComment,
  homeWorkFabulous,
  homeWorkDelSubmit
} from "@/api/api";
import { Toast, ImagePreview } from "vant";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      contentIsOpen: false,
      weeksList: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      tabActive: 0,
      // --------------------------------
      si: "",
      ti: "",
      dt: "",
      clockInInfoTop: {
        title: "",
        content: "",
        add_time: "",
        comment_list: {
          one: "",
          two: "",
          three: ""
        }
      },
      clockInInfo: [
        //已提交的用户集合
        {
          id: "",
          userid: "",
          head_img: "", //头像
          parent_name: "", //名称
          content: "", //提交内容
          mp3: "", //音频
          video: "", //视频
          img: "", //图片
          add_time: "",
          fabulous_num: 0, //点赞数
          fabulous_name: "", //点赞人名称（已逗号拼接）
          fabulousList: [
            {
              id: "",
              name: ""
            }
          ],
          comment_list: [
            //评论列表
            {
              comment_id: "",
              comment_user_name: "",
              comment_content: ""
            }
          ]
        }
      ],
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
      touchingTime: 0,
      uploadShow: false
    };
  },
  computed: {
    strToArr(v) {
      return function(v) {
        console.log(v);
        return v.split();
      };
    }
  },
  mounted() {
    this.si = sessionStorage.getItem("si");
    this.ui = sessionStorage.getItem("ui");
    this.queryHi();
  },
  methods: {
    // 全局监听
    listenClick(e) {
      console.log(e.target.className);
      console.log(this.currentDeleClick);
      if (this.clockInInfo[this.currentDeleClick].deleBoxFlag) {
        if (
          e.target.className != "deleClickName" &&
          e.target.className != "deleClickImg"
        ) {
          this.clockInInfo[this.currentDeleClick].deleBoxFlag = false;
          window.removeEventListener("click", this.listenClick);
          this.$forceUpdate();
          e.stopPropagation();
        }
      }
    },
    // 获取习惯ID
    queryHi() {
      this.ti = this.$route.query.id;
      this.queryInfo();
    },
    // 请求页面数据
    queryInfo() {
      this.uploadShow = true;
      let data = {
        ti: this.ti,
        si: sessionStorage.getItem("si"),
        ci: sessionStorage.getItem("ci"),
        ui: sessionStorage.getItem("ui"),
        v: sessionStorage.getItem("v")
      };
      homeWorkReadTaskNew(data).then(res => {
        if (res.code == 200) {
          console.log(res.data);
          this.clockInInfoTop = res.data;
          if (res.data.comment_list.one_comment.length != 0) {
            res.data.comment_list.one_comment.map((e, i) => {
              res.data.comment_list.one_comment[i].deleBoxFlag = false;
            });
            this.clockInInfo = res.data.comment_list.one_comment;
            console.log(this.clockInInfo);
            // ------------------------------------------------------------------
            this.clockInInfo.map(e => {
              if (e.voice_url != "") {
                console.log(12345789);
                e.voice_url = e.voice_url.split(",").map(item => {
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
                e.voice_url = [];
              }
            });
            console.log(this.clockInInfo);
            this.$nextTick(() => {
              this.indexArr = [];
              if (this.$refs.audioRoot) {
                this.clockInInfo.map((e, i) => {
                  e.voice_url.map((item, index) => {
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
                    this.clockInInfo[this.indexArr[i].B].voice_url[
                      this.indexArr[i].S
                    ].duration = m + ":" + s;
                  };
                });
                setTimeout(() => {
                  this.$refs.audioRoot.map((e, i) => {
                    this.$refs.audioRoot[i].currentTime = 0;
                  });
                }, 60);
              }
              this.$forceUpdate();
            });
            // console.log(this.clockInInfo);
            // ----------------------------------------
            this.clockInInfo.map((e, i) => {
              e.fabulousList.map(likeItem => {
                if (likeItem.id == this.ui) {
                  e.isLike = true;
                } else {
                  e.isLike = false;
                }
              });
              if (e.comment_list.length != 0) {
                e.comment_list.map((item, index) => {
                  item.deleReplyBox = false;
                  item.copyReplyBox = false;
                });
              }
            });
            this.$forceUpdate();
          } else {
            this.clockInInfo = [];
          }

          console.log(this.clockInInfo);
          this.isGooding = true;
          this.uploadShow = false;
        }
      });
    },
    // 跳转历史打卡页面
    linkToHistory(item) {
      console.log(item);
      if (!this.clockInInfo[this.currentDeleClick].deleBoxFlag) {
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
        this.clockInInfo[this.currentDeleClick].deleBoxFlag = false;
        window.removeEventListener("click", this.listenClick);
      }
    },
    // 删除打卡
    moreDeleClockInBox(i) {
      window.addEventListener("click", this.listenClick);
      this.clockInInfo.map((e, i) => {
        this.clockInInfo[i].deleBoxFlag = false;
      });
      this.clockInInfo[i].deleBoxFlag = true;
      this.currentDeleClick = i;
      this.$forceUpdate();
    },
    // 删除作业
    moreDeleClockInBtn(item) {
      console.log(item.id);
      let data = {
        si: item.id,
        v: sessionStorage.getItem("v")
      };
      homeWorkDelSubmit(data).then(res => {
        if (res.code == 200) {
          Toast("删除成功");
          window.removeEventListener("click", this.listenClick);
          this.queryInfo();
        } else {
          Toast(res.msg);
        }
      });
    },
    // 修改作业
    moreReviseClockInBtn(item) {
      console.log(item.id);
      this.$router.push({
        path: "/homeWorkIsSubmit",
        query: {
          homeWorkID: item.id
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
      this.clockInInfo.map((e, B) => {
        e.voice_url.map((item, S) => {
          this.clockInInfo[B].voice_url[S].status = true;
        });
      });
      this.$refs.audioRoot.map((e, i) => {
        this.$refs.audioRoot[i].pause();
      });
      this.clockInInfo[B].voice_url[S].status = false;
      this.findCurrentPlay(B, S);
      this.$refs.audioRoot[this.currentPlayIndex].play();
    },
    // 暂停
    recorderPause(Sitem, B, S) {
      this.clockInInfo[B].voice_url[S].status = true;
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
      this.clockInInfo.map((e, B) => {
        e.voice_url.map((item, S) => {
          this.clockInInfo[B].voice_url[S].status = true;
        });
      });
      let durationTime = this.$refs.audioRoot[this.currentPlayIndex].duration;
      this.$refs.audioRoot[this.currentPlayIndex].currentTime =
        (value / 100) * durationTime;
      this.$refs.audioRoot[this.currentPlayIndex].play();
      this.clockInInfo[this.indexArr[this.currentPlayIndex].B].voice_url[
        this.indexArr[this.currentPlayIndex].S
      ].status = false;
    },
    // 音频播放进度更新
    audioTimeUpdate(B, S) {
      this.findCurrentPlay(B, S);
      let currentTime = this.$refs.audioRoot[this.currentPlayIndex].currentTime;
      let durationTime = this.$refs.audioRoot[this.currentPlayIndex].duration;
      this.clockInInfo[B].voice_url[S].value =
        (currentTime / durationTime) * 100;
      if (currentTime == durationTime) {
        this.clockInInfo[B].voice_url[S].status = true;
        this.clockInInfo[B].voice_url[S].value = 0;
        this.$refs.audioRoot[this.currentPlayIndex].pause();
      }
    },
    // 图片预览
    IVListImgCLick(B, S) {
      let arr = this.clockInInfo[B].image_url.split(",");
      ImagePreview({
        images: arr,
        startPosition: S
      });
    },
    // 视频预览
    IVListVideoCLick(B, S) {
      this.videoShow = true;
      this.videoShowData = this.clockInInfo[B].video_url.split(",")[S];
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
          sd: item.id,
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          ss: t,
          v: sessionStorage.getItem("v")
        };
        homeWorkFabulous(data).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.clockInInfo.map(e => {
              e.voice_url = e.voice_url.map(() => {
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
        this.clockInInfo.map(e => {
          e.comment_list.map(item => {
            item.copyReplyBox = false;
          });
        });
        this.clockInInfo[B].comment_list[S].copyReplyBox = true;
        this.$forceUpdate();
        this.touchingTime = 0;
        window.addEventListener("click", this.copyReplyBoxListen);
      }
    },
    // 评论click
    itemReportClick(t, Bitem, Sitem, B, S) {
      console.log(Bitem);
      console.log(Sitem);
      this.replyType = t;
      if (this.replyType == 1) {
        this.replyClockID = Bitem.id;
        this.replyRci = Bitem.userid;
        this.replyRsi = Bitem.student_id;
      } else {
        this.replyClockID = Bitem.id;
        this.replyRci = Sitem.commentatorId;
        this.replyRsi = Sitem.commentatorStudentId;
      }
      if (
        this.replyRci != sessionStorage.getItem("ui") * 1 ||
        this.replyType == 1
      ) {
        this.isReporting = true;
        this.$nextTick(() => {
          this.$refs.reportInput.focus();
        });
      } else {
        this.clockInInfo.map(e => {
          e.comment_list.map(item => {
            item.deleReplyBox = false;
          });
        });
        this.clockInInfo[B].comment_list[S].deleReplyBox = true;
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
        this.clockInInfo.map(e => {
          e.comment_list.map(item => {
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
        this.clockInInfo.map(e => {
          e.comment_list.map(item => {
            item.copyReplyBox = false;
          });
        });
        this.$forceUpdate();
        window.removeEventListener("click", this.copyReplyBoxListen);
      }
    },
    // 复制评论
    setCopyReply(S) {
      this.clockInInfo.map(e => {
        e.comment_list.map(item => {
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
        // sid: this.replyClockID,
        cti: Sitem.commentId,
        v: sessionStorage.getItem("v")
      };
      homeWorkDelComment(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.clockInInfo.map(e => {
            e.voice_url = e.voice_url.map(() => {
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
          ti: this.clockInInfoTop.task_id,
          si: this.replyClockID,
          ui: this.replyRci,
          sti: this.replyRsi,
          ci: sessionStorage.getItem("ci"),
          cui: sessionStorage.getItem("ui"),
          csi: sessionStorage.getItem("si"),
          cct: this.itemReport,
          v: sessionStorage.getItem("v")
        };
      } else {
        data = {
          ti: this.clockInInfoTop.task_id,
          si: this.replyClockID,
          ui: this.replyRci,
          sti: this.replyRsi,
          ci: sessionStorage.getItem("ci"),
          cui: sessionStorage.getItem("ui"),
          csi: sessionStorage.getItem("si"),
          cct: this.itemReport,
          v: sessionStorage.getItem("v")
        };
      }
      homeWorkComment(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.itemReport = "";
          this.isReporting = false;
          this.clockInInfo.map(e => {
            e.voice_url = e.voice_url.map(() => {
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
    calendarTouchMove(e) {
      // console.log(e);
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
      this.queryAllInfo();
    }
  }
};
</script>
<style>
.homeWorklistInfo .van-tab {
  padding: 0 !important;
  color: #999999;
}
.homeWorklistInfo .van-tabs__wrap {
  margin-left: 0.5rem;
  width: 70vw;
  overflow: unset !important;
}
.homeWorklistInfo .van-tab--active {
  color: #38b48b !important;
}
.homeWorklistInfo .van-tabs__line {
  width: 4.5rem !important;
  background-color: #38b48b;
}
.homeWorklistInfo .van-tab__pane {
  /* padding: 0.8rem 1rem; */
  min-height: calc(100vh - 23rem);
}
.homeWorklistInfo .van-ellipsis {
  overflow: unset !important;
  text-overflow: unset !important;
}
/* van-tab--active */
</style>
<style scoped>
p {
  margin: 0 !important;
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
.homeWorklistInfo {
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
  /* height: 2rem; */
  border-radius: 0.2rem;
}
.moreDeleClockInBtn > p {
  width: 4.5rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
}
.reviseClickName {
  border-top: 1px solid #666;
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
}
.uploadWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.clockInfoMain {
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  padding: 0.8rem;
  background: url(~@/assets/imgs/home/homeWork/homework_top_bg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.clockInfoTit {
  position: absolute;
  left: 0.8rem;
  bottom: 2.3rem;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.966);
  letter-spacing: 1px;
}
.clockInfoTimeName {
  position: absolute;
  left: 0.8rem;
  bottom: 0.7rem;
  font-size: 0.9rem;
  color: #999999;
}
.clockInfoCon {
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
.clockInfoCon > p:nth-child(1) {
  font-size: 1rem;
}
.clockInfoCon > div {
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
.clockInfoCon img {
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.4rem;
}
.noSubmitList {
  padding: 0 1rem;
  box-sizing: border-box;
  width: 100%;
}
.noSubmitListItem {
  height: 3rem;
  font-size: 1rem;
  line-height: 3rem;
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;
}
.noSubmitListItem:last-child {
  border: 0 !important;
}
.bottomBlock {
  height: 1rem;
  width: 100%;
}
</style>