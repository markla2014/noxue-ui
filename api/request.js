import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: "http://127.0.0.1:8080/v1",//process.env.BASE_API, // api 的 base_url
  timeout: 500000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    var str = localStorage.getItem("user")
    if (str){
      var data = JSON.parse(str)
      config.headers['Authorization'] = 'Bearer ' + data.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    // const res = response.data
    // if (res.code !== 0 && !(res.code === 200 && res.token)) {
    //   var msg = res.msg
    //   if (res.errors && res.errors.length > 0) {
    //     msg = ''
    //     for (var v in res.errors) {
    //       for (var k in res.errors[v]) {
    //         msg += '\r\n'
    //         msg += res.errors[v][k]
    //       }
    //     }
    //   }
    //   Message({
    //     message: msg,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.response.data.msg,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    alert(error.response.data.msg)
    return Promise.reject(error)
  }
)

export default service
