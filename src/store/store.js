import Vue from 'vue';
import Vuex from 'vuex';
import bookModule from './book-module.js'
import userModule from './user-module.js'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bookModule,
    userModule
  },

  mutations: {

  },
  actions: {

  },
});
