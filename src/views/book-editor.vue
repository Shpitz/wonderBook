 <template>

    <section class="main-container flex justify-center">

      <div v-if="previewModal" class="show-preview">
          <button @click="showPreview" title="watch your book"
          class="btn-exit-modal editor-btn editor-regular-btn ">
           <font-awesome-icon class="icon" icon="times" />
          </button>
        <book-display class="editor-book-display" :bookIdFromEditor="book._id"></book-display>
      </div>

      <div class="main-editor-container" v-if="book">
        <!-- modal details\preview -->
        <div v-if="(togelModal)" class="first-details-container">
          <button @click="cancelFirstDetails" class="btn-exit-modal editor-btn editor-regular-btn ">
            <font-awesome-icon class="icon" icon="times" />
          </button>
          <transition name="fade">
            <main id="main">
              <section id="left" :style="{ backgroundImage: 'url(' + getCoverImg + ')'}">
                <div id="head">
                  <h1>Join the wonder</h1>
                </div>
                <div class="modal-upload-container flex justify-center">
                  <form method="POST" ref="coverImgInput" class="upload-form flex column">
                    <div class="file-upload input-file-container">
                      <input type="file" accept="image/*" @change.prevent="setCoverImgFile" class="file-upload__input input-file">
                      <label tabindex="0" for="my-file" class="input-file-trigger">
                        <font-awesome-icon class="icon" icon="image" />
                      </label>
                    </div>
                  </form>
                  <form action="" ref="audioInput" class="upload-form page-form">
                    <div class="file-upload input-file-container">
                      <input type="file" accept="audio/*" @change.prevent="setAudioFile" class="file-upload__input  input-file">
                      <label tabindex="0" for="my-file" class="input-file-trigger">
                        <font-awesome-icon class="icon" icon="file-audio" />
                      </label>
                    </div>
                  </form>
                </div>

              </section>
              <section id="right">
                <h1>Book details</h1>
                <form action="#"  >
                  <div id="form-card" class="form-field">
                    <label>Book title:</label>
                    <input  v-model="book.title" placeholder="Book title" required>
                  </div>
                  <div id="form-card" class="form-field">
                    <label>Author:</label>
                    <input v-model="book.author" placeholder="Author" required>
                  </div>
                  <div id="form-card" class="form-field">
                    <label>Illustrator:</label>
                    <input v-model="book.illustrator" placeholder="Illustrators" required>
                  </div>
                   <div id="form-date" class="form-field">
                    <label for="expiry-month">Categories:</label>
                    <v-select  
                    placeHolder="Categories" 
                    multiple v-model="book.categories" :options="options"></v-select>
                  </div>

                  <div id="form-card" class="form-field">
                    <label>Description:</label>
                   <textarea class="editor-input not-resize-txt" rows='4' cols='50' 
                    v-model="book.description"  
                   placeholder="The story about Yoko ruining everything!" />
                  </div>
                  <div class="modal-btns-container flex space-around">
                    <input type="submit" @click.prevent="saveDetails" value="SAVE" class="edit-btn">
                    <input type="button" @click.prevent="cancelFirstDetails" value="CANCEL" class="edit-btn">
                  </div>
                </form>
              </section>
            </main>
          </transition>
        </div>

        <!--main area-->


        <div class="sub-editor-container">
             <button @click="saveBook"
              class="btn-margin-bottom editor-btn editor-regular-btn save-btn ">
              <div>
                <font-awesome-icon class="icon" icon="save" /> Save
              </div>
            </button>
          <!-- <h1 :class="[book.title === '' ? 'hidden': '']">{{book.title}}</h1> -->
          <div class="img-area-container flex justify-center">
          <div class="img-area" :style="{ backgroundImage: 'url(' + book.pages[currPageIdx].img + ')', backgroundSize: bgSize, backgroundPosition: bgPos}">
            <loader class="loader" v-if="isLoad"></loader>

            <div class="flex column">
              <!-- p loop -->
              <ul class="par-list clean-list">
                <li class="flex relative" v-for="(par,idx) in book.pages[currPageIdx].paragraphs" :key="idx">
                  <div v-if="currPar === idx" class="par-btns-container">
                    <div class="flex space-between align-center">
                      <button class="editor-btn round-btn btn-margin-bottom" title="Delete paragraf" @click="deletePar(idx)">
                        <font-awesome-icon class="icon" icon="trash-alt" />
                      </button>
                      <input type="color" v-model="par.color">
                    </div>
                    <div class="flex space-between align-center">      
                      <button title="Set Paragraf time" class="clock-btn btn-margin-bottom editor-btn round-btn" @click="setTimingPar(idx)">
                        <font-awesome-icon class="icon" icon="clock" />
                      </button>
                      <input class="input-samll self-center editor-input" type="number" v-model="book.pages[currPageIdx].paragraphs[idx].parStartTime"
                        step="0.01">
                    </div>
                  </div>
                  <textarea autofocus class="editor-text-area" rows='2' 
                  :style="{color: par.color}"
                   cols='60'
                   v-model="par.txt" placeHolder="Your paragraph here" 
                   @focus="focusPar(idx)"/>
                </li>
              </ul>
              <button title="Add paragraph" class="editor-btn self-start round-btn" @click="addPar">
                <font-awesome-icon class="icon" icon="plus-circle" />
              </button>

            </div>
          </div>

          <div class="flex page-ctr column space-around align-center">
            <h3 class="page-ctr-item">Page settings</h3>
            <div class="page-title page-ctr-item"># {{currPageIdx+1}}</div>
           
              <div class=" page-ctr-item set-page-time flex  align-center">
                <button @click="setTimingPage" class=" editor-btn editor-regular-btn ">
                  <font-awesome-icon class="icon" icon="clock" />
                </button>
                <input type="number" class="input-samll editor-input page-timing" v-model="book.pages[currPageIdx].time" step="0.01">
              </div>
              
             <button class="editor-btn round-btn page-ctr-item" title="Add page" @click="addPage">
                <font-awesome-icon class="icon" icon="plus-circle" />
              </button>
   
              <button class="editor-btn round-btn page-ctr-item" title="Delete page" @click="deletePage(currPageIdx)">
                <font-awesome-icon class="icon" icon="trash-alt" />
              </button>
             <!--prev/upload-->

           
               <button @click="showPreview" class=" editor-btn editor-regular-btn page-ctr-item">
              <font-awesome-icon class="icon" icon="play" />
            </button>
            <form method="POST" class="img-form page-form page-ctr-item " ref="imgInput">
              <div class="input-file-container">
                <input type="file" accept="image/*" @change.prevent="setImgFile" class="file-upload__input input-file">
                <label tabindex="0" for="my-file" class="input-file-trigger">
                  <font-awesome-icon class="icon" icon="upload" />
                </label>
              </div>
            </form>
                  <button @click="editBookDetails"
             class="btn-margin-bottom editor-btn editor-regular-btn details-btn">Details</button>
            <!-- </div> -->
          </div>  
          </div>
          <div class="bottom-ctr flex align-center justify-center">
            <div class=" audio-set-area flex-warp align-center">
              <audio ref="audio" :src="book.audio" controls />
            </div>
                <div class="img-setting flex column">
        <select class="bgImgSize" @change="updateImgSize">
          <option value="auto">auto</option>
          <option value="cover">cover</option>
          <option selected value="contain">contain</option>
          <option value="initial">initial</option>
          <option value="100%">100%</option>
          <option value="100% 100%">100% 100%</option>
        </select>
    
        <select class="bgImgPos" @change="updateImgPos">
          <option value="left top">left top</option>
          <option value="left center">left center</option>
          <option value="left bottom">left bottom</option>
          <option value="right top">right top</option>
          <option value="right center">right center</option>
          <option value="right bottom">right bottom</option>
          <option  value="center top">center top</option>
          <option selected value="center center">center center</option>
          <option value="center bottom">center bottom</option>
          <option value="50% 50%">50% 50%</option>
          <option value="25% 75%">25% 75%</option>
          <option value="initial">initial</option>
        </select>
      </div>
               </div>
            <!--search in web -->
            <!-- <div class="search-img-container self-start">
              <form ref="imgFromWeb" class="flex">
                <input type="search" ref="searchImgEl" class="editor-input" placeholder="Search image in web">
                <button @click="searchImg" title="Search" class="editor-btn round-btn btn-margin-right">
                  <font-awesome-icon class="icon" icon="search" />
                </button>
              </form>
            </div> -->
        </div>
    <imgCarusale ref="carusale-cmp"  class="img-carusela"
    :pages="book.pages" @onPreviewClicked="selectPage"></imgCarusale>
      </div>
    </section>
  </template>


