<template>
        <section  class="book-details section-container" >
          <div v-if="book" class="flex">
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
              <p>" {{book.description}} "</p>
              <div class="hr"></div>
                <div class="flex column space-around">
                <h4 class="italic">Wrriten by {{book.author}}</h4>
                <h4 class="italic last">Illustrated by {{book.illustrator}}</h4>
                </div>
                
            <ul class="details flex justify-center space-between align-center no-padding clean-list">
                <li>
                    <font-awesome-icon class="star" icon="star" /> {{book.rating}}</li>
                <li>
                    <font-awesome-icon class="icon" icon="eye" /> {{book.views}}</li>
                <li>
                    <font-awesome-icon class="clock" icon="clock" /> {{book.duration}}</li>
                <li> <font-awesome-icon class="clock" icon="calendar-alt" /> {{book.createdAt | date-format}}</li>
            </ul>
             <book-filter-categories @@searchCategorie="updateFilter" :categories="bookCategories" ></book-filter-categories>
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
      // this.$router.push(`/contact`);
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
    background-color: #0000006e;
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
    color: $dark-main-color;
  }
  .play-ctr {
    transform: scale(1.2);
  }
}

.txt-details {
  width: 40%;
  h4 {
    margin: 0;
  }
  h4.last {
    margin: 0 0 1rem;
  }
}

// .page-container {
//   box-shadow: 0 3px 7px 3px rgba(0, 0, 0, 0.1);
//   border-radius: 5px;
//   padding: 15px;
//   color: $main-color;

// }
// .details-img-wrap {
//   align-items: center;
//   width: 50%;
//   border-right: solid 1.2px rgba(128, 128, 128, 0.568);
// }

// .details-img-wrap img {
//   width: 80%;
//   height: 80%;
// }
// .details-container {
//   width: 50%;
//   margin: 5px;
//   padding: 20px;
// }
// .details-container div{
//     margin: 0 0 10px;
// }
// .details-title {
//   font-size: 2.3em;
//   font-family: Gaegu;
// }

// .tag {
//   display: inline-block;
//   padding: 0.4em 1.2em;
//   margin: 0 0.1em 0.1em 0;
//   border: 0.16em solid rgba(255, 255, 255, 0.863);
//   border-radius: 2em;
//   font-weight: 300;
//   text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
//   text-align: center;
//   transition: all 0.2s;
//   background: rgba(153, 226, 151, 0.966);
// }

// .tag:hover {
//   border-color: rgb(7, 73, 12);
// }

// .play-book {
//   display: inline-block;
//   padding: 0.4em 1.2em;
//   margin: 0 0.1em .5em 0;
//   border: 0.16em solid rgba(255, 255, 255, 0);
//   border-radius: 2em;
//   font-weight: 500;
//   font-size: 1.5em;
//   text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
//   transition: all 0.2s;
//   background: rgba(153, 226, 151, 0.966);
//   color:inherit;
// }
// .play-book:hover {
//   border-color: rgb(7, 73, 12);
// }
</style>
