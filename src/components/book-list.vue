   <template>
        <section>
            <ul class="clean-list flex-warp justify-center">
                <li v-for="(book,idx) in books" :key="idx">
                    <book-preview :book="book"></book-preview>
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
  components: {
    bookPreview
  }
};
</script>

<style scoped>

</style>
