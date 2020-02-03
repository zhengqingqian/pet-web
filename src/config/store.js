import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userInfo: null,
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload;
        }
    }
})