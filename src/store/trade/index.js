import {reqAddressInfo, reqOrderInfo} from "@/api";

//trade交易模块的小仓库
//actions代表一系列动作，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取用户地址信息
    async reqAddressInfo({commit}) {
        let response = await reqAddressInfo();
        console.log("******获取用户地址信息-response:{}", response);
        if (response.code == 200) {
            commit('REQ_ADDRESS_INFO', response.data);
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error(response.message))
        }
    },
    //获取商品清单
    async reqOrderInfo({commit}) {
        let response = await reqOrderInfo();
        console.log("******获取商品清单-response:{}", response);
        if (response.code == 200) {
            commit('REQ_ORDER_INFO', response.data);
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error(response.message))
        }
    },
}
//mutations代表维护，操作维护的是state中的数据，且state中数据只能在mutations中处理
const mutations = {
    REQ_ADDRESS_INFO(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    REQ_ORDER_INFO(state, orderInfo) {
        state.orderInfo = orderInfo
    },
}
//state代表仓库中的数据
const state = {
    addressInfo: [],
    orderInfo: {},
}
//计算属性
//项目当中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {

}

//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}