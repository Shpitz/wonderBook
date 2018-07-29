import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './plugins/vuetify.js'
import './registerServiceWorker';
import './filters.js'
import './assets/scss/style.scss';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faEnvelope, faBell, faBook, faCalendarAlt, faEye, faMapMarkerAlt, faClock, faStar, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faEnvelope, faBell, faBook, faCalendarAlt, faEye, faMapMarkerAlt,
  faClock, faStar, faForward,
  faBackward)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
