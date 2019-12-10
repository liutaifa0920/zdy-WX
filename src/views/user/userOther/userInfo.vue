<template>
  <div class="userInfo">
    <van-nav-bar
      class="topNavBar"
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <div class="listItem">
      <input @change="headImgChange" class="itemHeadInp" type="file" />
      <p class="itemTitle">头像</p>
      <div class="itemCon">
        <div
          v-if="userInfo.img[0] == '#'"
          :style="'background-color:'+ userInfo.img +';'"
          class="itemConHead"
        >{{userInfo.relation}}</div>
        <img class="itemConHead" v-if="userInfo.img[0] != '#'" :src="userInfo.img" alt />
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="listItem" @click="listCLick(1)">
      <p class="itemTitle">家长姓名</p>
      <div class="itemCon">
        <p class="marginRight">{{userInfo.name}}</p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="listItem" @click="listCLick(2)">
      <p class="itemTitle">学生姓名</p>
      <div class="itemCon">
        <p class="marginRight">{{userInfo.student_name}}</p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="listItem" @click="listCLick(3)">
      <p class="itemTitle">学生性别</p>
      <div class="itemCon">
        <p v-if="userInfo.sex == 0" class="marginRight">未设置</p>
        <p v-if="userInfo.sex == 1" class="marginRight">男</p>
        <p v-if="userInfo.sex == 2" class="marginRight">女</p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="listItem">
      <p class="itemTitle">学校</p>
      <div class="itemCon">{{userInfo.part_name}}</div>
    </div>
    <div class="listItem">
      <p class="itemTitle">年级</p>
      <div class="itemCon">{{userInfo.grade_name}}</div>
    </div>
    <div class="listItem">
      <p class="itemTitle">班级</p>
      <div class="itemCon">{{userInfo.class_name}}</div>
    </div>
    <div class="listItem" @click="listCLick(4)">
      <p class="itemTitle">家长学生关系</p>
      <div class="itemCon">
        <p class="marginRight">{{userInfo.relation}}</p>
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- BottomDialog -->
    <van-action-sheet
      v-model="setSexShow"
      :round="false"
      :actions="sexShowAction"
      @select="sexCheckSelect"
    />
  </div>
</template>
<script>
import { userIndex, userModImg, userModInfo } from "@/api/api";
import { Toast } from "vant";
import axios from "axios";
import qs from "qs";
import { signFun } from "../../../utils/sign";
export default {
  data() {
    return {
      userInfo: {
        img: ""
      },
      checkHeadImg: "",
      checkImgFile: null,
      setSexShow: false,
      sexShowAction: [
        { name: "男", value: 1 },
        { name: "女", value: 2 }
      ]
    };
  },
  mounted() {
    this.queryUserInfo();
  },
  methods: {
    // 请求user信息
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
        }
      });
    },
    // 修改头像
    setHeadImg(img, sn) {
      let ts = Math.ceil(new Date().getTime() / 1000);
      let fd = new FormData();
      fd.append("data", sn);
      fd.append("img", img);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post("http://app.sdxxtop.com/parent/ucenter/modImg", fd, config)
        .then(res => {
          // console.log(res.data);
          if (res.data.code == 200) {
            Toast(res.data.msg);
            this.queryUserInfo();
          } else {
            Toast(res.data.msg);
          }
        });
    },
    // 列表点击
    listCLick(t) {
      if (t == 1) {
        this.$router.push({
          path: "/userSetting",
          query: {
            type: t
          }
        });
      } else if (t == 2) {
        this.$router.push({
          path: "/userSetting",
          query: {
            type: t
          }
        });
      } else if (t == 3) {
        this.setSexShow = true;
      } else if (t == 4) {
        this.$router.push({
          path: "/userSetting",
          query: {
            type: t
          }
        });
      }
    },
    // HeadImgChange
    headImgChange(e) {
      let img = e.target.files[0];
      let tempData = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      let sn = signFun(tempData, "9E1613256C1F4815219A633762B53704");
      this.setHeadImg(img, sn);
    },
    // SexSelect
    sexCheckSelect(item) {
      // console.log(item);
      this.setSexShow = false;
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        pn: this.userInfo.name,
        stn: this.userInfo.student_name,
        se: item.value,
        rt: this.userInfo.relation,
        mt: 3,
        v: sessionStorage.getItem("v")
      };
      userModInfo(data).then(res => {
        // console.log(res);
        if (res.code == 200) {
          Toast(res.msg);
        } else {
          Toast(res.msg);
        }
        this.queryUserInfo();
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
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
.marginRight {
  margin-right: 0.5rem !important;
}

/* List */
.listItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f8f8f8;
  position: relative;
}
.itemTitle {
  height: 3rem;
  line-height: 3rem;
}
.itemCon {
  height: 3rem;
  line-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.itemConHead {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  line-height: 2.5rem;
  margin-right: 0.5rem;
}
.itemHeadInp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  opacity: 0;
}
</style>