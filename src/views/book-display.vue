<template>
    <section>
<button @click="play('http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3')">play</button>
book read
<div v-if="book" >
       <div>
           <button class="btn-page-control" :class="[disabledNextBtn ? 'btnDisabled' : '']" 
           @click="movePage(+1)">
               next page
           </button>

             <button @click="movePage(-1)" class="btn-page-control" :class="[disabledPrevtBtn ? 'btnDisabled' : '']" >
               prev page
           </button>
       </div>
   <book-page  :pageData= "getPage">
   </book-page>
</div>
    </section>
</template>

<script>
import { LOAD_BOOK } from "../store/book-module.js";
import bookPage from "../components/book-page.vue";

export default {
  name: "bookReading",
  data() {
    return {
      book: null,
      currPage: null,
      currPageIdx: 0
    };
  },
  created() {
    var bookId = this.$route.params.bookId;
    this.getBook(bookId);
  },
  computed: {
    pageImg() {
      console.log(this.book.pages[0].imgUrl);
      return this.book.pages[0].imgUrl;
    },
    getPage() {
      return this.currPage;
    },
    disabledNextBtn(){
        return this.currPageIdx === this.book.pages.length - 1 
    },
     disabledPrevtBtn(){
        return this.currPageIdx === 0
    }
  },
  methods: {
    play(sound) {
      var audio = new Audio(sound);
      audio.play();
    },
    movePage(opartor) {
      var currIdx = this.currPageIdx;
      if (opartor === 1) {
        if (currIdx < this.book.pages.length - 1) {
          this.currPageIdx += opartor;
          this.currPage = this.book.pages[this.currPageIdx];
        }
      } else {
          if (currIdx  > 0) {
          this.currPageIdx += opartor;
          this.currPage = this.book.pages[this.currPageIdx];
        }
      }
      
    },
    getBook(bookId) {
      this.$store.dispatch({ type: LOAD_BOOK, bookId: bookId }).then(book => {
        var book = JSON.parse(JSON.stringify(book));
        console.log('book in dispaly',book)
        // book.pages.forEach(page => {

        //   page.imgUrl = "./img/books/page9.jpg";
        // });
        this.book = book;
        this.currPage = book.pages[0];
      });
    }
  },
  components: {
    bookPage
  }
};
</script>

<style scoped>
.btn-page-control.btnDisabled{
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
