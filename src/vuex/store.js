import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	sid: "",
	token:""
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
		}
	}
})
