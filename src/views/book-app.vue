  <template>
        <section class="book-app">
            <div class="background-img-container">
                <div class="bg flex column align-center justify-center">
                    <h1>Look. Listen. Join the wonder.</h1>
                   <book-filter @searchStr="updateFilter"></book-filter>
                </div>
            </div>
            <button class="create-button" @click="createBook">Cretae your book</button>
            <div class="flex justify-center">
             <book-filter-categories :categories="filterCategories" @searchCategorie="updateFilter"/>
            </div>
            <loader v-if="!books"></loader>
            <book-list :user="user" :books="booksToShow"></book-list>
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
import bookSerivce from '../services/book-service.js'

import bookList from "../components/book-list.vue";
import bookFilter from "../components/book-filter.vue";
import bookFilterCategories from "../components/book-filter-categories.vue"
import appFooter from "../components/footer-cmp.vue"
import loader from "../components/loader-cmp.vue"




export default {
  data(){
   return{
      filterCategories:bookSerivce.getCategories(),
      books:null,
      user:null
   }
  },
  created() {
    this.loadBooks();
  },
  computed: {
    booksToShow() {
      this.books  = this.$store.getters[BOOKS_FOR_DISPLAY];
      console.log('this.books is:', this.books)
      return this.books;
    },
  },
  methods: {
    loadBooks() {
      this.$store.dispatch({ type: LOAD_BOOKS }).catch(err => {
        console.log("error in book app loadBooks component", err);
      });
    },
    updateFilter(filterBy) {
      this.$store.commit({ type: UPDATE_SEARCH_FILTER, filterBy});
      this.loadBooks()
    },
    createBook(){
      this.$router.push('/bookEditor')
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Cinzel');
.background-img-container {
  height: 400px;
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
  padding: .5rem;
  h1 {
  font-family: 'Cinzel', serif;
      text-transform: capitalize;
     color: white;
    font-size: 3rem;
    text-shadow: 0 0 4px black;
  
  }
}
</style>
