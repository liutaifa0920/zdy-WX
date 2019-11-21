<template>
  <div class="init-tempalte" v-waves>
    <svg-icon
      icon-class="vue"
      :class-name="bool ? 'svg-icon-logo-act' : 'svg-icon-logo'"
    ></svg-icon>
    <h1 :class="bool ? 'h1-act' : ''">Welcome to sdxx Vue-base.app</h1>
    <a :class="bool ? 'a-act' : ''" href="#">Template REMADE.md</a>
    <div class="tips" :class="bool ? 'tips-act' : ''">
      <svg-icon icon-class="wx" class-name="svg-icon"></svg-icon>
      <svg-icon icon-class="qq" class-name="svg-icon"></svg-icon>
      <svg-icon icon-class="github" class-name="svg-icon"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "init-template",
  data() {
    return { bool: false };
  },
  mounted() {
    setTimeout(() => {
      this.bool = true;
    }, 500);
  }
};
</script>

<style scoped>
.init-tempalte {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg-icon-logo {
  width: 1em !important;
  height: 1em !important;
}
.svg-icon-logo-act {
  width: 15em !important;
  height: 15em !important;
}
.tips {
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0;
}
.svg-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s;
}
.svg-icon:hover {
  width: 40px;
  height: 40px;
}
h1 {
  opacity: 0;
  transition: all 0.5s 0.5s;
}
a {
  opacity: 0;
  transition: all 0.5s 0.9s;
}
.tips {
  opacity: 0;
  transition: all 0.5s 1.4s;
}
.h1-act,
.a-act,
.tips-act {
  opacity: 1;
}
</style>
