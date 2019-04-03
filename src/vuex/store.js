import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	sid: ""
};
export default new Vuex.Store({
	state,
	mutations: {
		//保存用户的sessionID
		setSid(state, id) {
			state.sid = id;
		}
	}
})
