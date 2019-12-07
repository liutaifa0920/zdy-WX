<template>
  <!-- top -->
  <div class="user">
    <div class="userTop">
      <div class="userTopUser" @click="userInfoClick">
        <img
          v-show="studentInfo.img[0] != '#' && studentInfo.img[0] != ''"
          :src="studentInfo.img"
          alt="头像"
        />
        <div
          :style="'background-color: ' + studentInfo.img + ';'"
          v-show="studentInfo.img[0] == '#'"
        >{{parentName[0]}}</div>

        <p>{{studentInfo.student_name}}家长 {{parentName == "" ? "" : (`(${parentName})`)}}</p>
      </div>
      <div class="userTopSchCla">
        <div class="userTopSchClaItem">
          <img src="../../assets/imgs/user/my_school_2.png" alt />
          <p>{{studentInfo.part_name}}</p>
        </div>
        <div class="userTopSchClaItem">
          <img src="../../assets/imgs/user/my_class_2.png" alt />
          <p>{{studentInfo.grade_name + studentInfo.class_name}}</p>
        </div>
      </div>
      <div class="userTopUnit">
        <van-grid :border="false" :column-num="4">
          <van-grid-item v-for="(item, i) in userUnitList" :key="i" @click="topListClick(i)">
            <div class="userTopUnitImg">
              <img :src="item.imgUrl" :alt="item.name" />
            </div>
            <p class="userTopUnitTit">{{item.name}}</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- block -->
    <div class="block"></div>

    <!-- bottom -->
    <div class="userBottom">
      <div
        class="userBottomItem"
        v-for="(item, i) in bottomList"
        :key="i"
        @click="bottomListClick(i)"
      >
        <img :src="item.imgUrl" :alt="item.name" />
        <p class="custom-title">{{item.name}}</p>
      </div>
    </div>

    <!-- setting -->
    <div class="userBottomSetting">
      <div class="userBottomItem" @click="bottomListClick(3)">
        <img src="../../assets/imgs/user/setting.png" alt="设置" />
        <p class="custom-title">设置</p>
      </div>
    </div>

    <!-- BottomBlock -->
    <div class="bottomBlock"></div>
  </div>
</template>

