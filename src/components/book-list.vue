   <template>
        <section>
            <ul class="clean-list flex-warp justify-center">
                <li v-for="(book,idx) in books" :key="idx" @click="watchBook(book._id)">
                    <book-preview  :book="book" title="show book">
                        <div class="ctr-btn flex">
                        <button @click.stop="editBook(book._id)" class="btn-icon ">
                         <font-awesome-icon icon="edit" />
                        </button>
                         <button @click.stop="deleteBook(book._id)" class="btn-icon ">
                         <font-awesome-icon icon="trash-alt" />
                        </button>
                        </div>
                    </book-preview>
                </li>
            </ul>
        </section>
    </template>

<script>
import bookPreview from "./book-preview.vue";
import { UPDATE_SEARCH_FILTER ,DELETE_BOOK} from "../store/book-module.js";


export default {
  name: "boookList",
  props: {
    books: Array,
    user:Object
  },
  methods:{
      watchBook(bookId){
          var filterBy = {}
          this.$store.commit({ type: UPDATE_SEARCH_FILTER, filterBy});
          var url = `/book/${bookId}`
          this.$router.push(url)
      },
      editBook(bookId){
        this.$router.push(`/bookEditor/${bookId}`)
      },
      deleteBook(bookId){
        this.$store.dispatch({ type: DELETE_BOOK, bookId});

      }
  },
  components: {
    bookPreview
  }
};
</script>

<style scoped lang="scss">


</style>
