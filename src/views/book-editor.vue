  <template>

 <section class="main-container">
    <div class="main-editor-container" v-if="book">
      <div v-if="(togelModal)" class="firstDetailsContainer">
        <transition name="fade">
          <form id="form" class="topBefore">
            <h1>Please enter the following details:</h1>

            <input type="text" v-model="book.title" placeholder="BOOK TITLE">
            <input type="text" v-model="book.author" placeHolder="AUTHOR NAME">
            <input type="text" v-model="book.illustrator" placeHolder="ILLUSTRATOR NAME">
            <textarea class="textarea-modal " type="text" v-model="book.description" placeHolder="DESCRIPTION"></textarea>
            <label for="categories">
              Categories:
              <v-select class="book-categories" placeHolder="Categories" multiple v-model="book.categories" :options="options"></v-select>
            </label>
            <form method="POST" ref="coverImgInput" class="page-img-upload-form flex column">
              <div class="file-upload">
                <label for="upload" class="file-upload__label1">UPLOAD BOOK COVER IMAGE {{this.book.coverImg}}
                  <input type="file" accept="image/*" @change.prevent="setCoverImgFile" class="file-upload__input">
                </label>
              </div>
            </form>
            <form action="" ref="audioInput" class="page-form">
              <div class="file-upload">
                <label for="upload" class="file-upload__label1">UPLOAD BOOK AUDIO FILE {{this.book.audio}}
                  <input type="file" accept="audio/*" @change.prevent="setAudioFile" class="file-upload__input">
                </label>
              </div>
            </form>
            <div class="first-details-btn-container flex space-around">
              <input type="submit" @click.prevent="saveDetails" value="SAVE">
              <input type="button" @click.prevent="cancelFirstDetails" value="CANCEL">
            </div>

          </form>
        </transition>
      </div>

      <!--main area-->
      <div class="flex">
        <button @click="editBookDetails" class="btn-margin-bottom editor-btn editor-regular-btn details-btn">
          Edit book details</button>
        <button @click="saveBook" class="btn-margin-bottom editor-btn editor-regular-btn save-btn ">
          <div>
        <font-awesome-icon class="icon" icon="save" />
          Save
          </div>
          </button>
      </div>

      <div class="sub-editor-container flex">
        <!-- <h1 :class="[book.title === '' ? 'hidden': '']">{{book.title}}</h1> -->
        <div class="img-area" :style="{ backgroundImage: 'url(' + book.pages[currPageIdx].img + ')'}">

          <div class="flex column">
            <!-- p loop -->
            <ul class="par-list clean-list">
              <li class="flex  relative" v-for="(par,idx) in book.pages[currPageIdx].paragraphs" :key="idx">
                <div class="par-btns-container">
                  <button class="editor-btn round-btn btn-margin-bottom" title="Delete paragraf" @click="deletePar(idx)">
                    <font-awesome-icon class="icon" icon="trash-alt" />
                  </button>

                  <div class="flex">
                    <button title="Set time btn-margin-bottom" class="clock-btn btn-margin-bottom editor-btn round-btn" @click="setTimingPar(idx)">
                      <font-awesome-icon class="icon" icon="clock" />
                    </button>
                    <input class="input-samll self-center" type="number" v-model="book.pages[currPageIdx].paragraphs[idx].parStartTime" step="0.01">
                  </div>

                </div>
                <textarea autofocus class="editor-text-area" rows='3' cols='50' v-model="par.txt" placeHolder="Your paragraph here" />
              </li>
            </ul>
            <button title="Add paragraph" class="editor-btn self-start round-btn" @click="addPar">
              <font-awesome-icon class="icon" icon="plus-circle" />
            </button>

          </div>
        </div>

        <div class="flex page-ctr align-center">
          <div class=" audio-set-area flex-warp align-center">
            <audio ref="audio" :src="book.audio" controls />
            <h1>Page {{currPageIdx+1}}</h1>
          </div>
          <div class="page-area flex align-center">
            <div class="set-page-time flex align-center">
              <button @click="setTimingPage" class=" editor-btn editor-regular-btn ">
                <font-awesome-icon class="icon" icon="clock" />
              </button>

              <input type="number" class="input-samll" v-model="book.pages[currPageIdx].time" step="0.01">
            </div>
            <button class="editor-btn round-btn btn-margin-right" title="Add page" @click="addPage">
              <font-awesome-icon class="icon" icon="plus-circle" />
            </button>
            <button class="editor-btn round-btn btn-margin-right" title="Delete page" @click="deletePage(currPageIdx)">
              <font-awesome-icon class="icon" icon="trash-alt" />
            </button>

          </div>
          <form method="POST" class="img-form page-form " ref="imgInput">
            <input type="file" accept="image/*" @change.prevent="setImgFile" class="file-upload__input">
          </form>
          <div class="show-carusale">
            <button class="editor-btn round-btn btn-margin-right" @click="showCarusale = !showCarusale">
              <font-awesome-icon v-if="!showCarusale" class="icon" icon="eye" />
              <font-awesome-icon v-else class="icon" icon="eye-slash" />
            </button>
          </div>
        </div>
        <imgCarusale ref="carusale-cmp" v-if="showCarusale" :pages="book.pages" @onPreviewClicked="selectPage"></imgCarusale>

      </div>

    </div>
</section>

    </template>


