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
      logged: false,
      background: 'background-image: url(http://sayforward.com/sites/default/files/ext_image/173cba18155e21564ba37e30a1f6d308.jpg?1270618257); background-size: 2000px; background-repeat: no-repeat; background-position:top; border-left: 3px solid; border-right: 3px solid; width: 60%;'
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
