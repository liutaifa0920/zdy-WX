<template>
  <div class="clockIn">
    <van-nav-bar class="topNavBar" left-text="返回" title="打卡" left-arrow @click-left="onClickLeft" />
    <div class="topBlock"></div>
    <div class="block" @click="recorderStart">开始录制</div>
    <p>录音时间{{time}}</p>
    <div class="block" @click="recorderStop">结束录制</div>
    <div class="block" @click="recorderPlay">录音播放</div>
    <audio autoplay></audio>
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
import axios from "axios";
import Recorder from "js-audio-recorder";
export default {
  data() {
    return {
      recorderRoot: null,
      localId: "",
      serverId: "",
      downLoadId: "",
      Soff: true,
      time: 0,
      timer: null
    };
  },
  created() {
    var apiUrl = window.location.href;
    // axios({
    //   method: 'post',
    //   url: 'api', // 写入api
    //   headers: {'Content-Type': 'application/json'},
    //   data: {
    //     url: apiUrl
    //   }
    // })
    wx.ready(function() {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
  },
  mounted() {
    this.initRecorder();
  },
  destroyed() {
    // this.recorder.destroy(function() {
    //   console.log("录音实例销毁了");
    // });
    // this.recorder = null;
  },
  computed: {
    hasGetUserMedia() {
      // Note: Opera builds are unprefixed.
      return (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
      );
    }
  },
  methods: {
    // 初始化录音
    initRecorder() {
      let timestamp = new Date().getTime();
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "", // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp, // 必填，生成签名的时间戳
        nonceStr: "", // 必填，生成签名的随机串
        signature: "", // 必填，签名，见附录1
        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    },

    recorderStart() {},
    recorderStop() {},
    recorderPlay() {},
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