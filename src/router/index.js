import Vue from 'vue'
import Router from 'vue-router'
import Profile from '../components/Profile.vue'
import Login from '../components/Login.vue'
import Entries from '../components/Entries.vue'
import Reports from '../components/Reports.vue'
import allUsers from '../components/allUsers.vue'
import User from '../components/User.vue'
import AboutUs from '../components/AboutUs.vue'
import allEntries from '../components/allEntries.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/entry/users/:id', component: Entries },
    { path: '/reports/:id', component: Reports },
    { path: '/allUsers', component: allUsers },
    { path: '/user/:id', component: User },
    { path: '/aboutus', component: AboutUs },
    { path: '/allEntries', component: allEntries },
    { path: '*', redirect(to) {
      alert('Page not found')
      return '/aboutus'
    }}
  ]
})
