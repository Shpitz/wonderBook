<template>
    <section>
      
        <div class="background-img-container"><div class="bg"></div></div>

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
.background-img-container{
  height: 400px;
  margin: 0 0 40px 0;
}
.bg { 
    /* The image used */
    background-image: url('../../public/img/background.jpg');

    /* Full height */
    height: 100%; 

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

</style>
