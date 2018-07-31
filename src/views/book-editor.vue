  <template>

        <section class="flex column">
            <div v-if="book" class="editor-container flex column">
                <transition name="fade">
                    <div v-if="isFirstDetails" class="firstDetails form-style-3">
                        <form id="form" class="topBefore">
                            <input class="form-control" type=text v-model="book.title" placeHolder="Book title">
                            <input class="form-control" type=text v-model="book.author" placeHolder="Author name">
                            <input class="form-control" type=text v-model="book.illustrator" placeHolder="Illustrator name">
                            <textarea rows="5" cols="500" class="form-control" v-model="book.description" placeHolder="Book description" />
                            <v-select class="book-categories form-control" placeHolder="Categories" multiple v-model="book.categories" :options="options"></v-select>
                            <form method="POST" ref="coverImgInput" class="page-img-upload-form">
                                <div class="input-file-container">
                                    <input type="file" accept="image/*" @change.prevent="setCoverImgFile" class="input-file">
                                    <label tabindex="0" for="my-file" class="input-file-trigger">Select a file...</label>
                                </div>
                                <!-- <p class="file-return"></p> -->
                            </form>

                            <div class="first-details-btn-container">
                                <input type="submit" @click.prevent="saveDetails" value="Save">
                                <input type="button" @click.prevent="cancelFirstDetails" value="Cancel">
                            </div>
                        </form>
                    </div>
                </transition>
                <button v-if="!isFirstDetails" @click="editBookDetails" class="editor-btn editor-regular-btn details-btn self-start"> Book Details</button>

                <div class="audio-area flex column align-center">
                    <form action="" ref="audioInput" class="page-form">
                        <div class="input-file-container">
                            <input type="file" accept="audio/*" @change.prevent="setAudioFile" class="input-file">
                            <label tabindex="0" for="my-file" class="input-file-trigger">Select a file...</label>
                        </div>
                    </form>
                    <div class="flex align-center">
                        <audio ref="audio" :src="book.audio" controls />
                        <button @click="setTimingPage" class="set-btn editor-btn editor-regular-btn ">Set page Timing</button>
                        <input type="text" class="input-samll" v-model="book.pages[currPageIdx].time">
                    </div>
                    <h1 :class="[book.title === '' ? 'hidden': '']">{{book.title}}</h1>
                </div>

                <div class="page-container flex column">
                    <div class="flex page-ctr">
                        <form method="POST" class="img-form page-form " ref="imgInput">
                            <div class="input-file-container ">
                                <input type="file" accept="image/*" @change.prevent="setImgFile" class="input-file">
                                <label tabindex="0" for="my-file" class="input-file-trigger">Select a file...</label>
                            </div>
                        </form>
                        <div class="page-ctr-btn flex align-center">
                            <h1>Page {{currPageIdx+1}}</h1>
                            <button class="editor-btn round-btn set-btn" title="Add page" @click="addPage">
                                <font-awesome-icon class="icon" icon="file-upload" />
                            </button>
                            <button class="editor-btn round-btn" title="Delete page" @click="deletePage(currPageIdx)">
                                <font-awesome-icon class="icon" icon="trash-alt" />
                            </button>
                        </div>
                    </div>

                    <div class="page-area">
                        <div class="img-container" :style="{ backgroundImage: 'url(' + book.pages[currPageIdx].img + ')' }">
                            <div class="par-area flex column">
                                <button title="Add paragraf" class="editor-btn self-end round-btn" @click="addPar">
                                    <font-awesome-icon class="icon" icon="plus-circle" />
                                </button>
                                <ul class="par-list clean-list">
                                    <li class="paragraphs-item flex column relative" v-for="(par,idx) in book.pages[currPageIdx].paragraphs" :key="idx">
                                        <textarea autofocus class="editor-text-area" rows='3' cols='50' v-model="par.txt" placeHolder="Your paragraph here" />
                                        <div class="par-btns-container absolute">
                                            <button class="editor-btn round-btn set-btn" title="Delete paragraf" @click="deletePar(idx)">
                                                <font-awesome-icon class="icon" icon="trash-alt" />
                                            </button>
                                            <button title="Set time set-btn" class="set-btn editor-btn round-btn" @click="setTimingPar(idx)">
                                                <font-awesome-icon class="icon" icon="clock" />
                                            </button>
                                            <input class="input-samll self-center" type="text" v-model="book.pages[currPageIdx].paragraphs[idx].parStartTime">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                <button @click="saveBook">Save</button>
                <ul class="editor-previews clean-list flex">
                    <li @click="selectPage(pageIdx)" v-for="(page,pageIdx) in book.pages" :key="pageIdx">
                        <bookPage :pageData="page" :previewInEdit="true"></bookPage>
                    </li>
                </ul>
            </div>
        </section>
    </template>

