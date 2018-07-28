<template>
    <section class="book-filter">
        <input placeholder="Serach a book or author" type="search" v-model="filterBy.byTxt" class="filter-input"
         @input="$emit('searchStr',filterBy)">
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
  mounted() {
    var filter = this.$store.getters[BOOKS_FILTER];
    this.filterBy.byTxt = filter.byTxt;
  }

  // computed:{
  //     filter() {
  //         return this.$store.getters[BOOKS_FILTER]
  //     },
  //     searchStr: {
  //         get: function () {
  //             return this.filter.byTxt
  //         },
  //         set: function (searchStr) {
  //             this.$store.commit({ type: UPDATE_SEARCH_FILTER, searchStr })
  //         }
  //     }
  // },
  // methods: {
  //     loadBooks(){
  //         this.$store.dispatch(LOAD_BOOKS)
  //     }
  // }
};
</script>

<style>
</style>
