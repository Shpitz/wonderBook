 <template>
        <section>

            <div class="background-img-container">
                <div class="bg">
                </div>
            </div>
            <!-- <book-cat></book-cat> -->
            <book-filter @searchStr="updateFilter"></book-filter>
           <!-- <book-cat @searchCategorie="updateFilter"></book-cat> -->
            <book-list :books="books"></book-list>
        </section>
    </template>

<script>
import {
  LOAD_BOOKS,
  BOOKS_FOR_DISPLAY,
  UPDATE_SEARCH_FILTER
} from "../store/book-module.js";

import bookList from "../components/book-list.vue";
import bookFilter from "../components/book-filter.vue";
import bookCat from "../components/book-cat.vue"



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
      this.$store.dispatch({ type: LOAD_BOOKS }).catch(err => {
        console.log("error in book app loadBooks component", err);
      });
    },
    updateFilter(filterBy) {
      debugger
      this.$store.commit({ type: UPDATE_SEARCH_FILTER, filterBy});
      this.loadBooks()
    }
  },
  components: {
    bookList,
    bookFilter
  }
};
</script>

<style>
.background-img-container {
  height: 400px;
  margin: 0 0 40px 0;
}
.bg {
  /* The image used */
  background-image: url("../../public/img/background.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
