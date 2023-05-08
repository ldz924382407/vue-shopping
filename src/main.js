import Vue from 'vue'
import App from './App.vue'
//引入路由相关文件
import router from "@/router"
//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import TypeNav from "@/components/TypeNav"
//引入vuex
import store from "@/store"

Vue.config.productionTip = false
//注册全局组件：第一个参数 组件名字  第二个参数：那个组件
//三级联动菜单
Vue.component(TypeNav.name, TypeNav)
//引入MockServe.js----mock数据
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"
//全局注册轮播图组件
import Carousel from "@/components/Carousel"
Vue.component(Carousel.name, Carousel)
//全局注册分页组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api';
import { Button,MessageBox} from 'element-ui';
//注册全局组件
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
import cat from '@/assets/images/cat.png';
//引入插件
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:cat
});
//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
});
//引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  //定义全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //需要把router进行注册
  //可以让全部的组件（非路由|路由组件）都可以获取到$route|$router属性
  //$route(路由)：可以获取到路由信息（path、query、params）
  //$router:进行编程式导航路由跳转push||replace
  router,
  //注册vuex,在每一个组件的身上都拥有一个$store这个属性
  store,
}).$mount('#app')
