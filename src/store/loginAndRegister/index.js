import {getCode, registerUser, reqUserLogin, reqUserInfo, reqLogout} from "@/api";
import {setToken, getToken, removeToken} from "@/utils/token";

//Login+register模块的小仓库
//actions代表一系列动作，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取验证码
    async getCode({commit}, phone) {
        let response = await getCode(phone);
        console.log("******获取验证码-response:{}", response);
        if (response.code == 200) {
            commit('GET_CODE', response.data);
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error("fail"))
        }
    },
    //用户注册
    async registerUser({commit}, data) {
        let response = await registerUser(data);
        console.log("******注册用户-response:{}", response);
        if (response.code == 200) {
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error("fail"))
        }
    },
    //用户登录
    async reqUserLogin({commit}, data) {
        let response = await reqUserLogin(data);
        console.log("******登录用户-response:{}", response);
        //服务器下发token，用户唯一标识符(uuid)
        //将来经常通过带token找服务器要用户信息进行展示
        if (response.code == 200) {
            //用户已经登录成功且获取到token
            commit('REQ_USER_LOGIN', response.data.token);
            setToken(response.data.token);
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error(response.message))
        }
    },
    //获取用户信息
    async reqUserInfo({commit}) {
        let response = await reqUserInfo();
        console.log("******获取用户信息-response:{}", response);
        if (response.code == 200) {
            //用户已经登录成功且获取到token
            commit('REQ_USER_INFO', response.data);
            //返回的是成功的标记
            return "OK";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error(response.message))
        }
    },
    //用户退出
    async reqLogout({commit}) {
        //只是向服务器发起一次请求，通知服务器清除token
        let response = await reqLogout();
        console.log("******用户退出-response:{}", response);
        //服务器下发token，用户唯一标识符(uuid)
        //将来经常通过带token找服务器要用户信息进行展示
        if (response.code == 200) {
            //用户已经登录成功且获取到token
            commit('REQ_USER_LOGOUT');
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
    GET_CODE(state, code) {
        state.code = code;
    },
    REQ_USER_LOGIN(state, token) {
        state.token = token;
    },
    REQ_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清除本地数据
    REQ_USER_LOGOUT(state) {
        //帮仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储数据清空
        removeToken();
    },
}
//state代表仓库中的数据
const state = {
    code: '',
    token: getToken(),
    userInfo: {},
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