<script>
import { userIndex, userBindBracelet } from "@/api/api";
import { Dialog } from "vant";
import { mapState } from "vuex";
import { unBase64 } from "@/utils/unBase64.js";
export default {
  data() {
    return {
      urlParamStr: "",
      studentInfo: null,
      parentName: "",
      parentMobile: "",
      currentStuBindB: null,
      userUnitList: [
        {
          name: "健康数据",
          imgUrl: require("../../assets/imgs/user/jiankangshuju.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/classroom/index.html#/views/healthData/index?para="
        },
        {
          name: "课程表",
          imgUrl: require("../../assets/imgs/user/kechengbiao.png"),
          linkToUrl: "http://wechat.sdxxtop.com/parent/student/class_card/data/"
        },
        {
          name: "请假",
          imgUrl: require("../../assets/imgs/user/qingjia.png"),
          linkToUrl: "http://wechat.sdxxtop.com/parent/student/leave_list/data/"
        },
        {
          name: "拜访",
          imgUrl: require("../../assets/imgs/user/baifang.png"),
          linkToUrl: "http://wechat.sdxxtop.com/parent/student/visit_list/data/"
        },
        {
          name: "联系孩子",
          imgUrl: require("../../assets/imgs/user/lianxihaizi.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/classroom/index.html#/views/talkChild?para="
        },
        {
          name: "心理测评",
          imgUrl: require("../../assets/imgs/user/xinliceping.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/psychic/index.html#/evaluation_e?data="
        }
      ],
      bottomList: [
        {
          name: "添加学生 / 绑定人脸",
          imgUrl: require("../../assets/imgs/user/addStudent.png"),
          linkToUrl: "http://wechat.sdxxtop.com/parent/ucenter/students/data/"
        },
        {
          name: "密码账号管理",
          imgUrl: require("../../assets/imgs/user/userAdmin.png"),
          linkToUrl: "http://wechat.sdxxtop.com/parent/ucenter/password/data/"
        }
        // {
        //   name: "困难申请",
        //   imgUrl: require("../../assets/imgs/user/hard.png"),
        //   linkToUrl: ""
        // }
      ]
    };
  },
  created() {
    this.queryStudentInfo();
    this.queryStudentInfoAll();
    this.queryBindStuInfo();
  },
  computed: {
    // urlParamStr() {
    //   return this.$store.state.home.urlParamStr;
    // }
  },
  methods: {
    // 获取本地当前学生信息
    queryStudentInfo() {
      this.studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
      this.parentName = sessionStorage.getItem("parentName");
      // console.log(localStorage.getItem("urlParamStr"));
      this.urlParamStr = localStorage.getItem("urlParamStr");

      // 获取返回User页面 param
      // if (sessionStorage.getItem("urlParamStr")) {
      //   this.$store.commit(
      //     "home/SET_UrlParamStr",
      //     sessionStorage.getItem("urlParamStr")
      //   );
      // }
    },
    // 获取请求user学生信息
    queryStudentInfoAll() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      userIndex(data).then(res => {
        // console.log(res.data.userinfo);
        this.studentInfo = res.data.userinfo;
        this.parentName = this.studentInfo.relation;
        this.parentMobile = this.studentInfo.mobile;
      });
    },
    // 获取绑定学生信息
    queryBindStuInfo() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      console.log(data);
      userBindBracelet(data).then(res => {
        console.log(res.data)
        if (res.code == 200) {
          res.data.student.map((e, i) => {
            if (e.student_id == data.si) {
              this.currentStuBindB = e.is_bind_bracelet;
              console.log(this.currentStuBindB);
            }
          });
        }
      });
    },
    // 未绑定手环弹框
    setBindBracelet() {
      Dialog.confirm({
        title: "绑定手环",
        message: "还未绑定手环, 请前去绑定",
        confirmButtonText: "去绑定"
      })
        .then(() => {
          let tempData = JSON.parse(unBase64(this.urlParamStr)).data;
          window.location.href = this.bottomList[0].linkToUrl + tempData;
        })
        .catch(() => {
          // on cancel
        });
    },
    // toLinkuserSetting
    userInfoClick() {
      this.$router.push({
        path: "/userInfo"
      });
    },
    topListClick(i) {
      console.log(this.userUnitList[i].name);
      if (i == 5 || i == 1 || i == 2 || i == 3) {
        let tempData = JSON.parse(unBase64(this.urlParamStr)).data;
        console.log(tempData);
        window.location.href = this.userUnitList[i].linkToUrl + tempData;
      } else if (i == 0) {
        if (this.currentStuBindB == 2) {
          this.setBindBracelet();
        } else {
          window.location.href =
            this.userUnitList[i].linkToUrl + this.urlParamStr;
        }
      } else {
        window.location.href =
          this.userUnitList[i].linkToUrl + this.urlParamStr;
      }
    },
    bottomListClick(i) {
      let tempData = JSON.parse(unBase64(this.urlParamStr)).data;
      console.log(this.studentInfo);
      if (i == 3) {
        window.location.href =
          "http://wechat.sdxxtop.com/parent/ucenter/set/data/" + tempData;
      } else if (i == 1) {
        window.location.href =
          "http://wechat.sdxxtop.com/parent/ucenter/password/data/" +
          tempData +
          "/mobile/" +
          this.parentMobile;
      } else {
        // alert(this.bottomList[i].linkToUrl + this.urlParamStr);
        window.location.href = this.bottomList[i].linkToUrl + tempData;
      }
    }
  }
};
</script>

<style scoped>
p {
  margin: 0 !important;
}
.user {
  background-color: #fafafa;
}
.van-grid-item {
  box-sizing: border-box;
  flex-basis: 24.8% !important;
}

/* top */
.userTop {
  position: relative;
  width: 100%;
  height: 14rem;
  background: url(../../assets/imgs/user/userTopBG.png) no-repeat;
  background-size: 100% 100%;
}
.userTopUser {
  display: flex;
  left: 1rem;
  top: 2.8rem;
  justify-content: left;
  position: absolute;
}
.userTopUser > img {
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 50%;
  display: block;
  margin-right: 1.4rem;
}
.userTopUser > div {
  width: 3.3rem;
  height: 3.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #38b48b;
  color: white;
  font-size: 1.4rem;
  border-radius: 50%;
  margin-right: 1.4rem;
}
.userTopUser > p {
  height: 3.3rem;
  font-size: 1.3rem;
  line-height: 3.3rem;
  color: #38b48b;
}
.userTopSchCla {
  position: absolute;
  width: calc(100% - 5.7rem);
  top: 6.6rem;
  left: 5.7rem;
  display: flex;
  line-height: 1.1rem;
}
.userTopSchClaItem {
  font-size: 0.9rem;
  color: #999999;
  margin-right: 1.4rem;
  display: flex;
  justify-content: left;
  white-space: nowrap;
}
.userTopSchClaItem > img {
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 0.7rem;
}
.userTopUnit {
  position: absolute;
  background-color: white;
  bottom: -6.16rem;
  left: 0;
  right: 0;
  margin: auto;
  padding: 0 1%;
  width: 92%;
  height: 9.8rem;
  box-sizing: border-box;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  box-shadow: 0 0 1rem rgb(245, 244, 244);
}
.userTopUnitImg > img {
  width: 1.4rem;
}
.userTopUnitTit {
  white-space: nowrap;
}

/* block */
.block {
  height: 7.53rem;
  width: 100%;
  background-color: #fafafa;
}

/* bottom */
.userBottom {
  position: relative;
  width: 100%;
  background-color: white;
  margin-bottom: 0.66rem;
}
.userBottomItem {
  height: 3.9rem;
  width: 92%;
  margin: 0 auto;
  box-sizing: border-box;
  font-size: 0.95rem;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #eeeeee;
}
.userBottomItem:last-child {
  border-bottom: 0;
}
.userBottomItem > img {
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 1rem;
}

/* setting */
.userBottomSetting {
  width: 100%;
  position: relative;
  background-color: white;
}

/* bottomBlock */
.bottomBlock {
  height: 4rem;
  width: 100%;
  background-color: transparent;
}
</style>