<script>
import { SAVE_BOOK, LOAD_BOOK } from "../store/book-module.js";
import bookPage from "../components/book-page.vue";
import cloudinaryService from "../services/cloudinary-service.js";
import imgCarusale from "../components/img-carusale.vue";
export default {
  name: "bookEditor",
  data() {
    return {
      audioPath: "",
      imgPath: "",
      togelModal: false,
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
      parNum: 1,
      // book : null,
      showCarusale: false
    };
  },
  created() {
    if (this.$route.params.bookId) {
      this.$store
        .dispatch({ type: LOAD_BOOK, bookId: this.$route.params.bookId })
        .then(book => {
          this.book = JSON.parse(JSON.stringify(book));
          // this.book =JSON.parse(JSON.stringify(this.book));
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
      this.book = JSON.parse(JSON.stringify(this.book));
      this.addPage();
      this.togelModal = true;
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
      if (this.$refs.imgInput) this.$refs.imgInput[0].value = "";
      this.currPageIdx = this.pageNum - 1;
      this.book.pages.push(newPage);
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
      this.togelModal = false;
      //   this.saveBook();
    },
    cancelFirstDetails() {
      // this.book = JSON.parse(JSON.stringify(this.book));
      if (!this.book._id) {
        this.$router.push("./");
        this.togelModal = false;
      } else {
        this.togelModal = false;
      }
    },
    editBookDetails() {
      this.togelModal = true;
    },
    setAudioFile() {
      cloudinaryService.doUploadAudio(this.$refs.audioInput).then(url => {
        this.book.audio = url.secure_url;
      });
    },

    setImgFile() {
      console.log("this.$refs.imgInput", this.$refs.imgInput[0].value);
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
      // this.book = JSON.parse(JSON.stringify(this.book));
      this.$store
        .dispatch({ type: SAVE_BOOK, book: this.book })
        .then(book => {
          console.log("2111111111111111111111");
          this.book = JSON.parse(JSON.stringify(book));
          this.$router.push("./");
        })
        .catch(err => {});
    }
  },

  components: {
    bookPage,
    imgCarusale
  }
};
</script>

 <style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

h1 {
  font-family: $main-font;
}
.save-btn {
  margin: 0 auto;
}

.audio-set-area {
  justify-content: center;
}

.main-container {
  min-height: 80vh;
  background-color: wheat;
}
.main-editor-container {
  height: 100%;
  padding: 1rem;
}
.sub-editor-container {
  min-height: 400px;
  flex-direction: column;
  justify-content: space-between;
}

.img-area {
  min-height: inherit;
  padding: 0.5rem;
  margin: 0 0 1rem;
  background-position: 50% 50%; /* Sets reference point to scale from */
  background-size: cover;
}

.page-ctr {
  justify-content: space-between;
  // padding: 0 0.5rem;
  flex-wrap: wrap;
}

audio {
  margin: 0 0.5rem 0 0;
}

.firstDetailsContainer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.726);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  font-family: "Lato", sans-serif;
  background-color: #e2dedbf5;

  color: #b3aca7;
}

.firstDetails {
  margin: 1rem;
  border: solid 1px lightgray;
  box-shadow: 0px 0px 11px black;
  background-color: rgb(146, 133, 133);
}

.par-btns-container {
  margin: 0 0.5rem 0 0;
}

.par-list {
  margin: 0;
  padding: 0;
  li {
    margin: 0 0 1rem;
  }
}

input::placeholder,
textarea::placeholder {
  color: #aca49c;
  font-size: 0.875em;
}

input:focus::placeholder,
textarea::focus:placeholder {
  color: #bbb5af;
}

/* on hover placeholder */
input:hover::placeholder,
textarea:hover::placeholder {
  color: #e2dedb;
  font-size: 0.875em;
}

input:hover:focus::placeholder,
textarea:hover:focus::placeholder {
  color: #cbc6c1;
}

#form {
  position: relative;
  width: 500px;
  margin: 50px auto 100px auto;

  input,
  .file-upload__label,
  .file-upload__input {
    font-family: "Lato", sans-serif;
    font-size: 0.875em;
    width: 500px;
    height: 40px;
    padding: 0px 15px 0px 15px;

    background: transparent;
    outline: none;
    color: #726659;

    border: solid 1px #b3aca7;
    border-bottom: none;

    transition: all 0.3s ease-in-out;
  }

  input:hover {
    background: #b3aca7;
    color: #e2dedb;
  }
}
.textarea-modal {
  width: 500px;
  max-width: 500px;
  height: 110px;
  max-height: 110px;
  padding: 15px;

  background: transparent;
  outline: none;

  color: #726659;
  font-family: "Lato", sans-serif;
  font-size: 0.875em;

  border: solid 1px #b3aca7;

  transition: all 0.3s ease-in-out;
}

.textarea-modal:hover {
  background: #b3aca7;
  color: #e2dedb;
}

#submit {
  width: 500px;

  padding: 0;
  margin: 5px 0px 0px 0px;

  font-family: "Lato", sans-serif;
  font-size: 0.875em;
  color: #b3aca7;

  outline: none;
  cursor: pointer;

  border: solid 1px #b3aca7;
}

#submit:hover {
  color: #e2dedb;
}

.categories label {
  text-align: left;
}
.file-upload {
  position: relative;
  display: inline-block;
}

.file-upload__label1 {
  display: block;
  border-bottom: solid 1px #b3aca7;
  font-family: "Lato", sans-serif;
  font-size: 0.875em;
  // padding: 1em 2em;
  // color: #fff;
  // background: rgb(68, 68, 68);
  // border-radius: .4em;
  // transition: background .3s;

  &:hover {
    //  cursor: pointer;
    //  background: #000;
    background: #b3aca7;
    color: #e2dedb;
  }
}

.file-upload__input1 {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 1;
  width: 0;
  height: 100%;
  opacity: 0;
}

@media (max-width: 520px) {
  .show-carusale {
    margin: .5rem 0;
    button {
      margin: 0;
    }
  }
}
</style>
