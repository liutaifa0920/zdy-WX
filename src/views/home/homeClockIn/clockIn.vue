<template>
  <div class="clockIn">
    <van-nav-bar class="topNavBar" left-text="返回" title="打卡" left-arrow @click-left="onClickLeft" />
    <div class="topBlock"></div>
    <div class="clockInTop">
      <p>{{clockInInfo.title}}</p>
      <p>剩余：{{clockInInfo.remain_days}}天 频次：{{clockInInfo.sign_frequency}}</p>
    </div>
    <div class="clockInTopCon">
      <p>{{clockInInfo.content}}</p>
      <p>
        详情
        <img src="~@/assets/imgs/home/habitClock/2爱向下.png" alt />
      </p>
    </div>
    <div class="clockInContent">
      <textarea
        class="clockInContentText"
        v-model="clockConText"
        placeholder="输入你想说的话..."
        type="text"
      />
      <!-- 已完成的录音 -->
      <div v-for="(item, i) in adiouList" :key="i+'audio'" class="recordPlayList">
        <div class="deleAudioBtn" @click="deleAudioBtnClick(i)">×</div>
        <audio ref="audioRoot" @timeupdate="audioTimeUpdate(i)" :src="item.file"></audio>
        <img
          v-if="item.status"
          @click="recorderPlay(item, i)"
          src="~@/assets/imgs/home/habitClock/playB.png"
        />
        <img
          v-if="!item.status"
          @click="recorderPause(item, i)"
          src="~@/assets/imgs/home/habitClock/pauseB.png"
        />
        <van-slider
          v-model="item.value"
          :max="100"
          :min="0"
          bar-height="4px"
          style="width:55vw;"
          active-color="#99CCFF"
          inactive-color="#E5E5E5"
          @change="audioSliderChange"
          @drag-start="audioDragS(i)"
        >
          <div slot="button" class="adiouButton"></div>
        </van-slider>
        <p>{{item.duration}}</p>
      </div>
      <!-- 正在录音 -->
      <p
        v-show="isRecord"
        style="font-size: .8rem;color: #e60012;margin-bottom:.3rem !important;"
      >可录音59秒</p>
      <div v-show="isRecord" class="recordList">
        <div class="recordListLeft">
          <img @click="deleAudio" src="~@/assets/imgs/home/habitClock/错误.png" alt />
          <div class="shu"></div>
          <div class="redBall"></div>
          <p>正在录音 {{recordTime}}</p>
        </div>
        <div class="recordListRight">
          <img
            v-show="!isOverRecord"
            @click="recorderStop"
            src="~@/assets/imgs/home/habitClock/play_stop.png"
            alt
          />
          <p @click="recorderStop">完成</p>
        </div>
      </div>

      <div class="imgVideoList">
        <div class="imgVideoListItem" v-for="(item, i) in imgList" :key="i+'img'">
          <img :src="item.data" @click="imgLook(i)" />
          <div class="imgVideoListItemDele">
            <img src="~@/assets/imgs/home/habitClock/item错误.png" @click="deleItemClick(2, i)" alt />
          </div>
        </div>
        <div class="imgVideoListItem" v-for="(item, i) in videoList" :key="i+'video'">
          <video :src="item.data" @click="videoLook(i)"></video>
          <div class="imgVideoListItemDele">
            <img src="~@/assets/imgs/home/habitClock/item错误.png" @click="deleItemClick(3, i)" alt />
          </div>
        </div>
        <div
          class="imgVideoListItem"
          style="height: 1px;padding: 0; margin: 0;"
          v-for="(item, i) in 3"
          :key="i"
        ></div>
      </div>
      <div class="imgVideoRecordBtn">
        <div class="imgVideoRecordItem" @click="imgVideoPopup">
          <img src="~@/assets/imgs/home/habitClock/tupian.png" alt />
          <div>添加图片/视频</div>
        </div>
        <div class="imgVideoRecordItem" @click="recorderStart">
          <img src="~@/assets/imgs/home/habitClock/yinpin.png" alt />
          <div>添加音频</div>
        </div>
      </div>
    </div>
    <div class="upLoadBtn" @click="clovkInUpload">确定发布</div>
    <van-popup v-model="imgVideoPopupFlag" position="bottom" :style="{ height: '9rem' }">
      <div class="chooseImgOrAdiou" @click="chooseImgClick">
        添加照片
        <input @change="changeImg" ref="chooseImg" type="file" accept="image/*" />
      </div>
      <div class="chooseImgOrAdiou" @click="chooseSetImgClick">
        拍摄照片
        <input
          @change="changeSetImg"
          ref="chooseSetImg"
          type="file"
          accept="image/*"
          capture="camera"
        />
      </div>
      <div class="chooseImgOrAdiou" @click="chooseAdiouClick">
        拍摄视频
        <input
          @change="changeVideo"
          ref="chooseVideo"
          type="file"
          accept="video/*"
          capture="camera"
        />
      </div>
    </van-popup>
    <van-overlay :show="videoShow" @click="videoShow = false">
      <div class="wrapper">
        <video ref="videoShow" :src="videoShowData"></video>
      </div>
    </van-overlay>
    <van-overlay :show="uploadShow">
      <div class="uploadWrapper">
        <div>
          <div style="margin-bottom: 1rem;display: flex;justify-content: center;">
            <van-loading color="#38b48b" />
          </div>
          <div style="color: #38b48b;font-size: .9rem;">发布中</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import wx from "weixin-js-sdk";