<script>
import { SAVE_BOOK, LOAD_BOOK } from "../store/book-module.js";
import bookPage from "../components/book-page.vue";
import cloudinaryService from "../services/cloudinary-service.js";
import imgCarusale from "../components/img-carusale.vue";
import loader from "../components/loader-cmp.vue";
import bookSerivce from "../services/book-service.js";
import bookDisplay from "./book-display.vue";

export default {
  name: "bookEditor",
  data() {
    return {
      audioPath: "",
      imgPath: "",
      togelModal: false,
      previewModal: false,
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
      showCarusale: false,
      isLoad: true,
      bgSize: 'contain',
      bgPos: 'center',
      currPar : 0,
    };
  },
  created() {
    console.log(this.previewModal);
    
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
    this.isLoad = false;
  },
  computed: {
    getCoverImg(){
      if (this.book.coverImg){
        return this.book.coverImg;
      }
      else return './img/background/placeholder.png'
    },
 
  },
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
      this.saveBook();
    },

    cancelFirstDetails() {
      if (!this.book._id) {
        this.$router.push("./");
        this.togelModal = false;
      } else {
        this.togelModal = false;
      }
    },
    editBookDetails() {
      this.togelModal = true;
      console.log(this.previewModal);
      
    },
    showPreview() {
      this.previewModal = !this.previewModal;
      
    },
    setAudioFile() {
      cloudinaryService.doUploadAudio(this.$refs.audioInput).then(url => {
        this.book.audio = url.secure_url;
      });
    },

    setImgFile() {
      this.isLoad = true;
      cloudinaryService.doUploadImg(this.$refs.imgInput).then(url => {
        this.book.pages[this.currPageIdx].img = url.secure_url;
        this.isLoad = false;
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
    focusPar(idx){
      this.currPar = idx;
    },
    setTimingPar(idx) {
      this.book.pages[this.currPageIdx].paragraphs[
        idx
      ].parStartTime = this.$refs.audio.currentTime;
      this.$refs.audio.pause();
    },
    saveBook() {
      // this.book[]
      this.isLoad = true;
      this.$store
        .dispatch({ type: SAVE_BOOK, book: this.book })
        .then(book => {
          this.isLoad = false;
          this.book = JSON.parse(JSON.stringify(book));
        })
        .catch(err => {});
    },
    searchImg(ev, searchInput) {
      searchInput = this.$refs.searchImgEl.value;

      bookSerivce.searchImg(searchInput).then(imgUrl => {
        this.book.pages[this.currPageIdx].img = imgUrl;
      });
    },
    updateImgSize(ev) {
      console.log(ev.target.value);
      this.bgSize = ev.target.value;
      this.book.pages[this.currPageIdx].imgSize = this.bgSize;
      console.log(this.book.pages[this.currPageIdx]);
      
    },
    updateImgPos(ev) {
      this.bgPos = ev.target.value;
      this.book.pages[this.currPageIdx].imgPosition = this.bgPos;
      console.log(this.book.pages[this.currPageIdx]);
      
    }
  },

  components: {
    bookPage,
    imgCarusale,
    loader,
    bookDisplay
  }
};
</script>

 <style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
}
h1 {
  font-family: $main-font;
}
.save-btn {
  margin: 1rem auto;
    height: auto;
    width: 150px
}

