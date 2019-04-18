import Vue from 'vue'
import Router from 'vue-router'
import store from "@/vuex/store";
//首页tab
import Index from '@/components/Index';
//提现
import WithDrawal from '@/components/WithDrawal';
//登录
import Login from "@/components/Login";
//我的收益
import MyIncome from "@/components/MyIncome";
//账单明细
import BillDetail from "@/components/BillDetail";
//我的粉丝
import MyFan from "@/components/MyFan";
//搜索我的粉丝
import SearchFans from "@/components/SearchFans";
//订单
import Order from "@/components/Order";
Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: "index",
        component: Index,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }, {
        path: '/withDrawal',
        name: "withDrawal",
        component: WithDrawal,
        meta: {
            requireAuth: true
        }
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/myIncome',
        name: 'myIncome',
        component: MyIncome,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }, {
        path: '/billDetail',
        name: 'billDetail',
        component: BillDetail,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }, {
        path: '/myFan',
        name: 'myFan',
        component: MyFan,
        meta: {
            keepAlive: true,
            requireAuth: true,
            savedPosition: {}
        }
    }, {
        path: '/searchFans',
        name: 'searchFans',
        component: SearchFans,
        meta: {
            requireAuth: true
        }
    }, {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }]
});

function getToken() {
    let cToken = window.localStorage.getItem("liveToken");
    if (cToken)
        store.state.token = cToken,
        store.state.level = window.localStorage.getItem("liveLevel"); //当前用户的等级
}
//路由跳转拦截拦截
router.beforeEach((to, from, next) => {
    getToken();
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        if (store.state.token) // 通过vuex state获取当前的token是否存在【 true 进行下一步】
            next();
        else //没有登录状态 返回到登录页 
            next({
            path: '/login'
        });
    } else
        next();
});
export default router;