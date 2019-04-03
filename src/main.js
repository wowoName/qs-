// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';
//axios
import axiosC from '@/assets/httpRequest';
import "@/assets/fontStyle.css";
//IE 下空白 
import 'babel-polyfill';
//图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/images/userDefault.png',
  loading: '../static/images/loading.gif',
  attempt: 2
});
//下拉刷新 上拉加载
import VueScroller from 'vue-scroller';
Vue.use(VueScroller)
Vue.prototype.ajax = new axiosC();
//px to rem
import '@/assets/rem';
Vue.config.productionTip = false;
import {
  ToastPlugin,
  LoadingPlugin,
  ConfirmPlugin
} from 'vux';
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
