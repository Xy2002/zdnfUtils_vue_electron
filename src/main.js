import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    jwLoginToken: ''
  },
  mutations: {
    increment(state, Token) {
      state.jwLoginToken = Token
    }
  },
  getters: {
    getToken: state => {
      return state.jwLoginToken
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
