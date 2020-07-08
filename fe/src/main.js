// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import sweetalert from 'sweetalert'
import Icon from 'vue-awesome/components/Icon'
import * as VueGoogleMaps from 'vue2-google-maps'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/vue-awesome/icons'
import fam from '../node_modules/fontawesome-markers/fontawesome-markers.json'
import cfg from '../static/cfg'

moment.locale('ko')

Vue.prototype.$axios = axios
Vue.prototype.$cfg = cfg
Vue.prototype.$moment = moment
Vue.prototype.$sweetalert = sweetalert
Vue.prototype.$fam = fam

Vue.component('icon', Icon)

Vue.use(BootstrapVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
  // installComponents: true,
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
