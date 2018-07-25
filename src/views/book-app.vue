<template>
    <section>
      
        book appp

        <book-list :books="books"></book-list>
    </section>
</template>

<script>
import { LOAD_BOOKS, BOOKS_FOR_DISPLAY } from "../store/book-module.js";
import bookList from '../components/book-list.vue'

export default {
  created() {
    this.loadBooks();
  },
  computed: {
    books() {
      return this.$store.getters[BOOKS_FOR_DISPLAY];
    }
  },
  methods: {
    loadBooks() {
      this.$store.dispatch({ type: LOAD_BOOKS })
        .catch((err)=> {
          console.log('error in book app loadBooks component',err)
        });
    }
  },
  components:{
      bookList
  }

};
</script>

<style>
</style>
