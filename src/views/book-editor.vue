 <template>

    <section class="main-container flex justify-center">

      <div v-if="previewModal" class="show-preview">
          <button @click="showPreview" title="watch your book"
          class="btn-exit-modal editor-btn editor-regular-btn ">
           <font-awesome-icon class="icon" icon="times" />
          </button>
        <book-display class="editor-book-display" :bookIdFromEditor="book._id"></book-display>
      </div>

        <book-first-details v-show="(toggelModal)"
                            v-if="book"
                            :bookFromEditor="book"
                            @cancelFirstDetails="cancelFirstDetails" 
                            @saveDetails="saveDetails">
        </book-first-details>
      <div class="main-editor-container" v-if="book">
         <div class="sub-editor-container flex align-center">

          <!-- <h1 :class="[book.title === '' ? 'hidden': '']">{{book.title}}</h1> -->
          <div class="img-area-container flex justify-center">
          <div class="img-area" :style="{ backgroundImage: 'url(' + book.pages[currPageIdx].img + ')', backgroundSize: book.pages[currPageIdx].imgSize, backgroundPosition: book.pages[currPageIdx].imgPosition}">
            <loader class="loader" v-if="isLoad"></loader>

            <div class="par-area-ctr flex column">
              <!-- p loop -->
              <ul class="par-list clean-list">
                <li class="flex relative" v-for="(par,idx) in book.pages[currPageIdx].paragraphs" :key="idx">
                  <div v-if="currPar === idx" class="par-btns-container flex column space-between align-center">
                    <!-- <div class="flex column space-between align-center"> -->
                     <!-- <div class="flex column space-between align-center">       -->
                      <button title="Set paragraph start time" class="clock-btn btn-margin-bottom editor-btn round-btn" @click="setTimingPar(idx)">
                        <font-awesome-icon class="icon" icon="clock" />
                      </button>
                      <input class=" par-input input-samll self-center editor-input"
                       type="text"  
                        v-model="book.pages[currPageIdx].paragraphs[idx].parStartTime"
                        step="1" >
                    <!-- </div> -->

                       <div class="modal-upload-container flex justify-center btn-margin-bottom">
                  <form method="POST"  class="upload-form flex column">
                    <div class="file-upload input-file-container" title="Change text color">
                        <input type="color" v-model="par.color" 
                       class="file-upload__input input-file">
                      <label tabindex="0"  class="input-file-trigger" 
                      :style="{color:par.color}">
                        <font-awesome-icon class="icon" icon="palette" />
                      </label>
                    </div>
                  </form>
                       </div>
                      <button class="editor-btn round-btn btn-margin-bottom" 
                      title="Delete paragraph" @click="deletePar(idx)">
                        <font-awesome-icon class="icon" icon="trash-alt" />
                      </button>
                    
                    <!-- </div> -->

                  </div>
                  <textarea autofocus class="editor-text-area" rows='3' 
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
            <h3 class="page-ctr-item">Page # {{currPageIdx+1}}</h3>
            <div class=" page-ctr-item set-page-time flex  align-center">
              <button @click="setTimingPage" class=" editor-btn editor-regular-btn" title="Set page start time">
                <font-awesome-icon class="icon" icon="clock" />
              </button>
              <input type="text" class="input-samll editor-input page-timing" v-model="book.pages[currPageIdx].time" step="0.01">
            </div>
              
            <button class="editor-btn round-btn page-ctr-item" 
              v-if="!isSinglePage"
               title="Delete page" @click="deletePage(currPageIdx)">
                <font-awesome-icon class="icon" icon="trash-alt" />
            </button>
             <!--prev/upload-->

           
            <button @click="showPreview" class=" editor-btn editor-regular-btn page-ctr-item" title="Show book preview">
              <font-awesome-icon class="icon" icon="play" />
            </button>
            <button class="editor-btn round-btn" title="Add page" @click="addPage">
              <font-awesome-icon class="icon" icon="plus-circle" />
            </button>
                        <!-- <div class="page-controllers flex column align-center space-between"> -->
            <form method="POST" class="img-form page-form " ref="imgInput" title="Upload page image">
              <div class="input-file-container">
                <input type="file" accept="image/*" @change.prevent="setImgFile" class="file-upload__input input-file">
                <label tabindex="0" for="my-file" class="input-file-trigger">
                  <font-awesome-icon class="icon" icon="upload" />
                </label>
              </div>
            </form>

            
            <!-- <div class="img-setting"> -->
            <select class="bgImgSize" @change="updateImgSize" v-model="book.pages[currPageIdx].imgSize" title="Set image size">
              <option value="cover">cover</option>
              <option  value="contain">contain</option>
            </select>
  
            <select class="bgImgPos" @change="updateImgPos" v-model="book.pages[currPageIdx].imgPosition" title="Set image position">
              <option value="center top">center top</option>
              <option value="center center">center center</option>
              <option value="center bottom">center bottom</option>
              <option value="25% 75%">25% 75%</option>
              <option value="50% 50%">50% 50%</option>
              <option value="75% 25%">75% 25%</option>
              <option value="initial">initial</option>
            </select>
            <!-- </div> -->

          </div>  
          

          </div>
          
          <div class="bottom-ctr flex align-center justify-center">
            <button @click="editBookDetails"
             class="editor-btn editor-regular-btn details-btn" title="Edit book details">Details</button>
            <div class=" audio-set-area flex-warp align-center">
              <audio ref="audio" :src="book.audio" controls />
            </div>
            <button @click="saveBook"
              class="editor-btn editor-regular-btn save-btn " title="Save changes">
              <div>
                <font-awesome-icon class="icon" icon="save" />
              </div>&nbsp; Save
            </button>
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
    <imgCarusale ref="carusale-cmp"  class="img-carusela"
    :pages="book.pages" @onPreviewClicked="selectPage"></imgCarusale>
        </div>
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
import bookFirstDetails from "../components/book-first-details.vue";