.audio-set-area {
  justify-content: center;
}

.main-container {
  min-height: 80vh;
  background-color: #f6f4f4;
}
.main-editor-container {
  height: 100%;
  width: 100%;
}
.sub-editor-container {
  min-height: 400px;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  margin:0 auto 1rem;   
}

.img-area {
  min-height: 60vh;
  padding: 0.5rem;
  margin: 0 0 1rem;
  background-position: 50% 50%; /* Sets reference point to scale from */
  // background-size: cover;

  //NEW CHANGES
  background-size: contain;
  background-repeat: no-repeat;
  background-color: black;
}


.page-ctr {
  margin: 0 1rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  h3 {
    margin: 0;
    text-align: left;
      }
}

.page-title{
  font-size: 1.5em;
}

.page-timing{
  // margin-top: 1em;
}

audio {
  margin: 0 0.5rem 0 0;
  box-shadow: 0 0 3px black;
  border-radius: 30px;
}

.btn-exit-modal {
  position: absolute;
  top: 10px;
  right: 10px;
}

.editor-book-display {
  width: 100%;
}

.first-details-container, .show-preview {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  font-family: "Lato", sans-serif;
  color: #393e56de;
}

.firstDetails {
  margin: 1rem;
  border: solid 1px lightgray;
  box-shadow: 0px 0px 11px black;
  background-color: rgb(146, 133, 133);
}

