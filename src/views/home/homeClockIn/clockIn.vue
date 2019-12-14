<template>
  <div class="clockIn">
    <van-nav-bar class="topNavBar" left-text="返回" title="打卡" left-arrow @click-left="onClickLeft" />
    <div class="topBlock"></div>
    <div class="clockInTop">
      <p>每日阅读</p>
      <p>剩余：{{"20"}}天 频次：每周一/二/三/四/五/六</p>
    </div>
    <div class="clockInTopCon">
      <p>坚持阅读养成好习惯-朗读音频打卡</p>
      <p>
        详情
        <img src="~@/assets/imgs/home/habitClock/2爱向下.png" alt />
      </p>
    </div>
    <div class="clockInContent">
      <textarea class="clockInContentText" placeholder="输入你想说的话..." type="text" />
      <div class="recordList">
        <div class="recordListLeft">
          <img src="~@/assets/imgs/home/habitClock/错误.png" alt />
          <div class="shu"></div>
          <div class="redBall"></div>
          <p>正在录音 {{"00:16"}}</p>
        </div>
        <div class="recordListRight">
          <img @click="recorderPlay" src="~@/assets/imgs/home/habitClock/play.png" alt />
          <img @click="recorderStop" src="~@/assets/imgs/home/habitClock/play_stop.png" alt />
          <p @click="recorderStop">完成</p>
        </div>
      </div>

      <div class="imgVideoList">
        <div class="imgVideoListItem" v-for="(item , i) in 5" :key="i+'a'">
          <img src="~@/assets/imgs/home/habitClock/play_stop.png" alt />
          <div class="imgVideoListItemDele">
            <img src="~@/assets/imgs/home/habitClock/item错误.png" alt />
          </div>
        </div>
        <div
          class="imgVideoListItem"
          style="height: 1px;padding: 0; margin: 0;"
          v-for="(item , i) in 3"
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

    <!-- <div class="block" @click="recorderStart">开始录制</div> -->
    <!-- <p>录音时间</p> -->
    <!-- <div class="block" @click="recorderStop">结束录制</div> -->
    <!-- <div class="block" @click="recorderPlay">录音播放</div> -->
    <!-- <div class="block" @click="chooseImgAdiou">拍照片</div> -->
    <!-- <audio autoplay></audio> -->
    <div class="upLoadBtn">确定发布</div>
    <van-popup v-model="imgVideoPopupFlag" position="bottom" :style="{ height: '6rem' }">
      <div class="chooseImgOrAdiou">
        添加/拍摄照片
        <input @change="changeVideo" ref type="file" accept="video/*" capture="camera" />
      </div>
      <div class="chooseImgOrAdiou">
        拍摄视频
        <input @change="changeImg" ref type="file" accept="image/*" capture="camera" />
      </div>
    </van-popup>
    <img :src="chooseImgLocalIds" />
    <!-- <div class="topBlock"></div> -->
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
import axios from "axios";
import Recorder from "js-audio-recorder";
export default {
  data() {
    return {
      noncestr: "",
      signature: "",
      timestamp: "",
      chooseImgLocalIds: "",
      recordID: "",
      imgVideoPopupFlag: false
    };
  },
  created() {},
  mounted() {
    this.queryAccessToken();
    this.videotape();
  },
  destroyed() {},
  computed: {},
  methods: {
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
            this.initRecorder();
          }
        });
    },
    // 初始化录音
    initRecorder() {
      let timestamp = new Date().getTime();
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
          }
        });
      });
      wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    },
    // 录音
    recorderStart() {
      wx.startRecord();
    },
    recorderStop() {
      let that = this;
      wx.stopRecord({
        success(res) {
          that.recordID = res.localId;
        }
      });
    },
    recorderPlay() {
      let that = this;
      wx.playVoice({
        localId: that.recordID.toString() // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    },
    // 拍照
    chooseImgAdiou() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          console.log(res.localIds);
          this.chooseImgLocalIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    },
    // 添加照片 拍照弹窗
    imgVideoPopup() {
      this.imgVideoPopupFlag = true;
    },
    changeVideo() {
      console.log(132456);
    },
    changeImg() {
      console.log("qwertyuio");
    },
    // 录像
    videotape() {},
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
  background-color: #9c9c9c;
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
}
</style>