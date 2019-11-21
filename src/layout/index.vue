<template>
  <div class="defaut-layout">
    <router-view />
    <van-tabbar v-model="tabHighLight" @change="tabChange">
      <van-tabbar-item v-for="(item, i) in tabIconList" :key="i">
        <span>{{ item.name }}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.inactive"
        />
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
          active: "https://img.yzcdn.cn/vant/user-active.png",
          inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
        },
        {
          name: "消息",
          active: "https://img.yzcdn.cn/vant/user-active.png",
          inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
        },
        {
          name: "通讯录",
          active: "https://img.yzcdn.cn/vant/user-active.png",
          inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
        },
        {
          name: "我的",
          active: "https://img.yzcdn.cn/vant/user-active.png",
          inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
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
