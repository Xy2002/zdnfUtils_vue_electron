import Vue from "vue"
import Vuex from "vuex"

import {createPersistedState} from "vuex-electron"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwLoginToken: '',
        serverToken:''
    },
    actions: {
        increment(store) {
            store.commit("increment")
        },

    },
    getters: {
        getToken: state => {
            return state.jwLoginToken
        },
        getServerToken: state => {
            return state.serverToken
        }
    },
    mutations: {
        increment(state, Token) {
            state.jwLoginToken = Token
        },
        incrementServerLogin(state,Token){
            state.serverToken = Token
        }
    },

    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== "production"
})
