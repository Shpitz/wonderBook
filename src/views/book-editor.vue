  <template>

<section class="flex column">
    <div v-if="book">
            <div v-if="(!book._id || togelModal)" class="firstDetailsContainer">
        <transition name="fade">
            <form id="form" class="topBefore">
                <h1>Please enter the following details:</h1>
		
                <input type="text" v-model="book.title" placeholder="BOOK TITLE">
                <input type="text" v-model="book.author" placeHolder="AUTHOR NAME">
                <input type="text" v-model="book.illustrator" placeHolder="ILLUSTRATOR NAME">
                <textarea type="text" v-model="book.description" placeHolder="DESCRIPTION"></textarea>
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
                <!-- <div class="firstDetails form-style-3">
                    <form id="form" class="topBefore flex justify-center column align-center">
                        <input class="form-control" type=text v-model="book.title" placeHolder="Book title">
                        <input class="form-control" type=text v-model="book.author" placeHolder="Author name">
                        <input class="form-control" type=text v-model="book.illustrator" placeHolder="Illustrator name">
                        <textarea rows="5" cols="500" class="form-control" v-model="book.description" placeHolder="Book description" />
                        <v-select class="book-categories form-control" placeHolder="Categories" multiple v-model="book.categories" :options="options"></v-select>
                        <form method="POST" ref="coverImgInput" class="page-img-upload-form flex column">
                            <div class="file-upload">
                                <label for="upload" class="file-upload__label">Select a file...</label>
                                <input type="file" accept="image/*" @change.prevent="setCoverImgFile" class="file-upload__input">
                            </div>
                        </form>
                        <div class="first-details-btn-container flex space-around">
                            <input type="submit" @click.prevent="saveDetails" value="Save">
                            <input type="button" @click.prevent="cancelFirstDetails" value="Cancel">
                        </div>
                    </form>
                </div> -->
        </transition>
            </div>
        <button @click="editBookDetails" class="editor-btn editor-regular-btn details-btn self-start"> Edit book details</button>

        <div class="audio-area flex column align-center">
            <!-- <form action="" ref="audioInput" class="page-form">
                <div class="file-upload">
                    <label for="upload" class="file-upload__label">Select a file...</label>
                    <input type="file" accept="audio/*" @change.prevent="setAudioFile" class="file-upload__input">
                </div>
            </form> -->
            <div class="flex align-center">
                <audio ref="audio" :src="book.audio" controls />
                <button @click="setTimingPage" class="set-btn editor-btn editor-regular-btn ">Set page Timing</button>
                <input type="number" class="input-samll" v-model="book.pages[currPageIdx].time" step="0.01">
            </div>
            <h1 :class="[book.title === '' ? 'hidden': '']">{{book.title}}</h1>
        </div>

        <div class="page-container flex column">
            <div class="flex page-ctr">
                <form method="POST" class="img-form page-form " ref="imgInput">
                    <div class="file-upload">
                        <label for="upload" class="file-upload__label">Select a file...</label>
                        <input type="file" accept="image/*" @change.prevent="setImgFile" class="file-upload__input">
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
                                    <input class="input-samll self-center" type="number" v-model="book.pages[currPageIdx].paragraphs[idx].parStartTime" step="0.01">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

                <button @click="saveBook">Save</button>
    <!-- <ul class="editor-previews clean-list flex">
        <li @click="selectPage(pageIdx)" v-for="(page,pageIdx) in book.pages" :key="pageIdx">
            <bookPage :pageData="page" :previewInEdit="true" ></bookPage>
        </li>
    </ul> -->
    <imgCarusale :pages="book.pages" @onPreviewClicked="selectPage"></imgCarusale>
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
      isFirstDetails: false,
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
  computed: {
    
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
      this.currPageIdx = this.pageNum - 1;
      this.book.pages.push(newPage);
      console.log(this.book.pages);
      console.log(this.pageNum);
    },
    selectPage(idx) {
        console.log('page idx from carusale: ', idx);
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
      this.isFirstDetails = true;
      console.log(this.isFirstDetails);
      this.togelModal = false
      console.log('togel', this.togelModal);
      
      this.saveBook();
    },
    cancelFirstDetails() {
      if(!this.book._id) {
          // this.isFirstDetails = false;
          this.$router.push('./')
          console.log(this.isFirstDetails);
          this.togelModal = false
          console.log('togel', this.togelModal);

      } else {
        this.togelModal = false
      }
    },
    editBookDetails() {
      debugger
          this.togelModal = true
          console.log('togel', this.togelModal);
      // this.isFirstDetails = true;
      console.log(this.isFirstDetails);
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
      console.log(this.$refs.imgInput);
      
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
    bookPage,
    imgCarusale
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

.firstDetailsContainer{
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
    font-family: 'Lato', sans-serif;
  background-color: #e2dedbf5;

  color: #b3aca7;
}

.firstDetails {
    margin: 1rem;
    border: solid 1px lightgray;
    box-shadow: 0px 0px 11px black;
    background-color: rgb(146, 133, 133);
}

.topBefore {

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
  margin-top: 10px;
  border-bottom: 1px solid  #b3aca7;
  // width: 100%;
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
  // background: white;
  // margin: 1rem;
  width: 100%;
}

.book-categories:hover {
  cursor: pointer;

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

@import url(https://fonts.googleapis.com/css?family=Lato:100,300,400);


input::placeholder, textarea::placeholder {
  color: #aca49c;
  font-size: 0.875em;
}

input:focus::placeholder, textarea::focus:placeholder {
  color: #bbb5af;
}

/* on hover placeholder */
input:hover::placeholder, textarea:hover::placeholder {
  color: #e2dedb;
  font-size: 0.875em;
}

input:hover:focus::placeholder, textarea:hover:focus::placeholder {
  color: #cbc6c1;
}



body {
  font-family: 'Lato', sans-serif;
  background: #e2dedb;
  color: #b3aca7;
}

header {
  position: relative;
  margin: 100px 0 25px 0;
  font-size: 2.3em;
  text-align: center;
  letter-spacing: 7px;
}

#form {
  position: relative;
  width: 500px;
  margin: 50px auto 100px auto;
}

input, .file-upload__label, .file-upload__input {
  font-family: 'Lato', sans-serif;
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

textarea {
  width: 500px;
  max-width: 500px;
  height: 110px;
  max-height: 110px;
  padding: 15px;
  
  background: transparent;
  outline: none;
  
  color: #726659;
  font-family: 'Lato', sans-serif;
  font-size: 0.875em;
  
  border: solid 1px #b3aca7;
  
  transition: all 0.3s ease-in-out;
}

textarea:hover {
  background: #b3aca7;
  color: #e2dedb;
}

#submit {
  width: 500px;
  
  padding: 0;
  margin: 5px 0px 0px 0px;
  
  font-family: 'Lato', sans-serif;
  font-size: 0.875em;
  color: #b3aca7;
  
  outline:none;
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
    font-family: 'Lato', sans-serif;
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
    width:0;
    height: 100%;
    opacity: 0;
}
</style>
