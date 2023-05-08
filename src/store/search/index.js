import {getSearchList} from "@/api";
//Search模块的小仓库
//actions代表一系列动作，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取search模块数据
    async getSearchList(context, params={}) {
        //当前这个getSearchList这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let response = await getSearchList(params);
        if (response.code == 200) {
            context.commit("GET_SEARCH_LIST", response.data)
        }
    }
}
//mutations代表维护，操作维护的是state中的数据，且state中数据只能在mutations中处理
const mutations = {
    GET_SEARCH_LIST(state, searchList) {
        state.searchList = searchList
    },
}
//state代表仓库中的数据
const state = {
    //仓库初始状态
    searchList:{}
}
//计算属性
//项目当中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    //注意：这个attrsList方法名必须和属性名goodsList一致才行，之前随便命名的getAttrsList()发现无法使用
    attrsList(state) {
        //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
        //计算新的属性的属性值至少给人家来一个数组
        return state.searchList.attrsList || [];
    },
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
}

//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}