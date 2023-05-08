//引入Vue
import Vue from "vue"
//引入Vuex -----相当于咱们最大的仓库
import Vuex from "vuex"
Vue.use(Vuex)

//引入home|search模块的仓库
import home from "@/store/home"
import user from "@/store/loginAndRegister"
import search from "@/store/search"
import detail from "@/store/detail"
import shopCar from "@/store/shopCar"
import trade from "@/store/trade"

//需要暴露Vuex.Store类的实例(你需要暴露这个类的实例，如果你不对外暴露，外部是不能使用的)
export default new Vuex.Store({
    //模块：把小仓库进行合并变为大仓库
    modules:{
        home,
        user,
        search,
        detail,
        shopCar,
        trade
    }
})