// axios请求封装
import axios from "axios";
import qs from 'qs'
import { signFun } from './sign'

// 新建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 请求超时
});

// 请求拦截
service.interceptors.request.use(
  config => {
    // 请求前处理
    // ...
    
    let data = qs.parse(config.data)
    console.log(data);
    let strData = signFun(data,'60487FE91A0577ED60C4DC56A9EF3DB5')
    config.data = qs.stringify({
        data:strData
    })

    return config;
  },
  error => {
    // 请求失败
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  /**
   * 如果你想获取诸如头或状态之类的http信息
   * 直接 return  response => response
   */

  /**
   * 通过自定义状态码确定请求状态
   */
  response => {
    const res = response.data;

    // 如果自定义状态码不是200则返回错误
    if (res.code !== 200) {
      console.log(res.message || "error");

      // 可自定义配置特殊的请求状态 如：令牌过期等特殊的状态码处理
      // ...

      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    // 响应错误处理
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;
