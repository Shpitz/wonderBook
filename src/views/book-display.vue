<template>
    <section>
<div v-if="book" >
       <div>
             <!-- <button @click="movePage(-1)" class="btn-page-control" :class="[disabledPrevtBtn ? 'btnDisabled' : '']" > -->
             <button @click="manualMovePage(-1)" class="btn-page-control" :class="[disabledPrevtBtn ? 'btnDisabled' : '']" >
               prev page
           </button>
           <button class="btn-page-control" :class="[disabledNextBtn ? 'btnDisabled' : '']" 
           @click="manualMovePage(+1)">
               next page
           </button>

       </div>
        <p>
      <audio
        ref="audio"
        src="./audio/book2.mp3"
        @timeupdate="onTimeUpdate"
        @seeking="onSeeking"
        controls
        autoplay/>
    </p>
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
      currPageIdx: 0,
      currentTime: 0
    };
  },
  created() {
    var bookId = this.$route.params.bookId;
    this.getBook(bookId);
  },
  mounted() {},
  computed: {
    pageImg() {
      return this.book.pages[0].imgUrl;
    },
    getPage() {
      return this.currPage;
    },
    disabledNextBtn() {
      return this.currPageIdx === this.book.pages.length - 1;
    },
    disabledPrevtBtn() {
      return this.currPageIdx === 0;
    }
  },
  methods: {
    movePage(opartor) {
      var currIdx = this.currPageIdx;
      if (opartor === 1) {
        if (currIdx < this.book.pages.length - 1) {
          this.currPageIdx += opartor;
          this.currPage = this.book.pages[this.currPageIdx];
          // this.onTimeUpdate(this.currPage.time)
        }
      } else {
        if (currIdx > 0) {
          this.currPageIdx += opartor;
          this.currPage = this.book.pages[this.currPageIdx];
        }
      }
    },
    getBook(bookId) {
      this.$store.dispatch({ type: LOAD_BOOK, bookId: bookId }).then(book => {
        var book = JSON.parse(JSON.stringify(book));
        console.log("book in dispaly", book);
        this.book = book;
        this.currPage = book.pages[0];
      });
    },
    onTimeUpdate(ev, value = null) {
      this.currentTime = this.$refs.audio.currentTime;
      if (this.currPageIdx + 1 === this.book.pages.length) return;
      if (this.currentTime >= this.book.pages[this.currPageIdx + 1].time) {
        this.movePage(+1);
      }
    },
    onSeeking() {
    // TODO:ERROR ON SKEEPING WHEN POUSED
        var currIdx = this.book.pages.findIndex(page => {
          return page.time >= this.currentTime;
        });
        this.currPageIdx = currIdx - 1;
        this.currPage = this.book.pages[this.currPageIdx];
     
    },
    manualMovePage(op) {
      this.movePage(op);
      var currPageTime = this.currPage.time;
      this.currentTime = currPageTime;
      this.$refs.audio.currentTime = currPageTime;
    }
  },
  components: {
    bookPage
  }
};
</script>

<style scoped>
.btn-page-control.btnDisabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
