<template>
  <div class="defaut-layout">
    <router-view />
    <van-tabbar v-model="tabHighLight" active-color="#38B48B" @change="tabChange">
      <van-tabbar-item v-for="(item, i) in tabIconList" :key="i" :to="item.linkTo">
        <span>{{ item.name }}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.inactive" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "defaut-layout",
  data() {
    return {
      // 当前tab高亮
      tabHighLight: 0,
      tabIconList: [
        {
          name: "首页",
          active: require("../assets/imgs/layout/homeTab1_h.png"),
          inactive: require("../assets/imgs/layout/homeTab1.png"),
          linkTo: "/layout/home"
        },
        {
          name: "消息",
          active: require("../assets/imgs/layout/homeTab2_h.png"),
          inactive: require("../assets/imgs/layout/homeTab2.png"),
          linkTo: "/layout/msg"
        },
        {
          name: "通讯录",
          active: require("../assets/imgs/layout/homeTab3_h.png"),
          inactive: require("../assets/imgs/layout/homeTab3.png"),
          linkTo: "/layout/home"
        },
        {
          name: "我的",
          active: require("../assets/imgs/layout/homeTab4_h.png"),
          inactive: require("../assets/imgs/layout/homeTab4.png"),
          linkTo: "/layout/user"
        }
      ]
    };
  },
  methods: {
    tabChange(v) {
      console.log(v);
    },
    tabAction() {
      let path = this.$route.path;
      if (path == "/layout/home") {
        this.tabHighLight = 0;
      } else if (path == "/layout/msg") {
        this.tabHighLight = 1;
      } else if (path == "/layout/user") {
        this.tabHighLight = 3;
      }
    }
  },
  mounted() {
    this.tabAction();
  }
};
</script>
<style scoped>
.defaut-layout {
  width: 100%;
}
</style>
