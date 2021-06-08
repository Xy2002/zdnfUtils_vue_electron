import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js'
import App from './App.vue'
import store from './store'
import electron from 'electron'

Vue.prototype.$electron = electron;


Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
