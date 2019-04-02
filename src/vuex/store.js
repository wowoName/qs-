import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
  userIds:"1",
	sid:""
};
export default new Vuex.Store({
  state,
  mutations: {
    //会员账号
    setUserIds(state, id) {
      state.userIds = id;
    },
		//保存用户的sessionID
		setSid(state,id){
			state.sid = id;
		}
  }
})
