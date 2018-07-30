import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
// import './plugins/vuetify.js'
import VAnimateCss from 'v-animate-css';


import './registerServiceWorker';
import './filters.js'
import './assets/scss/style.scss';
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)


import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faEnvelope, faBell, faBook, faCalendarAlt, faEye, faMapMarkerAlt, faClock, faStar, faForward, faBackward, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faEnvelope, faBell, faBook, faCalendarAlt, faEye, faMapMarkerAlt,
  faClock, faStar, faForward, faBackward,faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;
Vue.use(VAnimateCss);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
