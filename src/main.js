import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  data () {
    return {
      token: '',
      user: {},
      logged: false
    }
  },
  http: {
    root: '/root',
    headers: {
      Authorization: 'Bearer ' + this.token
    }
  }
})

// this.$root.test
