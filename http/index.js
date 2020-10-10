import axios from 'axios'


const $axios=axios.create({
    timeout:3000
})

// 请求拦截器   修改请求头 【在请求头上加token】
$axios.interceptors.request.use(function (config) {
    // //获取token数据
    // let token = localStorage.getItem('token');
    // //修改请求头
    // config.headers.Authorization=token?token:"";
    return config;  //一定要return config 请求无法发送
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 响应拦截器   返回数据的校验  状态是否正确  信息的提取
$axios.interceptors.response.use(function (response) {
    // //  token过期我们拦截，跳转到登录页面
    // if(response.data.code==403){
    //   Message.error(response.data.msg)
    //    router.push('/login')
    // }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default $axios;