<template>
  <!-- top -->
  <div class="user">
    <div class="userTop">
      <div class="userTopUser">
        <img src="http://img1.imgtn.bdimg.com/it/u=1366904711,2699461808&fm=26&gp=0.jpg" alt="头像" />
        <p>{{studentInfo.name}}家长 {{parentName == "" ? "" : (`(${parentName})`)}}</p>
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
export default {
  data() {
    return {
      studentInfo: null,
      parentName: "",
      userUnitList: [
        {
          name: "健康数据",
          imgUrl: require("../../assets/imgs/user/jiankangshuju.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/classroom/index.html#/views/healthData/index?para=eyJzdHVkZW50SWQiOiIyMDAwMDAwMCIsImNvbXBhbnlJZCI6IjEwMDAxNTMiLCJ1c2VySWQiOiIzMDAwMTEzNyIsImRhdGEiOiJleUpqYVNJNk1UQXdNREUxTXl3aWMya2lPaUl5TURBd01EQXdNQ0lzSW5OdUlqb2lNME5CTUVZNVJqZ3dPVVl4UlRoRlEwSTVNalZDUWpneU9VUTRRalk1TjBRaUxDSjBjeUk2TVRVM05EYzBPRGM1TVN3aWRXa2lPak13TURBeE1UTTNmUT09Iiwic3R1ZGVudE5hbWUiOiJoZWxsbyJ9"
        },
        {
          name: "课程表",
          imgUrl: require("../../assets/imgs/user/kechengbiao.png"),
          linkToUrl:
            "http://wechat.sdxxtop.com/parent/student/class_card/data/eyJjaSI6MTAwMDE1Mywic2kiOiIyMDAwMDAwMCIsInNuIjoiM0NBMEY5RjgwOUYxRThFQ0I5MjVCQjgyOUQ4QjY5N0QiLCJ0cyI6MTU3NDc0ODc5MSwidWkiOjMwMDAxMTM3fQ=="
        },
        {
          name: "请假",
          imgUrl: require("../../assets/imgs/user/qingjia.png"),
          linkToUrl:
            "http://wechat.sdxxtop.com/parent/student/leave_list/data/eyJjaSI6MTAwMDE1Mywic2kiOiIyMDAwMDAwMCIsInNuIjoiM0NBMEY5RjgwOUYxRThFQ0I5MjVCQjgyOUQ4QjY5N0QiLCJ0cyI6MTU3NDc0ODc5MSwidWkiOjMwMDAxMTM3fQ=="
        },
        {
          name: "拜访",
          imgUrl: require("../../assets/imgs/user/baifang.png"),
          linkToUrl:
            "http://wechat.sdxxtop.com/parent/student/visit_list/data/eyJjaSI6MTAwMDE1Mywic2kiOiIyMDAwMDAwMCIsInNuIjoiM0NBMEY5RjgwOUYxRThFQ0I5MjVCQjgyOUQ4QjY5N0QiLCJ0cyI6MTU3NDc0ODc5MSwidWkiOjMwMDAxMTM3fQ=="
        },
        {
          name: "联系孩子",
          imgUrl: require("../../assets/imgs/user/lianxihaizi.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/classroom/index.html#/views/talkChild?para=eyJzdHVkZW50SWQiOiIyMDAwMDAwMCIsImNvbXBhbnlJZCI6IjEwMDAxNTMiLCJ1c2VySWQiOiIzMDAwMTEzNyIsImRhdGEiOiJleUpqYVNJNk1UQXdNREUxTXl3aWMya2lPaUl5TURBd01EQXdNQ0lzSW5OdUlqb2lNME5CTUVZNVJqZ3dPVVl4UlRoRlEwSTVNalZDUWpneU9VUTRRalk1TjBRaUxDSjBjeUk2TVRVM05EYzBPRGM1TVN3aWRXa2lPak13TURBeE1UTTNmUT09Iiwic3R1ZGVudE5hbWUiOiJoZWxsbyJ9"
        },
        {
          name: "心理测评",
          imgUrl: require("../../assets/imgs/user/xinliceping.png"),
          linkToUrl:
            "http://wechat.test.sdxxtop.com/parent/classroom/index.html#views/studentReport?para=eyJzdHVkZW50SWQiOiIyMDAwMDAwMCIsImNvbXBhbnlJZCI6IjEwMDAxNTMiLCJ1c2VySWQiOiIzMDAwMTEzNyIsImRhdGEiOiJleUpqYVNJNk1UQXdNREUxTXl3aWMya2lPaUl5TURBd01EQXdNQ0lzSW5OdUlqb2lOalUxTmpoQk9UaEdSRFExUlRoRU1rRXdNVEZGTnpKQ01qbEJPVGc1T0RVaUxDSjBjeUk2TVRVM05EUTNOREF3TlN3aWRXa2lPak13TURBeE1UTTNmUT09Iiwic3R1ZGVudE5hbWUiOiJoZWxsbyJ9"
        }
      ],
      bottomList: [
        {
          name: "添加学生 / 绑定人脸",
          imgUrl: require("../../assets/imgs/user/addStudent.png"),
          linkToUrl:
            "http://wechat.sdxxtop.com/parent/ucenter/students/data/eyJjaSI6MTAwMDE1Mywic2kiOiIyMDAwMDAwMCIsInNuIjoiNzBCOTlCRTc4MDJBRTRCMkZGNEI2MzVGMDA1NDlFMUIiLCJ0cyI6MTU3NDc0OTAzOSwidWkiOjMwMDAxMTM3fQ=="
        },
        {
          name: "密码账号管理",
          imgUrl: require("../../assets/imgs/user/userAdmin.png"),
          linkToUrl:
            "http://wechat.sdxxtop.com/parent/ucenter/password/data/eyJjaSI6MTAwMDE1Mywic2kiOiIyMDAwMDAwMCIsInNuIjoiNzBCOTlCRTc4MDJBRTRCMkZGNEI2MzVGMDA1NDlFMUIiLCJ0cyI6MTU3NDc0OTAzOSwidWkiOjMwMDAxMTM3fQ==/mobile/18501584920"
        },
        {
          name: "困难申请",
          imgUrl: require("../../assets/imgs/user/hard.png"),
          linkToUrl:
            "http://wechat.sdxxtop.com/parent/ucenter/students/data/eyJjaSI6MTAwMDE1Mywic2kiOiIyMDAwMDAwMCIsInNuIjoiNzBCOTlCRTc4MDJBRTRCMkZGNEI2MzVGMDA1NDlFMUIiLCJ0cyI6MTU3NDc0OTAzOSwidWkiOjMwMDAxMTM3fQ=="
        }
      ]
    };
  },
  created() {
    this.queryStudentInfo();
  },
  methods: {
    // 获取当前学生信息
    queryStudentInfo() {
      this.studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
      this.parentName = localStorage.getItem("parentName");
      console.log(this.studentInfo);
    },
    topListClick(i) {
      console.log(this.userUnitList[i].name);
      window.location.href = this.userUnitList[i].linkToUrl;
    },
    bottomListClick(i) {
      // console.log(i);
      if (i == 3) {
        console.log("设置");
        window.location.href =
          "http://wechat.sdxxtop.com/parent/ucenter/set/data/eyJjaSI6MTAwMDE1Mywic2kiOiIyMDAwMDAwMCIsInNuIjoiNzBCOTlCRTc4MDJBRTRCMkZGNEI2MzVGMDA1NDlFMUIiLCJ0cyI6MTU3NDc0OTAzOSwidWkiOjMwMDAxMTM3fQ==";
      } else {
        console.log(this.bottomList[i].name);
        window.location.href = this.bottomList[i].linkToUrl;
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