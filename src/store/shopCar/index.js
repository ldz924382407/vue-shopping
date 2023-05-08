import {reqCartList, reqDeleteCartById, reqUpdateCheckedByid} from "@/api";

//shopCar模块的小仓库
//actions代表一系列动作，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async reqCartList({commit}) {
        let response = await reqCartList();
        if (response.code == 200) {
            commit("REQ_CART_LIST", response.data)
        }
    },
    //删除购物车某一个产品
    async reqDeleteCartById({commit}, skuId) {
        let response = await reqDeleteCartById(skuId);
        if (response.code == 200) {
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error("fail"))
        }
    },
    //修改购物车某一个产品的选中状态
    async reqUpdateCheckedByid({commit}, {skuId,isChecked}) {
        let response = await reqUpdateCheckedByid(skuId,isChecked);
        if (response.code == 200) {
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error("fail"))
        }
    },
    //删除全部勾选的产品
    async deleteAllCheckedCar({dispatch, getters}) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let primoseAll = [];
        getters.carList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('reqDeleteCartById', item.skuId) : '';
            //将每一次返回的Promise添加到数组当中
            primoseAll.push(promise);
        })
        //只要全部的p1|p2....都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(primoseAll);
    },
    //修改全部产品的状态
    async updateAllCheckedCar({dispatch, getters}, isChecked) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let primoseAll = [];
        getters.carList.cartInfoList.forEach(item => {
            let promise = dispatch('reqUpdateCheckedByid', {skuId:item.skuId, isChecked});
            //将每一次返回的Promise添加到数组当中
            primoseAll.push(promise);
        })
        //只要全部的p1|p2....都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(primoseAll);
    }
}
//mutations代表维护，操作维护的是state中的数据，且state中数据只能在mutations中处理
const mutations = {
    REQ_CART_LIST(state, carList) {
        state.carList = carList
    },
}
//state代表仓库中的数据
const state = {
    //购物车列表
    carList: [],
}
//计算属性
//项目当中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    carList(state) {
        return state.carList[0] || {};
    }
}

//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}