export default {
  name: "bookEditor",
  data() {
    return {
      audioPath: "",
      imgPath: "",
      toggelModal: false,
      previewModal: false,
      book: null,
      pageNum: 0,
      currPageIdx: 0,
      parNum: 1,
      showCarusale: false,
      isLoad: true,
      bgSize: "contain",
      bgPos: "center center",
      currPar: 0
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
      this.toggelModal = true;
    }
  },
  mounted() {
    this.isLoad = false;
  },
  computed: {
    isSinglePage(){
      return this.book.pages.length === 1
    },
    // parseIntTimeSet(){
    //  return this.book.pages[currPageIdx].paragraphs[idx].parStartTime
    // }
 
  },
  methods: {
    addPage() {
      this.pageNum += 1;
      var newPage = {
        time: 0,
        img: "",
        imgSize: 'contain',
        imgPosition: 'center center',
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
    saveDetails(book) {
      this.toggelModal = false;
      this.book = book
      this.saveBook();
    },

    cancelFirstDetails() {
      if (!this.book._id) {
        this.$router.push("/");
        this.toggelModal = false;
      } else {
        this.toggelModal = false;
      }
    },
    editBookDetails() {
      this.toggelModal = true;
      console.log(this.toggelModal);
      
    },
    showPreview() {
      this.previewModal = !this.previewModal;
    },

    setImgFile() {
      this.isLoad = true;
      cloudinaryService.doUploadImg(this.$refs.imgInput).then(url => {
        this.book.pages[this.currPageIdx].img = url.secure_url;
        this.isLoad = false;
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
    focusPar(idx) {
      this.currPar = idx;
    },
    setTimingPar(idx) {
      this.book.pages[this.currPageIdx].paragraphs[
        idx
      ].parStartTime = this.$refs.audio.currentTime;
      this.$refs.audio.pause();
    },
    saveBook() {
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
      this.bgSize = ev.target.value;
      this.book.pages[this.currPageIdx].imgSize = this.bgSize;
    },
    updateImgPos(ev) {
      this.bgPos = ev.target.value;
      this.book.pages[this.currPageIdx].imgPosition = this.bgPos;
    }
  },

  components: {
    bookPage,
    imgCarusale,
    loader,
    bookDisplay,
    bookFirstDetails
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
h1, h3 {
  font-family: $main-font;
}
.save-btn {
//   margin: 1rem auto;
//   height: auto;
  width: 130px;
}

.audio-set-area {
  justify-content: center;
}

.main-container {
  // min-height: 80vh;
  background-color: #f6f4f4;
}
.main-editor-container {
  margin-top: 10px;
  // height: 100vh;
  width:  100%;
}
.sub-editor-container {
  // min-height: 400px;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;;
  margin: 0 auto 0.5rem;
}

.img-area-container {
  position: relative;
}

.img-area {
  width: 100%;
  position: relative;
  min-height: 60vh;
  padding: 0.5rem;
  margin: 0 0 1rem;
  background-position: center; /* Sets reference point to scale from */
  //NEW CHANGES
  background-size: cover;
  background-repeat: no-repeat;
  background-color: black;
}

.page-ctr {
  position: absolute;
  right: -107px;
  top: 0;
  width: 100px;
  // margin: 0 1rem;
  justify-content: space-between;
  align-items: flex-start;
//   flex-wrap: wrap;
  margin-left: 10px;
   height: 375px;
//   h3 {
//     margin: 0;
//     text-align: left;
//   }
}

.bgImgSize, .bgImgPos{
  width: 100px;
}
    .bottom-ctr {
      width: 700px;
      justify-content: space-between;
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

.show-preview {
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
  width: 45px;
  margin: 0 0.5rem 0 0;
  position: absolute;
  left: -60px;
  height: 180px
}

.par-list {
  position: relative;
  margin: 0;
  padding: 0;
  li {
    margin: 0 0 1rem;
  }
}

.par-input {
  margin: 0;
}

// .page-controllers {
//   width: 240px;
// }


@import url("https://fonts.googleapis.com/css?family=Raleway:300,400,700");

.img-setting select {
  width: 100%;

}
.img-carusela {
  max-width: 76vw;
  // margin: 0 auto;
  margin-top: 1.5rem;

}
// .img-setting select:not(:last-child) {
//   margin: 0 0 0.5rem;
// }

.details-btn {
  width: 130px;
  // z-index: 1;
}
.page-ctr-item {
  margin: 0 0.5rem 0 0;
}

// @media (max-width: 520px) {
//   .show-carusale {
//     margin: 0.5rem 0;
//     button {
//       margin: 0;
//     }
//   }

//   .bottom-ctr {
//     flex-direction: column;
//     audio {
//       margin: 0 0 1rem;
//     }
//   }
// }

@media (max-width: 930px) {
  .img-area-container {
    flex-direction: column;
    width: 100%;
  }
  .page-ctr {
    position: initial;
    flex-direction: row;
    width: 100%;
    align-items: center;
    height: auto;
    margin-bottom: 15px;
    margin-left: 0;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .par-btns-container {
    flex-direction: row;
    align-items: center;
    height: auto;
    width: 200px;
    left: 2px;
    top: 45px;
  }
  .bottom-ctr{
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
}

// @media (max-width: 640px) {
//   .page-ctr {
//     height: 100px;
//     justify-content: flex-end;
//   }
//   .editor-text-area {
//     max-width: 60%;
//   }
// }

// @media (max-width: 820px) {
//   .page-ctr button &input {
//     margin: 0 0.5rem 0 0;
//   }
//   .sub-editor-container {
//     width: 95%;
//   }
//   .par-btns-container {
//     right: 0;
//     left: auto;
//   }
// }



// @media (max-width: 900px) {
//   .img-area-container {
//     flex-direction: column;
//   }
//   .page-ctr {
//     flex-direction: row;
//     align-items: center;
//     margin: 0 0 1rem;
//   }

// }
// @media (min-width: 900px) and (max-width: 1024px) {
//   .par-btns-container {
//     left: auto;
//     right: 0;
//   }
// }
</style>