.par-btns-container {
  margin: 0 0.5rem 0 0;
  position: absolute;
  left:  -120px;
}

.par-list {
  position: relative;
  margin: 0;
  padding: 0;
  li {
    margin: 0 0 1rem;
  }
}

@media (max-width: 520px) {
  .show-carusale {
    margin: 0.5rem 0;
    button {
      margin: 0;
    }
  }
  .details-modal {
    width: 80%;
  }
}

@import url("https://fonts.googleapis.com/css?family=Raleway:300,400,700");


$shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
$primary: #9095b1;
$secondary: #393e56;
$margin-form-label:5px;
#main {
  position: relative;
  width: 80%;
  height: 80%;

  left: 30px;

  border-radius: 10px;
  box-shadow: $shadow;

  background-color: white;
}

#left {
  position: relative;
  background-size: cover;
  background-position: center;
  height: calc(100% + 50px);
  width: 40%;
  top: -35px;
  left: -50px;
  padding: 10px 25px;
  box-shadow: $shadow;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}


#left #head {
  opacity: 0.95;
}

#right {
  padding: .5rem 0;
  position: absolute;
  width: calc(60% - 40px);
  height: 100%;
  top: 0;
  left: 40%;
  display: flex;
  flex-flow: column nowrap;
  padding-left: 20px;
}

#right form {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height:100%; 
  justify-content: space-around;
}

#right form input,
#right form select {
  appearance: none;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px;
   outline: none;
  transition: all 0.2s;
  margin-top: 2.5px;
  position: relative;
}
#right form input:focus {
     border-bottom: 2px solid #808ab2;

}
#right form input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: lightgray;
} 
 
   
#right form .form-field {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin-bottom: $margin-form-label;
}
.form-field label {
    margin-bottom: $margin-form-label;

}

#right form #date-val {
  display: flex;
  justify-content: space-between;
}

#right form #date-val select {
  width: 45%;
}

.edit-btn{
  width: 30%;
}

.book-categories, .upload-form{
  margin: 0.5rem;
}

#right form button[type="submit"], .edit-btn {
  background: linear-gradient(135deg, $secondary 0%, $secondary 100%);
  padding: 5px;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 400;
  font-size: 12pt;
  margin-top: 10px;
  height: 40px;
  cursor: pointer;
}
#right form button[type="submit"]:hover ,.edit-btn:hover {
  background: linear-gradient(135deg, $primary 0%, $primary 100%);
  color: $secondary;
}

.img-carusela {
  max-width: 88vw;
}
.img-setting select:not(:last-child) {
  margin: 0 0 .5rem;
}

.details-btn {
  z-index: 1;
}
.page-ctr-item {
  margin: 0 .5rem 0 0;
}
@media (max-width: 520px) {
  .show-carusale {
    margin: 0.5rem 0;
    button {
      margin: 0;
    }
  }
  .details-modal {
    width: 80%;
  }
.bottom-ctr {
  flex-direction: column;
   audio {
    margin: 0 0 1rem;
  }

}


}

@media (max-width: 640px) {
    #left {
    width: 50%;
  }
  .page-ctr {
        height: 100px;
    justify-content: flex-end;

  }
}

@media (max-width: 820px) {
.page-ctr button &input{
          margin: 0 .5rem 0 0;
  }
.sub-editor-container {
  width: 95%;
}
.par-btns-container {
  right: 0;
  left: auto;
}

}


@media (max-width: 900px) { 
    .img-area-container {
    flex-direction: column;
  }
  .page-ctr {
     flex-direction: row;
    align-items: center;
    margin: 0 0 1rem;
  }
  .details-btn {
    margin: 0;
  }
}
@media (min-width: 900px) and (max-width: 1024px) { 
  .par-btns-container {
    left: auto;
    right: 0;
  }

}

</style>
