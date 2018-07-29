  <template>
        <section>
          <router-link to="/bookEditor">Add Book</router-link>
            <div class="background-img-container">
                <div class="bg flex align-center justify-center">
                  <div>
                    <h1>Online book</h1>
                   <book-filter @searchStr="updateFilter"></book-filter>
                  </div>
                </div>
            </div>
             <book-filter-categories :categories="filterCategories" @searchCategorie="updateFilter"></book-filter-categories>
            <book-list :books="books"></book-list>
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



export default {
  data(){
   return{
      filterCategories:bookSerivce.getCategories(),
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
    }
  },
  components: {
    bookList,
    bookFilter,
    bookFilterCategories
  }
};
</script>

<style lang="scss">
.background-img-container {
  height: 400px;
  margin: 0 0 40px 0;
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
  }
}
</style>
