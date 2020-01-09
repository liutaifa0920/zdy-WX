<template>
  <div class="homeWorkList">
    <van-nav-bar
      class="topNavBar"
      left-text="返回"
      right-text="日期"
      title="作业列表"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="topBlock"></div>

    <van-list v-model="loadingMore" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="homeWorkListItem" v-for="(item, i) in infoList" :key="i">
        <div
          class="dateTip"
          v-show="(new Date().getTime() - new Date(item.date).getTime() <= 86400000)"
        >今天</div>
        <div
          class="dateTip"
          v-show="(new Date().getTime() - new Date(item.date).getTime() > 86400000 && new Date().getTime() - new Date(item.date).getTime() <= 86400000*2)"
        >昨天</div>
        <div
          class="dateTip"
          v-show="(new Date().getTime() - new Date(item.date).getTime() > 86400000*2)"
        >{{item.date}}</div>
        <div class="listItem">
          <div class="listItemTop">
            <p @click="linkToListInfo(item.task_id)">
              <span v-show="item.is_excellent == 1" class="isNice">优</span>
              {{item.title.length > 6 ? (item.title.substr(0,5)+'...') : item.title}}（{{weeksList[new Date(item.date).getDay()]}}）
            </p>
            <p @click="linkToListInfo(item.task_id)">{{"刚刚"}} {{item.send_name}}老师</p>
            <p
              class="listItemTopRight"
              v-show="!item.taskType"
              @click="taskListItemAllClick(2, i)"
            >作业待完成</p>
            <p
              class="listItemTopRight"
              style="background-color: #EEEEEE;color: #999999;"
              v-show="item.taskType"
              @click="taskListItemAllClick(1, i)"
            >作业已完成</p>
          </div>
          <div class="listItemBottom">
            <div
              class="taskList"
              @click="taskListItemClick(i, index)"
              v-for="(items, index) in item.task_list"
              :key="index"
            >
              <p
                class="taskListIcon"
                :style="items.status == 2 ? 'background-color: #3295F9;border: 1px solid #3295F9;' : ''"
              >
                <img src="~@/assets/imgs/home/homeWork/对.png" alt="√" />
              </p>
              <p
                class="taskListContent"
                :style="items.status == 2 ? 'color: #3295F9;' : ''"
              >{{items.task_detail}}</p>
            </div>
            <div class="listItemBottomImgList" v-show="item.img != ''">
              <van-image
                @click="listImgClick(item.img_arr, imgI)"
                fit="cover"
                width="5.5rem"
                height="5.5rem"
                v-for="(imgItem, imgI) in item.img_arr"
                :key="imgI"
                :src="imgItem"
              />
              <div
                class="listItemImgBlock"
                v-for="(imgBlock, imgBlockI) in 2"
                :key="imgBlockI+'img'"
              ></div>
            </div>
            <div v-show="item.is_submit == 1" class="itemIsSubmit">
              <p
                v-show="(item.is_submit == 1 && item.is_submited == 0)"
                style="background-color: #38b48b;"
                @click="linkToHomeWorkIsSubmit(item.task_id)"
              >作业提交</p>
              <p
                v-show="(item.is_submit == 1 && item.is_submited == 1)"
                style="background-color: #dddddd;"
              >已提交</p>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <!-- 日期选择弹出层 -->
    <van-popup v-model="datePopupShow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="setDate"
      />
    </van-popup>
  </div>
