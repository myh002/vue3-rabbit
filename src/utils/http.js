import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 这个导入不是vue-router了
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000
})

// 添加请求拦截器
httpInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.userInfo.token) {
      config.headers.Authorization = `Bearer ${userStore.userInfo.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
httpInstance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log(error)
    ElMessage.error(error.response.data.message)
    if (error.response.status == 401) {
      const userStore = useUserStore()
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default httpInstance
