import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import './filters.js'
import './assets/scss/style.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faEnvelope, faBell, faBook} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faEnvelope, faBell, faBook)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
