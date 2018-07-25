import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/book-app.vue';
import About from './views/About.vue';
import bookDetails from './views/book-details.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/book/:bookId',
      name: 'bookDetails',
      component: bookDetails,
    }
  ],
});
