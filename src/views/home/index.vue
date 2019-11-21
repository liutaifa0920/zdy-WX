<template>
  <div class="home">
    <!-- ---------------------- -->
    <!-- 模板组件 不可使用 开发删除即可 -->
    <!-- <init-template></init-template> -->

    <!-- Title -->
    <div>
      <ul>
        <li v-for="(item, i) in 8" :key="i">张小明</li>
      </ul>
    </div>

    <!-- Function -->
    <div>
      123
    </div>

    <!-- Attendance -->
    <div>
      <div>
        <div>
          <p>123</p>
          <i>123</i>
        </div>
        <div>
          <div>123</div>
          <div>123</div>
        </div>
      </div>
    </div>

    <!-- Tip -->
    <div>
      <span>123</span>
      <span>123</span>
      <span>123</span>
    </div>

    <!-- parentClass -->
    <div>
      <div>asd</div>
      <div>123</div>
    </div>

    <!-- ---------------------- -->
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    // initTemplate: () => import("@/components/init.vue")
  }
};
</script>

<style scoped></style>
