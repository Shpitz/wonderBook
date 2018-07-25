import Vue from 'vue';
import moment from 'moment';

Vue.filter('date-format', (timestamps) => moment(timestamps).format("MMM Do YY"));