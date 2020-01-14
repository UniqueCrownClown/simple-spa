import axios from "axios";
import { URL } from "../util/config";

// 全局设置
axios.defaults.timeout = 5000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// 创建一个axios的实列
const instance = axios.create();
instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";

axios.interceptors.request.use = instance.interceptors.request.use;

// request拦截器，每次发送请求的时候拦截下来
instance.interceptors.request.use(
  config => {
    // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
    // if (store.state.loginMan.token) {
    //   config.headers.Authorization = store.state.loginMan.token
    // }
    return config;
  },
  err => {
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

  const url = `node/musicList.json?timestamp=${Date.now()}`
  export const getList = () =>
  axios.get(url).catch(err=>{console.log(err)});

  export const getLrc = (id:string) =>
  axios.get(`node/musicLrc/${id}.json?timestamp=${Date.now()}`).catch(err=>{console.log(err)});

  export default axios

  
