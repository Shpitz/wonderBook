  <template>
    <section class="book-details section-container">
      <div v-if="book" class="book-details-cotainer flex">
        <div class="img-details">

          <h1>{{book.title}}</h1>
          <div class="relative" @click="playBook()">
            <div class="play-mask absolute flex">
              <div class="play-ctr flex">
                <div class="flex align-center justify-center">
                  <font-awesome-icon class="icon" icon="play" />
                </div>
              </div>
            </div>
            <img :src="book.coverImg" alt="">
          </div>
        </div>
        <div class="txt-details">

          <div class="txt-details-container flex column">
            <!-- <div> -->
              <button @click.stop="editBook" class="editor-btn editor-regular-btn edit-btn">
                <font-awesome-icon icon="edit" />
              </button>
            <!-- </div> -->
            <p>" {{book.description}} "</p>
            <div class="hr"></div>
            <div class="flex column space-around">
              <h4 class="italic">Wrriten by {{book.author}}</h4>
              <h4 class="italic last">Illustrated by {{book.illustrator}}</h4>
            </div>
            <ul class="details flex justify-center space-between align-center no-padding clean-list">
              <li><font-awesome-icon class="star" icon="star" /> {{book.rating}}</li>
              <li><font-awesome-icon class="icon" icon="eye" /> {{book.views}}</li>
              <li><font-awesome-icon class="clock" icon="clock" /> {{book.duration}}</li>
              <li><font-awesome-icon class="clock" icon="calendar-alt" /> {{book.createdAt | date-format}}</li>
            </ul>
          </div>
          <book-filter-categories class="categories-filter" @searchCategorie="updateFilter" :categories="bookCategories"></book-filter-categories>
        </div>
      </div>
    </section>
  </template>

<script>
import { LOAD_BOOK,UPDATE_SEARCH_FILTER } from "../store/book-module.js";
import bookFilterCategories from "../components/book-filter-categories.vue";

export default {
  name: "bookDetails",
  data() {
    return {
      book: null
    };
  },

  created() {
    let bookId = this.$route.params.bookId;
    this.$store
      .dispatch({ type: LOAD_BOOK, bookId })
      .then(book => (this.book = book));
  },
  computed: {
    bookCategories() {
      var bookCat = [];
      return (bookCat = this.book.categories.map((cat, idx) => {
        return (bookCat[idx] = { catTxt: cat, img: "" });
      }));
    }
  },

  methods: {
    playBook() {
      this.$router.push(`/bookReading/${this.book._id}`);
    },
     updateFilter(filterBy) {
      this.$store.commit({ type: UPDATE_SEARCH_FILTER, filterBy});
      this.$router.push(`/`);
    },
    editBook() {
      this.$router.push(`/bookEditor/${this.book._id}`)
    }
  },
  components: {
    bookFilterCategories
  }
};
</script>

<style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

.book-details {
  font-family: "Merriweather", sans-serif;
}
.hr {
  height: 1px;
  background-color: pink;
  margin: 0 0 1rem;
}

.edit-btn {
  width: fit-content;
    align-self: flex-end;
    background-color: #dedede
}

.edit-btn:hover{
  background-color: #546196;
}

.img-details {
  cursor: pointer;
  width: 60%;
  margin: 0 1rem 0 0;

  img {
    box-shadow: 0 3px 7px 3px rgba(0, 0, 0, 0.1);
    object-fit: cover;
    width: 100%;
  }
  .play-mask {
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .play-ctr {
    background-color: $container-bg;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    div {
      width: 80%;
      height: 80%;
      border-radius: inherit;
      border: 1px solid;
    }
  }
}

.img-details:hover {
  .play-mask {
    color: $main-color-hover;
  }
  .play-ctr {
    transform: scale(1.2);
  }
}

.txt-details {
  width: 40%;
  float:right;
  h4 {
    margin: 0;
  }
  h4.last {
    margin: 0 0 1rem;
  }
}

@media(max-width: 600px) {
  .book-details-cotainer {
    flex-direction: column;
  }
  .img-details {
  width: 100%;
  }
  .txt-details {
    width: 100%;
  }
  .txt-details-container  {
    flex-direction: column-reverse;
  }
 h1 {
       margin: 0 0 .5rem;
 }
 img {
       max-height: 350px;
 }
 
}
@media(max-width: 820px) { 
  .categories-filter {
   position: absolute;
   left:0;
 }
}

</style>
