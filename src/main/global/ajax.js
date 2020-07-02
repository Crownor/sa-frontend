import axios from 'axios';
import { Message } from 'element-ui'

let ajax = axios.create({
    baseURL: '/api',
    // timeout: 5000,
    headers: {}
  });

  //错误处理
const err = (error) => {
  let status = error.response.status;
  if (status === 401) {
    Message.error(error.response.data);
    location.href = "/#/login";
  } else if (status === 500) {
    Message.error(error.response.data.error.message);
  }
  return Promise.reject(error)
}

// request interceptor
ajax.interceptors.request.use(config => {
  return config
}, err)

// response interceptor
ajax.interceptors.response.use((response) => {
  return response.data;
}, err)

// 重写 get 请求，请求参数不用加 params
let getMethod = ajax.get;
ajax.get = function (url, data, config) {
  let req = config || {};
  config = Object.assign(req, {
    params: data
  });

  let promise = getMethod(url, config).then(r => {
    return r;
  });

  return promise;
};

export default ajax;