import axios from "axios";
import { homeHabitClockDetail } from "@/api/api";
import { signFun } from "../../../utils/sign";
import { Toast } from "vant";
export default {
  data() {
    return {
      hi: "",
      clockInInfo: {},
      accessToken: "",
      noncestr: "",
      signature: "",
      timestamp: "",
      recordID: "",
      serverId: "",
      imgVideoPopupFlag: false,
      isRecord: false,
      isOverRecord: false,
      clockConText: "",
      recordTime: "00:00",
      adiouList: [
        // {
        //   value: 0,
        //   file: "http://wechat.test.sdxxtop.com/wechatMedia/1576553178.mp3",
        //   duration: "00:42"
        // }
      ],
      // audioIsPause: true,
      audioTimer: null,
      audioTime: 0,
      imgList: [],
      videoList: [],
      currentAudioIndex: 0,
      // 进度条
      adiouValue: "",
      videoShow: false,
      videoShowData: "",
      uploadShow: false
    };
  },
  created() {},
  mounted() {
    this.queryHi();
    this.queryInfo();
    this.queryAccessToken();
  },
  destroyed() {},
  computed: {},
  methods: {
    // 获取习惯ID
    queryHi() {
      console.log(this.$route.query.hi);
      this.hi = this.$route.query.hi;
    },
    queryInfo() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        hi: this.hi,
        v: sessionStorage.getItem("v")
      };
      // let data = {
      //   ui: 30001089,
      //   si: 21004058,
      //   hi: this.hi,
      //   v: sessionStorage.getItem("v")
      // };
      homeHabitClockDetail(data).then(res => {
        console.log(res.data.statis);
        if (res.code == 200) {
          this.clockInInfo = res.data.statis.habit_info;
          console.log(this.clockInInfo);
        }
      });
    },
    // 请求wx accessToken
    queryAccessToken() {
      let url = location.href.split("#")[0];
      axios
        .post("http://wechat.sdxxtop.com/parent/wechat/getJsapiSign", {
          url
        })
        .then(res => {
          if (res.data.code == 200) {
            // console.log(res.data.data);
            this.noncestr = res.data.data.noncestr;
            this.timestamp = res.data.data.timestamp;
            this.signature = res.data.data.sign;
            this.accessToken = res.data.data.accessToken;
            this.initRecorder();
          }
        });
    },
    // 初始化录音
    initRecorder() {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wx108e8df5b6b8ace0", // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: this.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.noncestr, // 必填，生成签名的随机串
        signature: this.signature, // 必填，签名，见附录1
        jsApiList: [
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "playVoice",
          "pauseVoice",
          "stopVoice",
          "onVoicePlayEnd",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.checkJsApi({
          jsApiList: [
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "playVoice",
            "pauseVoice",
            "stopVoice",
            "onVoicePlayEnd",
            "uploadVoice",
            "downloadVoice",
            "chooseImage",
            "previewImage",
            "uploadImage",
            "downloadImage"
          ],
          success(res) {
            alert(res);
            alert("可以开始录音");
          }
        });
      });
      wx.error(function() {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    },
    // 录音------------------------------------------
    recorderStart() {
      this.isRecord = true;
      wx.startRecord();
      this.audioTimer = null;
      this.audioTime = 0;
      this.audioTimer = setInterval(() => {
        this.audioTime += 1;
        if (this.audioTime < 60) {
          this.recordTime =
            "00:" +
            (this.audioTime < 10 ? "0" + this.audioTime : this.audioTime);
        } else {
          this.audioTime = 0;
          window.clearInterval(this.audioTimer);
          this.recorderStop();
        }
      }, 1000);
    },
    recorderStop() {
      this.audioTime = 0;
      window.clearInterval(this.audioTimer);
      this.isRecord = false;
      let that = this;
      wx.stopRecord({
        success(res) {
          that.recordID = res.localId;
          wx.uploadVoice({
            localId: that.recordID, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              that.serverId = res.serverId; // 返回音频的服务器端ID
              axios
                .post("http://wechat.sdxxtop.com/parent/wechat/getMediaUrl", {
                  mediaId: that.serverId,
                  mediaType: 1
                })
                .then(res => {
                  if (res.data.code == 200) {
                    console.log(res.data.data.fileUrl);
                    let tempObj = {
                      value: 0,
                      file: res.data.data.fileUrl,
                      duration: that.recordTime,
                      status: true
                    };
                    that.adiouList.push(tempObj);
                    that.recordTime = "00:00";
                  }
                });
            }
          });
        }
      });
    },
    deleAudio() {
      this.isRecord = false;
      this.recordTime = "00:00";
    },
    // 已完成录音播放
    recorderPlay(item, i) {
      console.log(item);
      this.adiouList[i].status = false;
      this.currentAudioIndex = i;
      this.$refs.audioRoot[i].play();
    },
    // 已完成录音暂停
    recorderPause(item, i) {
      console.log(item);
      this.adiouList[i].status = true;
      this.currentAudioIndex = i;
      this.$refs.audioRoot[i].pause();
    },
    // 已完成录音删除
    deleAudioBtnClick(i) {
      this.adiouList.splice(i, 1);
    },
    // 音频时间更新事件
    audioTimeUpdate(i) {
      let durationTime = this.$refs.audioRoot[i].duration;
      let currentTime = this.$refs.audioRoot[i].currentTime;

      if (currentTime < durationTime) {
        this.adiouList[i].value = (currentTime / durationTime) * 100;
      } else {
        this.adiouList[i].value = 0;
        this.$refs.audioRoot[i].currentTime = 0;
        this.adiouList[i].status = true;
        this.$refs.audioRoot[i].pause();
      }
    },
    // 进度条拖动事件
    audioDragS(i) {
      this.$refs.audioRoot[i].pause();
    },
    // audioDragE() {},
    // 进度条change
    audioSliderChange(val) {
      // console.log(val);
      // console.log(this.currentAudioIndex);
      this.adiouList[this.currentAudioIndex].status = false;
      this.$refs.audioRoot[this.currentAudioIndex].currentTime =
        (val / 100) * this.$refs.audioRoot[this.currentAudioIndex].duration;
      this.$refs.audioRoot[this.currentAudioIndex].play();
    },
    // 添加照片 拍照 录像弹窗---------------------------------
    imgVideoPopup() {
      this.imgVideoPopupFlag = true;
    },
    // 选择照片
    chooseImgClick() {
      this.imgVideoPopupFlag = false;
    },
    // 拍摄照片
    chooseSetImgClick() {
      this.imgVideoPopupFlag = false;
    },
    // 拍摄视频
    chooseAdiouClick() {
      this.imgVideoPopupFlag = false;
    },
    // 选择已有照片
    changeImg(e) {
      let that = this;
      let freader = new FileReader();
      console.log(e.target.files[0]);
      freader.readAsDataURL(e.target.files[0]);
      freader.onload = function(event) {
        let tempObj = {
          data: event.target.result,
          file: e.target.files[0]
        };
        that.imgList.push(tempObj);
        console.log(that.$refs.chooseImg);
      };
    },
    // 选择拍摄照片
    changeSetImg(e) {
      let that = this;
      let freader = new FileReader();
      console.log(e.target.files[0]);
      freader.readAsDataURL(e.target.files[0]);
      freader.onload = function(event) {
        let tempObj = {
          data: event.target.result,
          file: e.target.files[0]
        };
        that.imgList.push(tempObj);
      };
    },
    // 选择拍摄视频
    changeVideo(e) {
      let that = this;
      let freader = new FileReader();
      console.log(e.target.files[0]);
      freader.readAsDataURL(e.target.files[0]);
      freader.onload = function(event) {
        let tempObj = {
          data: event.target.result,
          file: e.target.files[0]
        };
        that.videoList.push(tempObj);
      };
    },
    // 图片预览
    imgLook(i) {
      let arr = this.imgList.map(e => {
        return e.data;
      });
      ImagePreview({
        images: arr,
        startPosition: i
      });
    },
    // 视频预览
    videoLook(i) {
      this.videoShow = true;
      this.videoShowData = this.videoList[i].data;
      this.$refs.videoShow.currentTime = 0;
      this.$refs.videoShow.play();
      // console.log(this.$refs.videoShow.currentTime);
    },
    // 删除列表文件
    deleItemClick(type, i) {
      if (type == 1) {
        // 录音
      } else if (type == 2) {
        this.imgList.splice(i, 1);
        // if (this.imgList.length == 0) {
        console.log(this.$refs.imgListRoot);
        // }
      } else if (type == 3) {
        this.videoList.splice(i, 1);
        if (this.videoList.length == 0) {
          console.log(this.$refs.videoListRoot);
        }
      }
    },
    // 发布打卡
    clovkInUpload() {
      console.log("发布打卡");
      this.uploadShow = true;
      let vu = this.adiouList
        .map(e => {
          return e.file;
        })
        .join(",");
      let tempData = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        hi: this.hi,
        ct: this.clockConText,
        vu,
        v: sessionStorage.getItem("v")
      };
      // let tempData = {
      //   ui: 30001089,
      //   si: 21004058,
      //   hi: this.hi,
      //   ct: this.clockConText,
      //   vu,
      //   v: sessionStorage.getItem("v")
      // };
      let sn = signFun(tempData, "9E1613256C1F4815219A633762B53704");

      console.log(sn);
      let fd = new FormData();
      this.imgList.map(e => {
        fd.append("img[]", e.file);
      });
      this.videoList.map(e => {
        fd.append("video[]", e.file);
      });
      fd.append("data", sn);

      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };

      axios
        .post(
          "http://app.sdxxtop.com/parent/habit/wechatSubmitClock",
          fd,
          config
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.uploadShow = false;
            this.$router.go(-1);
          } else {
            Toast(res.data.msg);
            this.uploadShow = false;
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
.clockIn {
  background-color: white;
  position: relative;
}

/* top */
.topNavBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.8rem;
  background-color: white;
}
.topBlock {
  width: 100%;
  height: 2.8rem;
}

