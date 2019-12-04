<template>
  <div class="userInfo">
    <van-nav-bar
      class="topNavBar"
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="topBlock"></div>
    <div class="listItem">
      <p class="itemTitle">头像</p>
      <div class="itemCon">
        <div></div>
        <img src alt />
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="listItem">
      <p class="itemTitle">家长姓名</p>
      <div class="itemCon">
        <p></p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="listItem">
      <p class="itemTitle">学生姓名</p>
      <div class="itemCon">
        <p></p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="listItem">
      <p class="itemTitle">学生性别</p>
      <div class="itemCon">
        <p></p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="listItem">
      <p class="itemTitle">学校</p>
      <div class="itemCon">小学部</div>
    </div>
    <div class="listItem">
      <p class="itemTitle">年级</p>
      <div class="itemCon">二年级</div>
    </div>
    <div class="listItem">
      <p class="itemTitle">班级</p>
      <div class="itemCon">十一班</div>
    </div>
    <div class="listItem">
      <p class="itemTitle">家长学生关系</p>
      <div class="itemCon">
        <p></p>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
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

/* List */
.listItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ebebeb;
}
.itemTitle {
  height: 3rem;
  line-height: 3rem;
}
.itemCon {
  height: 3rem;
  line-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>