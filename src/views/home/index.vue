<template>
  <div class="home">
    <!-- 模板组件 不可使用 开发删除即可 -->
    <init-template></init-template>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    initTemplate: () => import("@/components/init.vue")
  }
};
</script>

<style scoped></style>
