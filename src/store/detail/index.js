import {getGoodsInfo, addOrUpdateShopCar} from "@/api";
import {getUUID} from "@/utils/uuid_token"

//Detail模块的小仓库
//actions代表一系列动作，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取产品信息的action
    async getGoodsInfo(context, skuId) {
        let response = await getGoodsInfo(skuId);
        if (response.code == 200) {
            context.commit("GET_GOODS_INFO", response.data)
        }
    },
    //加入购物车的||修改某一个产品的个数，注意一定要用解构方法解构形参对象，不能写成接收两个形参形式，那样会报错接口调不通
    async addOrUpdateShopCar(context, {skuId, skuNum}) {
        //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
        //不需要在三连环（仓库存储数据了）
        //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let response = await addOrUpdateShopCar(skuId, skuNum);
        if (response.code == 200) {
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error("fail"))
        }
    },
}
//mutations代表维护，操作维护的是state中的数据，且state中数据只能在mutations中处理
const mutations = {
    GET_GOODS_INFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    },
}
//state代表仓库中的数据
const state = {
    //仓库初始状态
    goodsInfo:{},
    //游客临时身份
    uuid_token: getUUID()
}
//计算属性
//项目当中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || [];
    }
}

//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}