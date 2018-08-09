<template>
  <section class="book-app">
  
    <div class="background-img-container">
      <div class="bg flex column align-center justify-center">
        <book-filter @searchStr="updateFilter"></book-filter>
      </div>
    </div>
    <!-- <button class="create-button" @click="createBook">Create your book</button> -->
    <div class="flex justify-center">
      <book-filter-categories :categories="filterCategories"
       @searchCategorie="updateFilter" />
    </div>
    
     <h1 ref="bookList">Look. Listen. Join the wonder.</h1>
    <loader v-if="isLoad"></loader>
    <book-list  :user="user" :books="booksToShow"></book-list>
    <app-footer></app-footer>
  </section>
</template>

<script>
import {
  LOAD_BOOKS,
  BOOKS_FILTER,
  BOOKS_FOR_DISPLAY,
  UPDATE_SEARCH_FILTER
} from "../store/book-module.js";
import bookSerivce from "../services/book-service.js";

import bookList from "../components/book-list.vue";
import bookFilter from "../components/book-filter.vue";
import bookFilterCategories from "../components/book-filter-categories.vue";
import appFooter from "../components/footer-cmp.vue";
import loader from "../components/loader-cmp.vue";

export default {
  data() {
    return {
      filterCategories: bookSerivce.getCategories(),
      books: null,
      user: null,
      isLoad:true
    };
  },
  created() {
    this.loadBooks();
  },
  computed: {
    booksToShow() {
      this.books = this.$store.getters[BOOKS_FOR_DISPLAY];

      return this.books;
    }
  },
  methods: {
    loadBooks() {
      this.$store.dispatch({ type: LOAD_BOOKS })
      .then(_ => this.isLoad = false)
      .catch(err => {
        console.log("error in book app loadBooks component", err);
      });
    },
    updateFilter(filterBy) {
      this.$store.commit({ type: UPDATE_SEARCH_FILTER, filterBy });
      this.loadBooks();
      var list = this.$refs.bookList;
      this.goToList(list);
    },
    createBook() {
      this.$router.push("/bookEditor");
    },
    goToList(elToScroll) {
       if (elToScroll) {
          elToScroll.scrollIntoView()
       }
          
      }
  
  },
  components: {
    bookList,
    bookFilter,
    bookFilterCategories,
    appFooter,
    loader
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Cinzel");
.background-img-container {
  height: 300px;
  margin: 0;
}
.bg {
  /* The image used */
  background-image: url("../../public/img/background/childBlachWhite.jpeg");
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0.5rem;
 
}
 h1 {
    margin: 0 0 2rem;
    text-transform: capitalize;
    font-size: 3rem;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }

  @media (max-width:520px) {
    .bg {
        justify-content: flex-end;
    }
    
  }
</style>
