import Vue from "vue"
import Vuex from "vuex"

import {createPersistedState} from "vuex-electron"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwLoginToken: ''
    },
    actions: {
        increment(store) {
            store.commit("increment")
        },
    },
    getters: {
        getToken: state => {
            return state.jwLoginToken
        }
    },
    mutations: {
        increment(state, Token) {
            state.jwLoginToken = Token
        },
    },

    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== "production"
})
