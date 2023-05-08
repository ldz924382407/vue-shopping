import {getCategoryList, mockGetBannerList, mockGetFloorList} from '@/api'
//Home模块的小仓库
//actions代表一系列动作，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //getCategoryList返回的是一个Promise对象
    //需要用await接受成功返回的结果，await必须要结合async一起使用（CP）
    async getCategoryList(context) {
        let response = await getCategoryList();
        if (response.code == 200) {
            context.commit("GETCATEGORYLIST", response.data)
        }
    },
    //获取首页轮播图的数据
    async mockGetBannerList(context) {
        let response = await mockGetBannerList();
        console.log("获取轮播图数据:", response);
        if (response.code == 200) {
            context.commit("MOCK_GET_BANNER_LIST", response.data)
        }
    },
    //获取floor组件数据
    async mockGetFloorList(context) {
        let response = await mockGetFloorList();
        console.log("获取Floor组件数据:", response);
        if (response.code == 200) {
            context.commit("MOCK_GET_FLOOR_LIST", response.data)
        }
    },
}
//mutations代表维护，操作维护的是state中的数据，且state中数据只能在mutations中处理
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    MOCK_GET_BANNER_LIST(state, bannerList) {
        state.bannerList = bannerList
    },
    MOCK_GET_FLOOR_LIST(state, floorList) {
        state.floorList = floorList
    }
}
//state代表仓库中的数据
const state = {
    //home仓库中存储三级菜单的数据
    categoryList:[],
    //轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList:[]
}
//getters理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

//创建并暴露store
export default {
    actions,
    mutations,
    state,
    getters
}