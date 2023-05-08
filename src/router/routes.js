//引入路由组件
import Register from '@/pages/Register'
import Login from '@/pages/Login'
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import GroupOrder from '@/pages/Center/GroupOrder'
import MyOrder from '@/pages/Center/MyOrder'

/*
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回,
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/

export default [
    {
        name: 'detail',
        path: '/detail/:skuId?',
        component: Detail,
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta:{"isShow": true}   //自定义元数据属性，判断Footer组件在底部是否显示
    },
    {
        name: 'search',
        //:keyword?    其中的？可以理解成正则中的问号，代表出现0次或1次，这样就能进行控制params参数传递与不传递
        path: '/search/:keyword?',
        component: Search,
        meta:{"isShow": true}   //自定义元数据属性，判断Footer组件在底部是否显示
    },
    {
        path: '/register',
        component: Register,
        meta:{"isShow": false}  //自定义元数据属性，判断Footer组件在底部是否显示
    },
    {
        path: '/login',
        component: Login,
        meta:{"isShow": false}  //自定义元数据属性，判断Footer组件在底部是否显示
    },
    //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: "/home",
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: AddCartSuccess,
        meta:{"isShow": true}   //自定义元数据属性，判断Footer组件在底部是否显示
    },
    {
        name: 'shopCart',
        path: '/shopCart',
        component: ShopCart,
        meta:{"isShow": true}   //自定义元数据属性，判断Footer组件在底部是否显示
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta:{"isShow": true},   //自定义元数据属性，判断Footer组件在底部是否显示
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车而来
            if (from.path == "shopCart") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta:{"isShow": true}   //自定义元数据属性，判断Footer组件在底部是否显示
    },
    {
        name: 'paySuccess',
        path: '/paySuccess',
        component: PaySuccess,
        meta:{"isShow": true},   //自定义元数据属性，判断Footer组件在底部是否显示
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车而来
            if (from.path == "pay") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta:{"isShow": true},   //自定义元数据属性，判断Footer组件在底部是否显示
        children: [ //通过children配置子级路由
            {
                path: 'myOrder',
                component: MyOrder,
            },
            {
                path: 'groupOrder',
                component: GroupOrder,
            },
            {
                path: '',
                redirect: 'myorder'
            }
        ]
    },
]