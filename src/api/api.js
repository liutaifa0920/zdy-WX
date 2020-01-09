import request from "@/utils/request";

/**
 * test 测试请求例子-不可用
 * param
 * return
 * */
export function test(data) {
  return request({
    url: "/test",
    method: "post",
    data
  });
}

// ---------------------- Home --------------------------- //
export function homeParentClass(data) {
  return request({
    url: "/parent/student/parentClass",
    method: "post",
    data
  });
}

export function homeNewindex(data) {
  return request({
    url: "/parent/student/newindex",
    method: "post",
    data
  });
}

export function homeShowStudent(data) {
  return request({
    url: "/parent/ucenter/showStudent",
    method: "post",
    data
  });
}

export function homeModify(data) {
  return request({
    url: "/parent/student/modify",
    method: "post",
    data
  });
}

// 习惯打卡---
// 习惯打卡详情 进行中 已完成
export function homeHabitIndex(data) {
  return request({
    url: "/parent/habit/index",
    method: "post",
    data
  });
}
export function homeHabitEndindex(data) {
  return request({
    url: "/parent/habit/endindex",
    method: "post",
    data
  });
}
// 打卡详情
export function homeHabitClockDetail(data) {
  return request({
    url: "/parent/habit/clockDetail",
    method: "post",
    data
  });
}
// 删除打卡
export function homeHabitDelClock(data) {
  return request({
    url: "/parent/habit/delClock",
    method: "post",
    data
  });
}
// 点赞
export function homeHabitIsLike(data) {
  return request({
    url: "/parent/habit/isLike",
    method: "post",
    data
  });
}
// 回复评论
export function homeHabitAddComment(data) {
  return request({
    url: "/parent/habit/addComment",
    method: "post",
    data
  });
}
// 删除评论
export function homeHabitDelComment(data) {
  return request({
    url: "/parent/habit/delComment",
    method: "post",
    data
  });
}

// 判断日期是否打卡
export function homeHabitWeekClock(data) {
  return request({
    url: "/parent/habit/weekClock",
    method: "post",
    data
  });
}

// 历史打卡详情
export function homeHabitMyClockDetail(data) {
  return request({
    url: "/parent/habit/myClockDetail",
    method: "post",
    data
  });
}
// 排行榜
export function homeHabitRankingList(data) {
  return request({
    url: "/parent/habit/rankingList",
    method: "post",
    data
  });
}
// 打卡统计
export function homeHabitClockStatistics(data) {
  return request({
    url: "/parent/habit/clockStatistics",
    method: "post",
    data
  });
}
// 班级打卡统计
export function homeHabitClassClockStatics(data) {
  return request({
    url: "/parent/habit/classClockStatics",
    method: "post",
    data
  });
}
// 打卡
export function homeHabitSubmitClock(data) {
  return request({
    url: "/parent/habit/submitClock",
    method: "post",
    data
  });
}
// ---------------- 作业 ----------------
// 作业列表
export function homeWorkReadTaskList(data) {
  return request({
    url: "/parent/student/readTaskList",
    method: "post",
    data
  });
}
// 作业完成 / 未完成
export function homeWorkRemarkFinish(data) {
  return request({
    url: "/parent/student/remarkFinish",
    method: "post",
    data
  });
}
// 作业详情
export function homeWorkReadTaskNew(data) {
  return request({
    url: "/parent/student/readTaskNew",
    method: "post",
    data
  });
}
// 评论
export function homeWorkComment(data) {
  return request({
    url: "/parent/student/comment",
    method: "post",
    data
  });
}
// 删除评论
export function homeWorkDelComment(data) {
  return request({
    url: "/parent/student/delComment",
    method: "post",
    data
  });
}
// 点赞
export function homeWorkFabulous(data) {
  return request({
    url: "/parent/student/fabulous",
    method: "post",
    data
  });
}
// 删除提交作业
export function homeWorkDelSubmit(data) {
  return request({
    url: "/parent/student/delSubmit",
    method: "post",
    data
  });
}

// 提交作业时作业详情
export function homeWorkSubmitTaskInfo(data) {
  return request({
    url: "/parent/student/submitTaskInfo",
    method: "post",
    data
  });
}
// 作业提交
export function homeWorkSubmitTask(data) {
  return request({
    url: "/parent/student/submitTask",
    method: "post",
    data
  });
}
// 作业修改信息
export function homeWorkSaveTaskInfo(data) {
  return request({
    url: "/parent/student/saveTaskInfo",
    method: "post",
    data
  });
}
// 作业修改提交
export function homeWorkSaveTask(data) {
  return request({
    url: "/parent/student/saveTask",
    method: "post",
    data
  });
}

// 作业查看统计
export function homeWorkTaskSee(data) {
  return request({
    url: "/parent/student/taskSee",
    method: "post",
    data
  });
}

// ---------------------- User --------------------------- //
export function userIndex(data) {
  return request({
    url: "/parent/ucenter/index",
    method: "post",
    data
  });
}

// SettingImg
export function userModImg(data) {
  return request({
    url: "/parent/ucenter/modImg",
    method: "post",
    data
  });
}
// SettingInfo
export function userModInfo(data) {
  return request({
    url: "/parent/ucenter/modInfo",
    method: "post",
    data
  });
}
// bindBracelet
export function userBindBracelet(data) {
  return request({
    url: "/parent/ucenter/showStudent",
    method: "post",
    data
  });
}

// ---------------------- Message --------------------------- //
export function msgIndex(data) {
  return request({
    url: "/parent/msg/index",
    method: "post",
    data
  });
}

// 公告列表
export function msgNotice(data) {
  return request({
    url: "/parent/msg/notice",
    method: "post",
    data
  });
}
export function msgReadNotice(data) {
  return request({
    url: "/parent/msg/readNotice",
    method: "post",
    data
  });
}

// 班级通知列表
export function msgClassNotice(data) {
  return request({
    url: "/parent/msg/classNotice",
    method: "post",
    data
  });
}
export function msgClassNoticeDetail(data) {
  return request({
    url: "/parent/msg/classNoticeDetail",
    method: "post",
    data
  });
}

// 成绩列表
export function msgScore(data) {
  return request({
    url: "/parent/msg/score",
    method: "post",
    data
  });
}
export function msgReadScore(data) {
  return request({
    url: "/parent/msg/readScore",
    method: "post",
    data
  });
}

export function msgShowPeople(data) {
  return request({
    url: "/parent/msg/showPeople",
    method: "post",
    data
  });
}

// ---------------------- Address --------------------------- //
export function addressIndex(data) {
  return request({
    url: "/parent/contact/index",
    method: "post",
    data
  });
}
export function addressSearch(data) {
  return request({
    url: "/parent/contact/search",
    method: "post",
    data
  });
}

// Teacher Parentinfo
export function addressParentInfo(data) {
  return request({
    url: "/parent/contact/parentInfo",
    method: "post",
    data
  });
}
export function addressTeacherInfo(data) {
  return request({
    url: "/parent/contact/userinfo",
    method: "post",
    data
  });
}
// Collect
export function addressCollect(data) {
  return request({
    url: "/parent/contact/collect",
    method: "post",
    data
  });
}
