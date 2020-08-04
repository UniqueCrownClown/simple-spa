import axios from "axios";
import { URL } from "../util/config";
import * as ReactDOM from "react-dom";
import { Spin, message } from "antd";
import React from "react";

// 全局设置
axios.defaults.timeout = 5000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// 创建一个axios的实列
const instance = axios.create();
instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";

axios.interceptors.request.use = instance.interceptors.request.use;

// 当前正在请求的数量
let requestCount = 0;

// 显示loading
function showLoading() {
  if (requestCount === 0) {
    var dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    ReactDOM.render(<Spin tip="加载中..." size="large" />, dom);
  }
  requestCount++;
}

// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById("loading"));
  }
}

// request拦截器，每次发送请求的时候拦截下来
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
    // if (store.state.loginMan.token) {
    //   config.headers.Authorization = store.state.loginMan.token
    // }
    // requestCount为0，才创建loading, 避免重复创建
    if (config.headers.isLoading !== false) {
      showLoading();
    }
    return config;
  },
  (err) => {
    // 判断当前请求是否设置了不显示Loading
    if (err.config.headers.isLoading !== false) {
      hideLoading();
    }
    return Promise.reject(err);
  }
);

// 返回后拦截
axios.interceptors.response.use(
  (res) => {
    // 判断当前请求是否设置了不显示Loading
    if (res.config.headers.isLoading !== false) {
      hideLoading();
    }
    return res;
  },
  (err) => {
    if (err.config.headers.isLoading !== false) {
      hideLoading();
    }
    if (err.message === "Network Error") {
      message.warning("网络连接异常！");
    }
    if (err.code === "ECONNABORTED") {
      message.warning("请求超时，请重试");
    }
    return Promise.reject(err);
  }
);

// const cType = {
//   headers: {
//     "Content-Type": "multipart/form-data"
//   }
// };

// 用户登录
export const login = (params: URLSearchParams) =>
  instance.post(`${URL}/api/user/login`, params);
// 用户注册
export const register = (params: URLSearchParams) =>
  instance.post(`${URL}/api/user`, params);

const url = `https://cdn.jsdelivr.net/gh/UniqueCrownClown/pic-bed/music/musicList.json?timestamp=${Date.now()}`;
export const getList = () =>
  axios.get(url).catch((err) => {
    console.log(err);
  });

export const getLrc = (id: string) =>
  axios
    .get(
      `https://cdn.jsdelivr.net/gh/UniqueCrownClown/pic-bed/music/${id}.json?timestamp=${Date.now()}`
    )
    .catch((err) => {
      console.log(err);
    });

export default axios;
