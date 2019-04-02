import Vue from 'vue'
import Router from 'vue-router'
import store from "@/vuex/store";
//首页tab
import Index from '@/components/Index';
//首页
import Home from '@/components/Home';
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

import List from "@/components/List";
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
		path: '/home',
		name: "home",
		component: Home,
		meta: {
			keepAlive: true,
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
			savedPosition:{
				top0:0,
				top1:0,
				top2:0
			}
		}
	}, {
		path: '/searchFans',
		name: 'searchFans',
		component: SearchFans
	}, {
		path: '/order',
		name: 'order',
		component: Order,
		meta: {
			keepAlive: true,
			requireAuth: true,
			savedPosition:{
				top0:0,
				top1:0,
				top2:0,
				top3:0
			}
		}
	},{
		path: '/list',
		name: 'list',
		component: List
	}]
});


function getLocal() {
	if (window.localStorage.getItem("quansuIds"))
		store.state.userIds = window.localStorage.getItem("quansuIds");
}
//路由跳转拦截拦截
router.beforeEach((to, from, next) => {
	getLocal();
	// 判断该路由是否需要登录权限
	if (to.meta.requireAuth) {
		if (store.state.userIds) // 通过vuex state获取当前的token是否存在【 true 进行下一步】
			next();
		else //没有登录状态 返回到登录页 
			next({
				path: '/login'
			});
	} else
		next();
});
export default router;