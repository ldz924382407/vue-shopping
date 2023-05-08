//对axios二次封装
import axios from "axios";
import nprogress from "nprogress";
//如果出现进度条没有显示：一定是你忘记了引入样式了
import "nprogress/nprogress.css";
//1、利用axios对象的vreate，区创建一个axios实例
//2.：request就是axios，只不过稍微配置一下
const requests = axios.create({
    //基础路径，requests发出的请求的时候，路径当中会出现api
    baseURL:'/mock',
    //代表请求超时的时间5s
    timeout: 5000,
})
//3、配置请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use(config => {
    //进度条开始
    nprogress.start();
    //config：配置对象，对象里面有一个属性很重要，Header请求头
    return config;
})
//4、配置响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    //进度条结束
    nprogress.done();
    return  res.data;
},(error) => {
    //失败的回调函数
    console.log("响应失败"+error)
    return Promise.reject(new Error('fail'))
})
//5、对外暴露
export default requests;
