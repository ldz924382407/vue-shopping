//Vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue,options){
    //Vue.prototype.$bus:任何组件都可以使用
    //Vue.directive自定义指令
    //Vue.component注册组件
    //Vue.filter过滤
    //全局指令
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase();
        console.log(params);
    });

}
//对外暴露组件对象
export default myPlugins;