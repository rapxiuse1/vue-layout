import axios from 'axios'


//设置请求超时
axios.default.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//tp request拦截器  请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.method != 'get') {}
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

//tp response 响应拦截器
axios.interceptors.response.use(
  response => {

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

//封装get请求
// export function get(url){
//   return new Promise((resolve,reject)=>{
//     axios.get(url)
//       .then(res=>{
//         resolve(res.data)
//       })
//       .catch(err=>{
//         reject(err)
//       })
//   })
// }
export function get(name) {
  let url = 'http://192.168.0.125:8001/YTHPro/restservices/WEB/zhyweb_getIndexPartChangeByResourceName/query?name=' + name
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//封装post请求
export function post(name, bean) {
  let param = {}
  param.name = name
  param.bean = bean
  if (typeof leapclient == 'object') {
    //平台Net.js封装请求
    return new Promise((resolve, reject) => {
      let res = leapclient.request(
        'zyWebRest_mainMethod', {
          bean: param
        },
        null,
        null,
        'web',
        'ZyWebMainRest'
      );

      if (res && res.resultstate == 0) {
        console.log(res)
      } else {
        resolve(res.result);
      }
    });

  } else {
    return new Promise((resolve, reject) => {
      axios.post('/ZYOA/restservices/ZyWebMainRest/zyWebRest_mainMethod/query', {
          bean: param
        })
        .then(res => {
          if (res && res.data.resultstate == 0) {
            resolve(res.data)
          } else {
            if (res.data) {
              resolve(res.data.result)
            }
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  //path,
  post,
  get
}