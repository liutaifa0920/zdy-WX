<template>
  <div class="addressItem">
    <van-nav-bar class="topNavBar" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="topBlock"></div>
    <!-- top -->
    <div v-show="queryInfo.img != ''" class="topBox">
      <div
        class="topIcon"
        v-if="queryInfo.img[0] == '#'"
        :style="'background-color: ' + queryInfo.img + ''"
      >{{queryInfo.name.length > 2 ? queryInfo.name.substr(queryInfo.name.length-2):queryInfo.name}}</div>
      <img
        v-if="queryInfo.img[0] != '#'"
        class="topIcon"
        :src="queryInfo.img"
        :alt="queryInfo.name"
      />
    </div>
    <div class="topName">
      <p>{{queryInfo.name}}</p>
      <img
        @click="collectClisk(1)"
        v-show="isCollect == 1"
        src="../../assets/imgs/address/addressLike.png"
        alt="已收藏"
      />
      <img
        @click="collectClisk(2)"
        v-show="isCollect == 2"
        src="../../assets/imgs/address/addressNotLike.png"
        alt="未收藏"
      />
    </div>
    <div class="infoList">
      <p>手机</p>
      <p>{{queryInfo.mobile}}</p>
      <a :href="'tel://' + queryInfo.mobile">
        <img
          v-if="mobileIs_Show == 2 && currentType != 2"
          class="callTo"
          src="../../assets/imgs/address/addressCall.png"
          alt="Call"
        />
      </a>
    </div>
    <div class="infoList">
      <p>{{currentType == 1?"职位":"部门"}}</p>
      <p v-if="currentType == 1">{{queryInfo.position == "" ? "未设置":queryInfo.position}}</p>
      <p v-if="currentType == 2">{{queryInfo.part_name}}</p>
    </div>
    <div class="infoList">
      <p>{{currentType == 1?"部门":"年级"}}</p>
      <p>{{currentType == 1?queryInfo.part_name:queryInfo.grade_name}}</p>
    </div>
    <div class="infoList">
      <p>{{currentType == 1?"性别":"班级"}}</p>
      <p>{{currentType == 1?sex:queryInfo.class_name}}</p>
    </div>
    <div class="infoList">
      <p>{{currentType == 1?"绑定设备":"与学生关系"}}</p>
      <p>{{currentType == 1?queryInfo.device_name:queryInfo.relation}}</p>
    </div>
  </div>
</template>
<script>
import {
  addressTeacherInfo,
  addressParentInfo,
  addressCollect
} from "@/api/api";
export default {
  data() {
    return {
      currentType: 1,
      currentId: null,
      queryInfo: {
        img: ""
      },
      isCollect: 2,
      sex: "",
      mobileIs_Show: 2
    };
  },
  mounted() {
    this.queryParams();
  },
  methods: {
    // 获取参数 渲染页面
    queryParams() {
      this.currentType = this.$route.query.userType;
      this.currentId = this.$route.query.userID;
      if (this.currentType == 1) {
        this.queryTeacherInfo(this.currentId);
      } else {
        this.queryParentInfo(this.currentId);
      }
    },
    // 请求教师个人信息
    queryTeacherInfo(ui) {
      let data = {
        ui,
        si: sessionStorage.getItem("si"),
        cu: sessionStorage.getItem("ui"),
        v: sessionStorage.getItem("v")
      };
      addressTeacherInfo(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.queryInfo = res.data.userinfo;
          this.isCollect = res.data.is_collect;
          this.mobileIs_Show = res.data.userinfo.is_hide_mobile;
          if (res.data.userinfo.sex == 0) {
            this.sex = "未设置";
          } else if (s.data.userinfo.sex == 1) {
            this.sex = "男";
          } else {
            this.sex = "女";
          }
        }
      });
    },
    // 请求家长个人信息
    queryParentInfo(ui) {
      let data = {
        ui,
        si: sessionStorage.getItem("si"),
        cu: sessionStorage.getItem("ui"),
        v: sessionStorage.getItem("v")
      };
      addressParentInfo(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.queryInfo = res.data.userinfo;
          this.isCollect = res.data.is_collect;
        }
      });
    },
    // 收藏联系人
    setCollect(data) {
      addressCollect(data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.queryParams();
        }
      });
    },
    collectClisk(v) {
      console.log(v);
      let is_collect = null;
      let data = {};
      if (v == 1) {
        is_collect = 2;
      } else {
        is_collect = 1;
      }
      if (this.currentType == 1) {
        data = {
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          cui: this.queryInfo.userid,
          csi: 0,
          ct: is_collect,
          v: sessionStorage.getItem("v")
        };
      } else {
        data = {
          ui: sessionStorage.getItem("ui"),
          si: sessionStorage.getItem("si"),
          cui: this.queryInfo.userid,
          csi: this.queryInfo.student_id,
          ct: is_collect,
          v: sessionStorage.getItem("v")
        };
      }
      this.setCollect(data);
    },
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
.topBox {
  background: url(~@/assets/imgs/address/addressTopBg.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 9rem;
  position: relative;
}
.topIcon {
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 2px solid white;
  box-sizing: border-box;
  position: absolute;
  bottom: -2.25rem;
  left: 1rem;
}
.topName {
  height: 2rem;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0 1rem 0 6rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.topName > img {
  width: 1.5rem;
  position: relative;
  top: 0.2rem;
}
/* list */
.infoList {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0.2rem 1rem 0;
  border-bottom: 1px solid #f3f3f3;
  box-sizing: border-box;
  position: relative;
}
.infoList > p {
  white-space: nowrap;
  height: 3rem;
  line-height: 3rem;
}
.infoList > p:nth-child(1) {
  color: #999999;
  margin-right: 1rem !important;
}
.infoList > p:nth-child(2) {
  font-weight: 600;
}
.callTo {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  right: 1rem;
  bottom: 0.8rem;
}
</style>