<script>
import { SAVE_BOOK, LOAD_BOOK } from "../store/book-module.js";
import bookPage from "../components/book-page.vue";
import cloudinaryService from "../services/cloudinary-service.js";
export default {
  name: "bookEditor",
  data() {
    return {
      audioPath: "",
      imgPath: "",
      isFirstDetails: true,
      options: [
        "Toddlers",
        "Early Reader",
        "Beginner English",
        "Animals",
        "Dogs",
        "Family"
      ],
      book: null,
      pageNum: 0,
      currPageIdx: 0,
      parNum: 1
    };
  },
  created() {
    if (this.$route.params.bookId) {
      this.$store
        .dispatch({ type: LOAD_BOOK, bookId: this.$route.params.bookId })
        .then(book => {
          console.log("book after dispach!!!!", book);
          return (this.book = book);
        });
    } else {
      this.book = {
        title: "",
        author: "",
        illustrator: "",
        categories: [],
        description: "",
        rating: 0,
        views: 0,
        numOfPages: 0,
        duration: 0,
        audio: "",
        coverImg: "",
        pages: [],
        reviews: [],
        status: "inProgress",
        createdAt: Date.now()
      };
      this.addPage();
    }
  },
  computed: {},
  methods: {
    addPage() {
      this.pageNum += 1;
      var newPage = {
        time: 0,
        img: "",
        paragraphs: [
          {
            txt: "",
            parStartTime: 0,
            parEndTime: 0
          }
        ]
      };
      this.currPageIdx = this.pageNum - 1;
      this.book.pages.push(newPage);
      console.log(this.book.pages);
      console.log(this.pageNum);
    },
    selectPage(idx) {
      this.currPageIdx = idx;
    },
    addPar() {
      var newPar = {
        txt: "",
        parStartTime: 0,
        parEndTime: 0
      };
      this.book.pages[this.currPageIdx].paragraphs.push(newPar);
    },
    deletePar(idx) {
      this.book.pages[this.currPageIdx].paragraphs.splice(idx, 1);
    },
    deletePage(idx) {
      this.book.pages.splice(idx, 1);
      this.pageNum -= 1;
    },
    saveDetails() {
      this.isFirstDetails = false;
      this.saveBook();
    },
    cancelFirstDetails() {
      this.isFirstDetails = false;
    },
    editBookDetails() {
      this.isFirstDetails = true;
    },
    setAudioFile() {
      cloudinaryService.doUploadAudio(this.$refs.audioInput).then(url => {
        this.book.audio = url.secure_url;
      });
    },

    setImgFile() {
      cloudinaryService.doUploadImg(this.$refs.imgInput).then(url => {
        this.book.pages[this.currPageIdx].img = url.secure_url;
      });
    },
    setCoverImgFile() {
      cloudinaryService.doUploadImg(this.$refs.coverImgInput).then(url => {
        this.book.coverImg = url.secure_url;
      });
    },
    setTimingPage() {
      this.book.pages[this.currPageIdx].time = this.$refs.audio.currentTime;
      this.$refs.audio.pause();

      //VALIDATIONS
      // var currTime = this.$refs.audio.currentTime;
      // var currPage = this.book.pages[this.currPageIdx]
      // var prevPage = this.book.pages[this.currPageIdx-1]
      // if (this.currPageIdx === 0) {
      //     prevPage.time = currPage.time
      // } else {
      //     prevPage.time = this.book.pages[this.currPageIdx-1].time
      // }
      // if (currPage.time <= prevPage.time) {
      //     console.log('prev page time: ', prevPage.time, 'curr page start time: ', currPage.time);
      // }
    },
    setTimingPar(idx) {
      this.book.pages[this.currPageIdx].paragraphs[
        idx
      ].parStartTime = this.$refs.audio.currentTime;
      this.$refs.audio.pause();
    },
    saveBook() {
      this.$store
        .dispatch({ type: SAVE_BOOK, book: this.book })
        .then(book => {
          this.book = JSON.parse(JSON.stringify(book));
        })
        .catch(err => {});
    }
  },
  components: {
    bookPage
  }
};
</script>

<style scoped lang="scss">
$editorInputColor: #f5c2bd;
$editorButtonColor: #d49c97;


.editor-container {
  padding: 1rem;
}

audio {
  margin: 0 0.5rem 0 0;
}

.firstDetails {
  margin: 1rem;
  border: solid 1px lightgray;
  box-shadow: 0px 0px 11px black;
}

.topBefore {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-control {
  width: 50%;
}

.page-form {
  margin: 0 0 1rem;
}
.img-form {
  margin: 0 1rem 0 0;
}

.first-details-btn-container {
  margin: 1rem;
  display: flex;
  justify-content: space-around;
  width: 50%;
}

.page-container {
  min-height: 500px;
}
.page-area {
  min-height: inherit;
  box-shadow: 0 0 11px black;
}
.page-btns-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.page-ctr {
  width: fit-content;
  padding: 1rem;
}
.page-ctr-btn {
  h1 {
    margin: 0 0.5rem 0 0;
  }
}
.par-btns-container {
  display: flex;
  justify-content: space-around;
  right: 0;
  padding: 0.3rem;
}

.par-list {
  margin: 0;
  padding: 0;
  li {
    margin: 0 0 1rem;
  }
}

.book-categories {
  background: white;
  margin: 1rem;
  width: 50%;
}

.editor-previews {
  li {
    margin: 0 1rem 0 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.set-btn {
  margin: 0 0.5rem 0 0;
}
.details-btn {
  margin: 0 0 0.5rem;
}
</style>
