<template>
    <section>
        book appp
        <pre>{{books}}</pre>
    </section>
</template>

<script>
import { LOAD_BOOKS, BOOKS_FOR_DISPLAY } from "../store/book-module.js";
export default {
  data() {
    return {
      books: []
    };
  },
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
      this.$store.dispatch({ type: LOAD_BOOKS });
    }
  }
};
</script>

<style>
</style>
