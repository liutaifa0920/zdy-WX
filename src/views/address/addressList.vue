<template>
  <div class="address">
    <!-- search -->
    <div class="addressSearch">
      <van-search class="topSearch" placeholder="搜索" v-model="searchValue" />
      <div class="topBlock"></div>
    </div>
    <!-- teacherList parentList -->

    <div v-show="searchValue == ''" class="adressList">
      <!-- collectItem -->
      <div
        v-for="(item, i) in collectList"
        :key="i + 'c'"
        class="listItem"
        @click="addressCSItemClick(item)"
      >
        <div class="listItemLeft">
          <div
            class="listItemIcon"
            :style="'background-color: ' + item.img + ''"
            v-if="item.img[0] == '#'"
          >{{item.name.length > 2 ? item.name.substr(item.name.length-2):item.name}}</div>
          <img v-if="item.img[0] != '#'" :src="item.img" :alt="item.name" />
        </div>
        <div class="listItemRight">
          <p>{{item.name}}</p>
        </div>
      </div>
      <!-- teacherItem -->
      <p class="listTitle">老师</p>
      <div
        v-for="(item, i) in teacherList"
        :key="i + 't'"
        class="listItem"
        @click="addressTItemClick(item)"
      >
        <div class="listItemLeft">
          <div
            class="listItemIcon"
            :style="'background-color: ' + item.img + ''"
            v-if="item.img[0] == '#'"
          >{{item.name.length > 2 ? item.name.substr(item.name.length-2):item.name}}</div>
          <img v-if="item.img[0] != '#'" :src="item.img" :alt="item.name" />
        </div>
        <div class="listItemRight">
          <p>{{item.name}}</p>
        </div>
      </div>
      <!-- parentItem -->
      <p class="listTitle">家长</p>
      <div
        v-for="(item, i) in parentList"
        :key="i + 'p'"
        class="listItem"
        @click="addressPItemClick(item)"
      >
        <div class="listItemLeft">
          <div
            class="listItemIcon"
            :style="'background-color: ' + item.img + ''"
            v-if="item.img[0] == '#'"
          >{{item.name.length > 2 ? item.name.substr(item.name.length-2):item.name}}</div>
          <img v-if="item.img[0] != '#'" :src="item.img" :alt="item.name" />
        </div>
        <div class="listItemRight">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- searchItem -->
    <div class="searchList">
      <div
        v-for="(item, i) in searchList"
        :key="i + 's'"
        class="listItem"
        @click="addressCSItemClick(item)"
      >
        <div class="listItemLeft">
          <div
            class="listItemIcon"
            :style="'background-color: ' + item.img + ''"
            v-if="item.img[0] == '#'"
          >{{item.name.length > 2 ? item.name.substr(item.name.length-2):item.name}}</div>
          <img v-if="item.img[0] != '#'" :src="item.img" :alt="item.name" />
        </div>
        <div class="listItemRight">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="bottomBlock"></div>
  </div>
</template>

<script>
import { addressIndex, addressSearch } from "@/api/api";
export default {
  data() {
    return {
      searchValue: "",
      collectList: [],
      teacherList: [],
      parentList: [],
      searchList: []
    };
  },
  // computed: {
  //   urlParamStr() {
  //     return this.$store.state.home.urlParamStr;
  //   }
  // },
  mounted() {
    this.queryAddressIndex();
  },
  methods: {
    // 获取通讯录列表
    queryAddressIndex() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      addressIndex(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.collectList = res.data.collect_user;
          this.teacherList = res.data.teacher;
          this.parentList = res.data.parent;
        }
      });
    },
    // 联系人搜索
    queryAddressSearch() {
      let data = {
        sh: this.searchValue,
        si: sessionStorage.getItem("si"),
        v: sessionStorage.getItem("v")
      };
      addressSearch(data).then(res => {
        console.log(res.data);
        if (res.code == 200) {
          this.searchList = res.data.userinfo;
        }
      });
    },
    // 联系人老师点击
    addressTItemClick(item) {
      console.log(item);
      this.$router.push({
        path: "/addressInfo",
        query: {
          userType: 1,
          userID: item.userid
        }
      });
    },
    // 联系人家长点击
    addressPItemClick(item) {
      console.log(item);
      this.$router.push({
        path: "/addressInfo",
        query: {
          userType: 2,
          userID: item.userid
        }
      });
    },
    // 联系人 收藏 搜索 点击
    addressCSItemClick(item) {
      console.log(item);
      this.$router.push({
        path: "/addressInfo",
        query: {
          userType: item.user_type,
          userID: item.userid
        }
      });
    }
  },
  watch: {
    searchValue() {
      if (this.searchValue != "") {
        this.queryAddressSearch();
      } else {
        this.queryAddressIndex();
      }
    }
  }
};
</script>
<style scoped>
p {
  margin: 0 !important;
}
/* top */
.topSearch {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
}
.topBlock {
  width: 100%;
  height: 4rem;
}

/* list */
.listTitle {
  padding: 0 1rem;
  box-sizing: border-box;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.9rem;
  text-align: left;
  background-color: #f7f8fa;
  color: #777777;
}
.listItem {
  height: 4rem;
  display: flex;
  padding: 0 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f7f8fa;
}
.listItemLeft {
  height: 4rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.listItemIcon {
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.listItemLeft > img {
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
}
.listItemRight {
  height: 4rem;
}
.listItemRight > p {
  height: 4rem;
  line-height: 4rem;
  padding-left: 1.5rem;
}

/* bottom */
.bottomBlock {
  width: 100%;
  height: 3rem;
}
</style>