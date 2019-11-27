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


// homeShowStudent
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
