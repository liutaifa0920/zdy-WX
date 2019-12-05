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
