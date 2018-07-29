<template>
    <section class="book-filter">
        <input placeholder="Serach a book or author" type="search"
         v-model="filterBy.byTxt" class="filter-input"
         @input="$emit('searchStr',filterBy)">
         <p v-show="false"> {{filter}}</p>
    </section>
</template>

<script>
import {
  BOOKS_FILTER,
  UPDATE_SEARCH_FILTER,
} from "../store/book-module.js";
export default {
 
  data() {
    return {
      filterBy: {
        byTxt: ""
      }
    };
  },
  computed:{
    filter() {
          var filter =  this.$store.getters[BOOKS_FILTER]
           this.filterBy.byTxt = filter.byTxt;
           debugger
           return filter
      },
  }

};
</script>

<style>
</style>
