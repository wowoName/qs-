import axios from 'axios';
import qs from "qs";
import Vue from 'vue';

//终止axios的fun
let axiosToken = null,
	sid = window.localStorage.getItem("liveSession") || "",
	vm = new Vue({
		data: {
			httpCount: 0
		}
	});
//请求超时时间
axios.defaults.timeout = 3000;
axios.defaults.headers = {
	uid: 1,
	aid: 1,
	sid: sid,
	"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}
// axios拦截器
axios.interceptors.request.use(config => {
		// 在发送请求之前做些什么
		return config;
	},
	err => {
		return Promise.reject(err);
	});
axios.interceptors.response.use(
	response => {
		//请求完成token置空
		axiosToken = null;
		return response;
	},
	error => {
		//请求完成token置空
		axiosToken = null;
		//提示信息
		Vue.$vux.toast.text("请稍后再试...", 'center');
		/*if(axios.isCancel(error)) Vue.$vux.toast.text(error.message, 'center');
		else  	Vue.$vux.toast.text("请稍后再试...", 'center');*/
		return Promise.reject(error.response.data); // 返回接口返回的错误信息
	});

class HttpRequest {
	get(httpUrl, paramsData, successFun, errorFun = () => {}) {
		let httpUrls=httpUrl.replace('/agent','https://jingpincang.quansuwangluo.com')
		axios.get(httpUrls, qs.stringify(paramsData))
			.then(function(res) {
				successFun(res)
			})
			.catch(function(err) {
				//console.log("请求失败！ " + err)
				errorFun();
			})
	};
	// post请求
	post(httpUrl, paramsData, successFun, errorFun = () => {}) {
		let httpUrls=httpUrl.replace('/agent','https://jingpincang.quansuwangluo.com')
		//打包前去除代理前缀 /anget
		axios.post(httpUrls, qs.stringify(paramsData), {
				//终止请求
				cancelToken: new axios.CancelToken(function executor(c) {
					axiosToken = c;
				})
			})
			.then((res) => {
				successFun(res);
			})
			.catch((err) => {
				console.log(err);
				errorFun();
			})
	};
	//终止请求
	doCancelToken(msg = "异常") {
		if (axiosToken) axiosToken(msg);
	}
}
export default HttpRequest;
