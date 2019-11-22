<template>
  <div class="defaut-layout">
    <router-view />
    <van-tabbar v-model="tabHighLight" active-color="#38B48B" @change="tabChange">
      <van-tabbar-item v-for="(item, i) in tabIconList" :key="i">
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
          active: require("../assets/imgs/homeTab1_h.png"),
          inactive: require("../assets/imgs/homeTab1.png")
        },
        {
          name: "消息",
          active: require("../assets/imgs/homeTab2_h.png"),
          inactive: require("../assets/imgs/homeTab2.png")
        },
        {
          name: "通讯录",
          active: require("../assets/imgs/homeTab3_h.png"),
          inactive: require("../assets/imgs/homeTab3.png")
        },
        {
          name: "我的",
          active: require("../assets/imgs/homeTab4_h.png"),
          inactive: require("../assets/imgs/homeTab4.png")
        }
      ]
    };
  },
  methods: {
    tabChange(v) {
      console.log(v);
    }
  }
};
</script>
<style scoped>
.defaut-layout {
  width: 100%;
}
</style>
