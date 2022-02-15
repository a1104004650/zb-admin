var axios = require('axios')
var qs = require('qs')
import util from '@/libs/util.js';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(config => {
  // util.message.startLoading({ text:'loading' });
  // 请求拦截
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': util.cookies.get('token')
  }
  return config
},
error => {
  Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // 关闭遮罩层
  util.message.stopLoading();
  // 返回参数拦截
  if (response.status === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response)
  }
},
error => {
  // 关闭遮罩层
  util.message.stopLoading();
  if (error && error.response && error.response.status) {
    switch (error.response.status) {
      case 401:
      case 403:
      case 404:
      case 500:
      case 503:
      case 505:
      default:
        // 请求失败
        util.log.danger('请求失败，HTTP状态：' + error.response.status);
    }
    return Promise.reject(error.response)
  }
})

var get = function (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error.data)
      })
  })
}

var post = function (url, params) {
  return new Promise((resolve, reject) => {
    // qs.stringify(params) 需要序列化用这个
    axios.post(url, JSON.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error.data)
      })
  })
}

export default {
  doGet: (url, params) => get(url, params),
  doPost: (url, params) => post(url, params)
}
