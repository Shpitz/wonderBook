<template>
    <section>
<div v-if="book" >
       <div>
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
        :src="book.audio"
        @timeupdate="onTimeUpdate"
        @seeking="onSeeking"
        controls
        autoplay/>
    </p>
   <book-page  :pageData= "getPage" :parIdx= "getParIdx">
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
      currentTime: 0,
      currPar: null,
      currParIdx: 0
    };
  },
  created() {
    var bookId = this.$route.params.bookId;
    this.getBook(bookId);
  },
  mounted() {},
  computed: {
    getParIdx() {
      return this.currParIdx;
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
          this.currParIdx = 0;
          this.currPar = this.currPage.paragraphs[this.currParIdx];
        }
      } else {
        if (currIdx > 0) {
          this.currPageIdx += opartor;
          // debugger;
          this.currPage = this.book.pages[this.currPageIdx];
          this.currParIdx = 0;
          this.currPar = this.currPage.paragraphs[this.currParIdx];
        }
      }
    },
    movePar() {
      this.currParIdx += 1;
      this.currPar = this.currPage.paragraphs[this.currParIdx];
    },
    getBook(bookId) {
      this.$store.dispatch({ type: LOAD_BOOK, bookId: bookId }).then(book => {
        var book = JSON.parse(JSON.stringify(book));
        // console.log("book in dispaly", book);
        this.book = book;
        this.currPage = book.pages[0];
        this.currPar = book.pages[0].paragraphs[0];
      });
    },
    onTimeUpdate(ev, value = null) {
      this.currentTime = this.$refs.audio.currentTime;
      var currBookPages = this.book.pages;
      var currPage = currBookPages[this.currPageIdx];

      // console.log("this.currParIdx", this.currParIdx);
      console.log(
        "paragraphs[this.currParIdx]",
        currPage.paragraphs[this.currParIdx].txt
      );
      // if (
      //   this.currentTime >= currPage.paragraphs[this.currParIdx].parStartTime
      // ) {
      //   if (currPage.paragraphs.length !== this.currParIdx + 1) {
      //     this.movePar();
      //   }
      // }

      if (this.currParIdx + 1 === currPage.paragraphs.length) {}
      else if(this.currentTime >= currPage.paragraphs[this.currParIdx + 1].parStartTime) {
        this.movePar();
      }
      if (this.currPageIdx + 1 === currBookPages.length) return;
      if (this.currentTime >= currBookPages[this.currPageIdx + 1].time) {
        this.movePage(+1);
      }
    },
    onSeeking() {
      if (this.currentTime < this.book.pages[1].time) {
        this.currPageIdx = 0;
        this.currPage = this.book.pages[this.currPageIdx];
      } else if (
        this.currentTime > this.book.pages[this.book.pages.length - 1].time
      ) {
        this.currPageIdx = this.book.pages.length - 1;
        this.currPage = this.book.pages[this.currPageIdx];
      } else {
        var currIdx = this.book.pages.findIndex(page => {
          return page.time >= this.currentTime;
        });
        this.currPageIdx = currIdx - 1;
        this.currPage = this.book.pages[this.currPageIdx];
      }
      this.currParIdx = 0;
      this.currPar = this.currPage.paragraphs[this.currParIdx];
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
