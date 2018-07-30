<template>
        <section  class="section-container" >
          <div v-if="book" class="flex space-between page-container">
        <div class="details-img-wrap flex justify-center">
            <img :src="book.coverImg" alt="">
        </div>
        <div class="details-container" >
            <div class="details-title">
                <h1>{{book.title}}</h1>
            </div>
            <div class="flex space-around">
                <h6 class="italic no-margin">Wrriten by {{book.author}}</h6>
                <h6 class="italic no-margin">Illustrated by {{book.illustrator}}</h6>

            </div>
                <button class="play-book " @click="playBook()">Play Book</button>

            <ul class="details flex justify-center space-between align-center no-padding clean-list">
                <li>
                    <font-awesome-icon class="star" icon="star" /> {{book.rating}}</li>
                <li>
                    <font-awesome-icon class="icon" icon="eye" /> {{book.views}}</li>
                <li>
                    <font-awesome-icon class="clock" icon="clock" /> {{book.duration}}</li>
                <li> <font-awesome-icon class="clock" icon="calendar-alt" /> {{book.createdAt | date-format}}</li>
            </ul>

       <div class="details-description">
                <p>" {{book.description}} "</p>
            </div>
            <div class="flex categories space-around">
                <ul>
                    <li v-for="(category, idx) in book.categories" :key="idx" class="clean-list tag flex align-center">
                        <span>{{category}}</span>
                    </li>
                </ul>
            </div>
        </div>
     </div>
    </section>

</template>

<script>
import { LOAD_BOOK } from "../store/book-module.js";

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
 
  methods: {
    playBook() {
      this.$router.push(`/bookReading/${this.book._id}`);
    },
    
  }
};
</script>

<style scoped lang="scss">
@import './src/assets/scss/_vars.scss';



.page-container {
  box-shadow: 0 3px 7px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
  color: $main-color;

}
.details-img-wrap {
  align-items: center;
  width: 50%;
  border-right: solid 1.2px rgba(128, 128, 128, 0.568);
  /* margin: 5px; */
}
.details-img-wrap img {
  width: 80%;
  height: 80%;
}
.details-container {
  width: 50%;
  margin: 5px;
  padding: 20px;
}
.details-container div{
    margin: 0 0 10px;
}
.details-title {
  font-size: 2.3em;
  font-family: Gaegu;
}

.tag {
  display: inline-block;
  padding: 0.4em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255, 255, 255, 0.863);
  border-radius: 2em;
  font-weight: 300;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  background: rgba(153, 226, 151, 0.966);
}

.tag:hover {
  border-color: rgb(7, 73, 12);
}

.play-book {
  display: inline-block;
  padding: 0.4em 1.2em;
  margin: 0 0.1em .5em 0;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  font-weight: 500;
  font-size: 1.5em;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  transition: all 0.2s;
  background: rgba(153, 226, 151, 0.966);
  color:inherit;
}
.play-book:hover {
  border-color: rgb(7, 73, 12);
}


</style>
