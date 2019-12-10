<template>
  <div class="userSetting">
    <van-nav-bar
      class="topNavBar"
      title="修改信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>

    <!-- 家长姓名 -->
    <div v-show="setType == 1" class="setBox">
      <p>家长姓名</p>
      <input type="text" v-model="setValue" />
    </div>
    <!-- 学生姓名 -->
    <div v-show="setType == 2" class="setBox">
      <p>学生姓名</p>
      <input type="text" v-model="setValue" />
    </div>
    <!-- 家长学生关系 -->
    <div v-show="setType == 4" class="setBox">
      <p>家长学生关系</p>
      <input type="text" v-model="setValue" />
    </div>

    <!-- 确认修改 -->
    <div class="setBtn" @click="setUserInfo">保存</div>
    <van-overlay :show="hideShow">
      <div class="wrapper">
        <van-loading size="24px" color="#38b48b" style="color: #38b48b;" vertical>保存中...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { userIndex, userModInfo } from "@/api/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      setType: null,
      userInfo: {},
      setValue: null,
      hideShow: false
    };
  },
  mounted() {
    this.queryUserInfo();
  },
  methods: {
    // 获取参数
    queryParams() {
      this.setType = this.$route.query.type;
      //   console.log(this.userInfo.name);
      //   console.log(this.setType);
      if (this.setType == 1) {
        this.setValue = this.userInfo.name;
      } else if (this.setType == 2) {
        this.setValue = this.userInfo.student_name;
      } else if (this.setType == 4) {
        this.setValue = this.userInfo.relation;
      }
    },
    // 获取user信息
    queryUserInfo() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      userIndex(data).then(res => {
        // console.log(res.data.userinfo);
        if (res.code == 200) {
          this.userInfo = res.data.userinfo;
          this.queryParams();
        }
      });
    },
    // 修改信息
    setUserInfo() {
      this.hideShow = true;
      let data = {};
      if (this.setType == 1) {
        data = {
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          pn: this.setValue,
          stn: this.userInfo.student_name,
          se: this.userInfo.sex,
          rt: this.userInfo.relation,
          mt: this.setType,
          v: sessionStorage.getItem("v")
        };
      } else if (this.setType == 2) {
        data = {
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          pn: this.userInfo.name,
          stn: this.setValue,
          se: this.userInfo.sex,
          rt: this.userInfo.relation,
          mt: this.setType,
          v: sessionStorage.getItem("v")
        };
      } else if (this.setType == 4) {
        data = {
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          pn: this.userInfo.name,
          stn: this.userInfo.student_name,
          se: this.userInfo.sex,
          rt: this.setValue,
          mt: this.setType,
          v: sessionStorage.getItem("v")
        };
      }
      userModInfo(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.hideShow = false;
          Toast(res.msg);
          this.onClickLeft();
        } else {
          Toast(res.msg);
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
.userSetting {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
}

/* input */
.setBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  margin-top: 1rem;
  box-sizing: border-box;
  background-color: white;
}
.setBox > input {
  text-align: right;
  padding-right: 0.5rem;
  border: 0px !important;
}

/* Btn */
.setBtn {
  background-color: #38b48b;
  height: 3rem;
  width: 91vw;
  font-size: 1rem;
  line-height: 3rem;
  margin: 1rem auto 0;
  color: white;
  border-radius: 0.3rem;
}

/* SetLoading */
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>