
  <template>
    <section class="section-container">
      <div v-if="book">
              <last-page v-if="isLastPage" :book="book">
                <button class="btn-close editor-btn round-btn" 
                @click="isLastPageInBook = false" >
                 <font-awesome-icon  icon="times" />
                </button>
              </last-page>

        <book-page :pageData="getPage" @onImage="playPause" :previewInEdit="false" :parIdx="getParIdx" :class="[pageFlipped ? 'animated fade' : '']">
          <div class="player">
            <i class="fa fa-backward" :class="[disabledPrevtBtn ? 'btnDisabled' : '']" 
            @click.stop="manualMovePage(-1)" aria-hidden="true"></i>
            <div class="play-pause btn-page-control" @click.stop="playPause" >
              <i ref="playIcon" class="pause fa fa-pause" aria-hidden="true" id="play"></i>
            </div>
            <i class="fa fa-forward" :class="[disabledNextBtn ? 'btnDisabled' : '']"
             @click.stop="manualMovePage(+1)" aria-hidden="true"></i>
          </div>

          <div class="volume" @click.stop="toggleVolume">
            <i ref="vol" class="fa fa-volume-up" aria-hidden="true"></i>
            <div class="vol">
              <div class="go"></div>
            </div>
          </div>
        </book-page>
        <audio ref="audio" @ended="bookEnd"
        :src="book.audio" @timeupdate="onTimeUpdate" @seeking="onSeeking" 
        controls autoplay/>
      </div>
    </section>
  </template>
<script>
import { LOAD_BOOK } from "../store/book-module.js";
import bookPage from "../components/book-page.vue";
import lastPage from "../components/last-page.vue";

export default {
  name: "bookReading",
  props: ["bookIdFromEditor"],
  data() {
    return {
      book: null,
      currPage: null,
      currPageIdx: 0,
      currentTime: 0,
      currPar: null,
      currParIdx: 0,
      pageFlipped: false,
      isLastPageInBook: false
    };
  },
  created() {
    var bookId = this.$route.params.bookId;
    if (!bookId) bookId = this.bookIdFromEditor;
    this.getBook(bookId);
    if (screen.width < screen.height) {
      screen.orientation
        .lock("landscape")
        .then(_ => console.log("orientation"))
        .catch(err => console.error(err));
    }
    console.log("id from editor", this.bookIdFromEditor);
  },
  computed: {
    getParIdx() {
      return this.currParIdx;
    },
    getPage() {
      this.pageFlipped = true;
      setTimeout(() => {
        this.pageFlipped = false;
      }, 1000);
      return this.currPage;
    },
    disabledNextBtn() {
      return this.currPageIdx === this.book.pages.length - 1;
    },
    disabledPrevtBtn() {
      return this.currPageIdx === 0;
    },
    ispause() {
      return this.$refs.audio.paused;
    },
    isLastPage() {
      return this.isLastPageInBook;
    }
  },
  methods: {
    movePage(opartor) {
      if (this.currPageIdx + opartor > this.book.pages.length-1) return;
      if (this.currPageIdx + opartor < 0) return;

      this.currPageIdx += opartor;
      this.currPage = this.book.pages[this.currPageIdx];
      this.currParIdx = 0;
      this.currPar = this.currPage.paragraphs[this.currParIdx];
    },
    movePar() {
      this.currParIdx += 1;
      this.currPar = this.currPage.paragraphs[this.currParIdx];
    },
    getBook(bookId) {
      this.$store.dispatch({ type: LOAD_BOOK, bookId: bookId }).then(book => {
        var book = JSON.parse(JSON.stringify(book));
        this.book = book;
        this.currPage = book.pages[0];
        this.currPar = book.pages[0].paragraphs[0];

        // for each page check if the first paragraph doen't begins the same time the page begins
        for (let i = 0; i < this.book.pages.length; i++) {
          const page = this.book.pages[i];
          if (page.paragraphs[0].parStartTime > page.time) {
            page.paragraphs.unshift({
                txt: "",
                parStartTime: page.time,
                parEndTime: 0
              });
          }
        }

      });
    },
    onTimeUpdate(ev, value = null) {
      this.currentTime = this.$refs.audio.currentTime;
      var currBookPages = this.book.pages;
      var currPage = currBookPages[this.currPageIdx];

      // Move to next paragraph
      if (this.currParIdx + 1 === currPage.paragraphs.length) {
      } else if (
        this.currentTime >=
        currPage.paragraphs[this.currParIdx + 1].parStartTime
      ) {
        this.movePar();
      }

      // If last page - quit
      if (this.currPageIdx + 1 === currBookPages.length) return;

      // Move to next page
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
      if (this.currPageIdx + op > this.book.pages.length-1) return;
      if (this.currPageIdx + op < 0) return;

      this.movePage(op);
      var currPageTime = this.currPage.time;
      this.currentTime = currPageTime;
      this.$refs.audio.currentTime = currPageTime;
    },
    playPause() {
      var playIconClass = this.$refs.playIcon.className;
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
      this.$refs.playIcon.className =
        playIconClass === "fa fa-play" ? "pause fa fa-pause" : "fa fa-play";
    },
    toggleVolume() {
      if (this.$refs.audio.volume > 0) {
        this.$refs.audio.volume = 0;
        this.$refs.vol.className = "fa fa-volume-off";
      } else {
        this.$refs.audio.volume = 1;
        this.$refs.vol.className = "fa fa-volume-up";
      }
    },
    bookEnd() {
      this.isLastPageInBook = true;
    }
  },
  components: {
    bookPage,
    lastPage
  },
  destroyed() {
    if (screen.width < screen.height) {
      screen.orientation
        .lock("portrait")
        .then(_ => console.log("orientation"))
        .catch(err => console.error(err));
    }
  }
};
</script>

<style scoped lang="scss">
audio {
  margin: 0 0 1rem;
  display: none;
}
.btn-close {
  margin: 1rem;
  right: 0;
  position: absolute;
}
</style>