</template>
<script>
import { homeWorkReadTaskList, homeWorkRemarkFinish } from "@/api/api";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      infoList: [],
      weeksList: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      datePopupShow: false,
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2100, 10, 1),
      currentDate: new Date(),
      filterAfterDate: "",
      homeWorkIsCompleteIDStr: "",
      loadingMore: false,
      finished: false
    };
  },
  mounted() {
    // this.queryInfoList();
  },
  methods: {
    // 请求列表参数
    queryInfoList() {
      let data = {
        ui: sessionStorage.getItem("ui"),
        si: sessionStorage.getItem("si"),
        ci: sessionStorage.getItem("ci"),
        dt: this.filterAfterDate,
        pg: this.infoList.length,
        v: sessionStorage.getItem("v")
      };
      homeWorkReadTaskList(data).then(res => {
        console.log(res.data.task);
        if (res.code == 200) {
          // 加载状态结束
          this.loadingMore = false;
          if (res.data.task.length <= 0) {
            this.finished = true;
          }
          let tempInfo = [];
          tempInfo = res.data.task.map(e => {
            for (let i = 0; i < e.task_list.length; i++) {
              if (e.task_list[i].status == 1) {
                e.taskType = false;
                break;
              } else {
                e.taskType = true;
              }
            }
            return e;
          });
          this.infoList = this.infoList.concat(tempInfo);
          // 关闭日期选择弹窗
          this.datePopupShow = false;
        }
      });
    },
    // B 最外层循环索引 S 第二层循环索引
    // 作业itemClick
    taskListItemClick(B, S) {
      // 判断有无老数据 -- id为0
      if (this.infoList[B].task_list[S].id != 0) {
        let t = "";
        // 更改点击后状态
        if (this.infoList[B].task_list[S].status == 2) {
          this.infoList[B].task_list[S].status = 1;
          t = 1;
        } else {
          this.infoList[B].task_list[S].status = 2;
          t = 2;
        }
        // 获取ID 传参
        this.homeWorkIsCompleteIDStr = this.infoList[B].task_list[S].id;
        let data = {
          li: this.homeWorkIsCompleteIDStr,
          st: t,
          v: sessionStorage.getItem("v")
        };
        homeWorkRemarkFinish(data).then(res => {
          // console.log(res);
          if (res.code == 200) {
            // 判断点击后是否已全选
            for (let i = 0; i < this.infoList[B].task_list.length; i++) {
              if (this.infoList[B].task_list[i].status == 1) {
                this.infoList[B].taskType = false;
                break;
              } else {
                this.infoList[B].taskType = true;
              }
            }
            // 重新渲染数据
            this.$forceUpdate();
            console.log(this.infoList);
          }
        });
      }
    },
    // 作业item全选Click
    taskListItemAllClick(t, B) {
      let noZero = true;
      this.infoList[B].task_list.map(e => {
        if (e.id == 0) {
          noZero = false;
        }
      });
      if (noZero) {
        this.homeWorkIsCompleteIDStr = this.infoList[B].task_list
          .map(e => {
            e.status = t;
            return e.id;
          })
          .join(",");
        //   console.log(this.homeWorkIsCompleteIDStr);
        let data = {
          li: this.homeWorkIsCompleteIDStr,
          st: t,
          v: sessionStorage.getItem("v")
        };
        homeWorkRemarkFinish(data).then(res => {
          //   console.log(res);
          if (t == 1 && res.code == 200) {
            this.infoList[B].taskType = false;
          } else {
            this.infoList[B].taskType = true;
          }
          this.$forceUpdate();
        });
      }
    },

    // 图片预览
    listImgClick(arr, i) {
      ImagePreview({
        images: arr,
        startPosition: i
      });
    },
    // 日期选择确定
    setDate() {
      let dateStr,
        newDate,
        year,
        month,
        date = "";
      newDate = new Date(this.currentDate);
      year = newDate.getFullYear();
      month =
        newDate.getMonth() + 1 < 10
          ? "0" + (newDate.getMonth() + 1)
          : newDate.getMonth() + 1;
      date =
        newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
      dateStr = year + "-" + month + "-" + date;
      this.filterAfterDate = dateStr;
      console.log(this.filterAfterDate);
      this.queryInfoList();
    },
    onLoad() {
      this.queryInfoList();
    },
    // 跳转详情
    linkToListInfo(id) {
      this.$router.push({
        path: "/homeWorkListInfo",
        query: {
          id
        }
      });
    },
    // 提交作业
    linkToHomeWorkIsSubmit(id) {
      this.$router.push({
        path: "/homeWorkIsSubmit",
        query: {
          id
        }
      });
    },

    // 右上角日期
    onClickRight() {
      this.datePopupShow = true;
    },
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
p {
  margin: 0 !important;
  text-align: left;
}
.homeWorkList {
  background-color: #f7f7f7;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  padding-bottom: 1rem;
  box-sizing: border-box;
}
.topNavBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.8rem;
  background-color: white;
}
.topBlock {
  width: 100%;
  height: 2.8rem;
}
.isNice {
  background-color: #ff9c01;
  color: white;
  font-size: 0.9rem;
  line-height: 1.3rem;
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  text-align: center;
  border-radius: .2rem;
}
/* item */
.homeWorkListItem {
  text-align: center !important;
  padding: 0 !important;
  background-color: transparent !important;
}
.homeWorkListItem .van-cell__value {
  text-align: center !important;
}
.dateTip {
  padding: 0.2rem 1rem;
  background-color: #d2d2d2;
  color: white;
  font-size: 0.8rem;
  display: inline-block;
  border-radius: 1rem;
  margin: 0.6rem auto;
}
.listItem {
  width: 93vw;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 0.5rem;
}
.listItemTop {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 0.8rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}
.listItemTop > p:nth-child(1) {
  display: inline-block;
  height: 1.3rem;
  line-height: 1.3rem;
  width: calc(100% - 6rem);
  font-size: 1rem;
  font-weight: 600;
}
.listItemTop > p:nth-child(2) {
  font-size: 0.9rem;
  margin-top: 0.2rem !important;
  color: #999999;
}
.listItemTopRight {
  position: absolute;
  width: 4rem;
  text-align: center;
  top: 0.8rem;
  right: 0.8rem;
  font-size: 0.8rem;
  background-color: #ff9c01;
  border-radius: 1rem;
  padding: 0.2rem 0.8rem;
  color: white;
}
.listItemBottom {
  background-color: #ffffff;
  width: 100%;
  padding: 0.8rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
}
.taskList {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.4rem 0;
}
.taskListIcon {
  width: 1rem;
  height: 1rem;
  background-color: white;
  border: 1px solid #999999;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.taskListIcon > img {
  width: 0.5rem;
  height: 0.5rem;
}
.taskListContent {
  width: calc(100% - 1.5rem);
  font-size: 1rem;
  line-height: 1rem;
  margin-left: 0.5rem !important;
  letter-spacing: 0.2px;
}
.listItemBottomImgList {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem 0;
  box-sizing: border-box;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.listItemImgBlock {
  width: 5.5rem;
  height: 0rem;
}
.itemIsSubmit {
  width: 100%;
  margin-top: 1.5rem;
  text-align: right;
}
.itemIsSubmit > p {
  display: inline-block;
  color: white;
  text-align: center;
  line-height: 1.7rem;
  background-color: #38b48b;
  width: 5rem;
  height: 1.7rem;
  font-size: 0.8rem;
  border-radius: 0.2rem;
}
</style>