.clockInTop {
  width: 100%;
  padding: 0.8rem;
  box-sizing: border-box;
}
.clockInTop > p:nth-child(1) {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.4rem !important;
}
.clockInTop > p:nth-child(2) {
  font-size: 0.9rem;
  color: #999999;
}
.clockInTopCon {
  border-top: 1px solid #d3d3d398;
  border-bottom: 1px solid #d3d3d39a;
  box-sizing: border-box;
  padding: 0 0.8rem;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}
.clockInTopCon > p:nth-child(2) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.clockInTopCon > p:nth-child(2) > img {
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 0.4rem;
}

/* content */
.clockInContent {
  width: 100%;
  padding: 0.8rem;
  box-sizing: border-box;
}
.clockInContentText {
  width: 100%;
  min-height: 7rem;
  box-sizing: border-box;
  color: #313131;
  font-size: 0.9rem;
  border: 0;
}
.clockInContentText::placeholder {
  color: #99999993;
}
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
.deleAudioBtn {
  width: 1rem;
  height: 1rem;
  font-size: 0.5rem;
  line-height: 1.1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  background-color: #e60012;
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
}
/* ------------------ */
.recordList {
  width: 100%;
  height: 3rem;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recordListLeft {
  height: 3rem;
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.recordListLeft > img {
  width: 1.4rem;
  height: 1.4rem;
}
.shu {
  width: 1px;
  height: 1.5rem;
  background-color: #e0e0e0;
}
.redBall {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #e60012;
}
.recordListLeft > p {
  font-size: 0.8rem;
  color: #e60012;
}
.recordListRight {
  width: 30%;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.8rem;
  box-sizing: border-box;
}
.recordListRight > img {
  width: 1.8rem;
  height: 1.8rem;
}
.recordListRight > p {
  color: #313131;
  font-size: 0.9rem;
  margin-left: 0.8rem !important;
}
.imgVideoList {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #e0e0e0;
}
.imgVideoListItem {
  width: 6rem;
  height: 6rem;
  position: relative;
  margin-bottom: 1rem;
}
.imgVideoListItem > img {
  width: 6rem;
  height: 6rem;
  background-color: #eeeeee88;
}
.imgVideoListItem > video {
  width: 6rem;
  height: 6rem;
  background-color: #eeeeee88;
}
.imgVideoListItemDele {
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  background-color: #3f3f3f7c;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.imgVideoListItemDele > img {
  width: 0.8rem;
  height: 0.8rem;
}

.imgVideoRecordBtn {
  width: 100%;
  height: 4.5rem;
  box-sizing: border-box;
  /* padding: 0 0.8rem; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.imgVideoRecordItem {
  width: 6rem;
  height: 4.5rem;
  background-color: #e5e5e5;
  text-align: center;
  margin-right: 0.8rem;
  padding-top: 1rem;
  box-sizing: border-box;
}
.imgVideoRecordItem > img {
  width: 1.5rem;
}
.imgVideoRecordItem > div {
  font-size: 0.8rem;
}
.upLoadBtn {
  height: 3rem;
  width: 90vw;
  margin: 1rem auto;
  text-align: center;
  line-height: 3rem;
  color: white;
  background-color: #38b48b;
  border-radius: 0.3rem;
}

.chooseImgOrAdiou {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
}
.chooseImgOrAdiou > input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  padding: 0;
  opacity: 0;
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
</style>