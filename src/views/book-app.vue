  <template>
        <section class="book-app">
            <div class="background-img-container">
                <div class="bg flex align-center justify-center">
                  <div>
                    <h1><span class="black">Online</span>  <span class="white"> book</span></h1>
                   <book-filter @searchStr="updateFilter"></book-filter>
                  </div>
                </div>
            </div>
            <div class="flex space-between">
             <book-filter-categories :categories="filterCategories" @searchCategorie="updateFilter"/>
               <button class="create-btn" @click="createBook">Cretae your book</button>
            </div>
            <book-list :user="user" :books="books"></book-list>
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




export default {
  data(){
   return{
      filterCategories:bookSerivce.getCategories(),
      user:null
   }
  },
  created() {
    this.loadBooks();
   
  },
  computed: {
    books() {
      return this.$store.getters[BOOKS_FOR_DISPLAY];
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
  }
};
</script>

<style lang="scss">
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
  h1 {
  
      text-transform: capitalize;
    .black {
      margin: 0 .5rem;
      color:black;
    }
    .white {
      color:white;
    }
  }
}
</style>
