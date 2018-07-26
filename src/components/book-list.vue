   <template>
        <section>
            <ul class="clean-list flex-warp justify-center">
                <li v-for="(book,idx) in books" :key="idx" @click="watchBook(book._id)">
                    <book-preview  :book="book">
                        <button @click.stop="editBook(book._id)" class="btn-icon">
                         <font-awesome-icon icon="edit" />
                        </button>
                    </book-preview>
                </li>
            </ul>
        </section>
    </template>

<script>
import bookPreview from "./book-preview.vue";

export default {
  name: "boookList",
  props: {
    books: Array
  },
  methods:{
      watchBook(bookId){
          var url = `/book/${bookId}`
          this.$router.push(url)
      },
      editBook(bookId){
        //   TODO:when edit willbeReady
      }
  },
  components: {
    bookPreview
  }
};
</script>

<style scoped>
.btn-icon {
    border: none;
    background: transparent;
    padding: 10px;
    outline: none;
}
.btn-icon:hover {
   color: cornflowerblue;
}
</style>
