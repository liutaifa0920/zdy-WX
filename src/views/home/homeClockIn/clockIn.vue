<template>
  <div class="clockIn">
    <van-nav-bar class="topNavBar" left-text="返回" title="打卡" left-arrow @click-left="onClickLeft" />
    <div class="topBlock"></div>
    <div class="block" @click="recorderStart">开始录制</div>
    <div class="block" @click="recorderStop">结束录制</div>
    <div class="block" @click="recorderPlay">录音播放</div>
    <audio autoplay></audio>
  </div>
</template>
<script>
import Recorder from "js-audio-recorder";
export default {
  data() {
    return {
      recorderRoot: null
    };
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
      // navigator.getUserMedia =
      //   navigator.getUserMedia ||
      //   navigator.webkitGetUserMedia ||
      //   navigator.mozGetUserMedia ||
      //   navigator.msGetUserMedia;
      console.log(this.hasGetUserMedia)
      if (this.hasGetUserMedia) {
        // alert("Good to go!");
      } else {
        alert("getUserMedia() is not supported in your browser");
      }

      let onFailSoHard = function(e) {
        console.log("拒绝访问", e);
      };
      navigator.getUserMedia(
        "audio",
        function(localMediaStream) {
          var audio = document.querySelector("audio");
          audio.src = window.URL.createObjectURL(localMediaStream);

          audio.onloadedmetadata = function(e) {
            // Ready to go. Do some stuff.
          };
        },
        onFailSoHard
      );

      this.recorder = new Recorder();
    },

    recorderStart() {
      this.recorder.start();
    },
    recorderStop() {
      this.recorder.stop();
    },
    recorderPlay() {
      this.recorder.play();
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