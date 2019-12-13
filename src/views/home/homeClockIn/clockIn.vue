<template>
  <div class="clockIn">
    <van-nav-bar class="topNavBar" left-text="返回" title="打卡" left-arrow @click-left="onClickLeft" />
    <div class="topBlock"></div>
    <div class="block" @click="recorderStart">开始录制</div>
    <p>录音时间</p>
    <div class="block" @click="recorderStop">结束录制</div>
    <div class="block" @click="recorderPlay">录音播放</div>
    <audio autoplay></audio>
    <div class="block" @click="chooseImgAdiou">选择图片</div>
    <img :src="chooseImgLocalIds" />
    <div class="topBlock"></div>
    <input ref="" type="file" accept="video/*" capture="camera"> 
    <input ref="" type="file" accept="image/*" capture="camera"> 
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
      chooseImgLocalIds: ""
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
    recorderStart() {},
    recorderStop() {},
    recorderPlay() {},
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
    // 录像
    videotape() {

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

.block {
  height: 5rem;
  width: 100%;
  text-align: center;
  line-height: 5rem;
  color: white;
  background-color: rgb(54, 150, 102);
  margin: 1rem 0;
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
</style>