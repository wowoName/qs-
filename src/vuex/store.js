import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
    sid: "1",
    token: "1",
    level: "0",
    refreshHome: false //是否刷首页的余额
};
export default new Vuex.Store({
    state,
    mutations: {
        //保存用户的sessionID
        setSid(state, id) {
            state.sid = id;
        },
        setToken(state, id) {
            state.token = id;
        },
        setLevel(state, level) {
            state.level = level;
        },
        //当进行完提现之后刷新首页的余额
        setRefresh(state, bol) {
            state.refreshHome = bol;
        }

    }
})