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
export function homeShowStudent(data) {
  return request({
    url: "/parent/ucenter/showStudent",
    method: "post",
    data
  });
}
