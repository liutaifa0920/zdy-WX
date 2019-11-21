/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 10:40:42
 * @LastEditTime: 2019-09-04 12:03:04
 * @LastEditors: Please set LastEditors
 */
/**
 * @name  sign.js
 * @description  数据传输加密
 * 依赖关系 js-md5 js-base64
 */

import md5 from "js-md5";
let Base64 = require("js-base64").Base64;

/**
 * signFun 导出加密函数
 * @param  {Object} 	obj     请求参数对象
 * @param  {string} 	appkey  请求appkey
 * @return {string} 	返回加密字符串发送后端
 */
export function signFun(obj, appkey) {
  Object.assign(obj, { ts: new Date().getTime() });
  let newkey = Object.keys(obj).sort();
  let newObj = {};
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }

  let str = "";
  for (let key in newObj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + newObj[key];
  }
  str += appkey;
  str = md5(str).toUpperCase();
  Object.assign(obj, { sn: str });
  let jsonStr = Base64.encode(JSON.stringify(obj));
  return jsonStr;
}
