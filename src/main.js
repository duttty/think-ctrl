// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$msg = function(payload) {
  store.commit('setVisible', payload)
}
Vue.prototype.$msg.success = function(payload) {
  store.commit('setVisible', { color: 'success', content: payload })
}
Vue.prototype.$msg.error = function(payload) {
  store.commit('setVisible', { color: 'error', content: payload })
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
