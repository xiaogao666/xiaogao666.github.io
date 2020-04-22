import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(
  // 任何请求都会经过这里
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))

    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  // 请求失败会经过这里
  function (error) {
    return Promise.reject(error)
  }
)

export default request
