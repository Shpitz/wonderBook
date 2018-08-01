  <template>

<section class="main-container flex column align-center">
    <div v-if="book">
            <div v-if="(togelModal)" class="firstDetailsContainer">
        <transition name="fade">
            <form id="form" class="topBefore">
                <h1>Please enter the following details:</h1>
		
                <input type="text" v-model="bookCopy.title" placeholder="BOOK TITLE">
                <input type="text" v-model="bookCopy.author" placeHolder="AUTHOR NAME">
                <input type="text" v-model="bookCopy.illustrator" placeHolder="ILLUSTRATOR NAME">
                <textarea type="text" v-model="bookCopy.description" placeHolder="DESCRIPTION"></textarea>
                <label for="categories">
                  Categories:
                <v-select class="book-categories" placeHolder="Categories" multiple v-model="bookCopy.categories" :options="options"></v-select>
                </label>
                <form method="POST" ref="coverImgInput" class="page-img-upload-form flex column">
                  <div class="file-upload">
                    <label for="upload" class="file-upload__label1">UPLOAD BOOK COVER IMAGE {{this.bookCopy.coverImg}}
                      <input type="file" accept="image/*" @change.prevent="setCoverImgFile" class="file-upload__input">
                    </label>
                  </div>
                </form>
                <form action="" ref="audioInput" class="page-form">
                  <div class="file-upload">
                      <label for="upload" class="file-upload__label1">UPLOAD BOOK AUDIO FILE {{this.bookCopy.audio}}
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
            <!-- modal - first details -->
            <div  class="book-page-and-pars-area flex "> 
            <div class="book-and-page-areas flex column">
            <div class="book-details outline">
              <button @click="editBookDetails" class="editor-btn editor-regular-btn details-btn self-start"> Edit book details</button>
              <h1 :class="[bookCopy.title === '' ? 'hidden': '']">{{bookCopy.title}}</h1>
              <audio ref="audio" :src="bookCopy.audio" controls />
              <button @click="saveBook">Save</button>
            </div> 
            <!-- title, auodio and edit details -->
        <div class="page-container flex column outline">
            <div class="flex page-ctr">
                <div class="page-ctr-btn flex align-center">
                    <h1>Page {{currPageIdx+1}}</h1>
                    <button class="editor-btn round-btn set-btn" title="Add page" @click="addPage">
                        <font-awesome-icon class="icon" icon="file-upload" />
                    </button>
                    <button class="editor-btn round-btn" title="Delete page" @click="deletePage(currPageIdx)">
                        <font-awesome-icon class="icon" icon="trash-alt" />
                    </button>
                    <form method="POST" class="img-form page-form " ref="imgInput">
                    <div class="file-upload">
                        <label for="upload" class="file-upload__label">Select a file...</label>
                        <input type="file" accept="image/*" @change.prevent="setImgFile" class="file-upload__input">
                    </div>
                    <button @click="setTimingPage" class="set-btn editor-btn editor-regular-btn ">
                  <font-awesome-icon class="icon" icon="clock" />
                </button>
                <input type="number" class="input-samll" v-model="bookCopy.pages[currPageIdx].time" step="0.01">
                </form>
                </div>
            </div>
            </div>
            </div>

            <div class="page-and-pars-area">
                <div class="img-container" :style="{ backgroundImage: 'url(' + bookCopy.pages[currPageIdx].img + ')' }">
                    <div class="par-area flex column">
                        <button title="Add paragraph" class="editor-btn self-end round-btn" @click="addPar">
                            <font-awesome-icon class="icon" icon="plus-circle" />
                        </button>
                        <ul class="par-list clean-list">
                            <li class="paragraphs-item flex column relative" v-for="(par,idx) in bookCopy.pages[currPageIdx].paragraphs" :key="idx">
                                <textarea autofocus class="editor-text-area" rows='3' cols='50' v-model="par.txt" placeHolder="Your paragraph here" />
                                <div class="par-btns-container absolute">
                                    <button class="editor-btn round-btn set-btn" title="Delete paragraf" @click="deletePar(idx)">
                                        <font-awesome-icon class="icon" icon="trash-alt" />
                                    </button>
                                    <button title="Set time set-btn" class="set-btn editor-btn round-btn" @click="setTimingPar(idx)">
                                        <font-awesome-icon class="icon" icon="clock" />
                                    </button>
                                    <input class="input-samll self-center" type="number" v-model="bookCopy.pages[currPageIdx].paragraphs[idx].parStartTime" step="0.01">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- page and params -->
            </div>
            <!-- book details (audio, title and edit btn), page controls and page and params -->
                <button @click="showCarusale = !showCarusale">show</button>
              <div v-if="showCarusale" class="carusale-area outline">
              <imgCarusale :pages="bookCopy.pages" @onPreviewClicked="selectPage"></imgCarusale>
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
      bookCopy : null,
      showCarusale: true,
 
    };
  },
  created() {


    if (this.$route.params.bookId) {
      this.$store
        .dispatch({ type: LOAD_BOOK, bookId: this.$route.params.bookId })
        .then(book => {
            this.book = book;
            this.bookCopy =JSON.parse(JSON.stringify(this.book));
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
      this.bookCopy =JSON.parse(JSON.stringify(this.book));
      this.addPage();
      this.togelModal = true;
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
    if (this.$refs.imgInput) this.$refs.imgInput[0].value = '';
      this.currPageIdx = this.pageNum - 1;
      this.bookCopy.pages.push(newPage);
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
      this.bookCopy.pages[this.currPageIdx].paragraphs.push(newPar);
    },
    deletePar(idx) {
      this.bookCopy.pages[this.currPageIdx].paragraphs.splice(idx, 1);
    },
    deletePage(idx) {
      this.bookCopy.pages.splice(idx, 1);
      this.pageNum -= 1;
    },
    saveDetails() {
      this.togelModal = false;
    //   this.saveBook();
    },
    cancelFirstDetails() {
        this.bookCopy = JSON.parse(JSON.stringify(this.book));
      if(!this.book._id) {
          this.$router.push('./')
          this.togelModal = false

      } else {
        this.togelModal = false
      }
    },
    editBookDetails() {
          this.togelModal = true
    },
    setAudioFile() {
      cloudinaryService.doUploadAudio(this.$refs.audioInput).then(url => {
        this.bookCopy.audio = url.secure_url;
      });
    },

    setImgFile() {
        console.log('this.$refs.imgInput',this.$refs.imgInput[0].value)
      cloudinaryService.doUploadImg(this.$refs.imgInput).then(url => {
        this.bookCopy.pages[this.currPageIdx].img = url.secure_url;
      });
    },
    setCoverImgFile() {
      cloudinaryService.doUploadImg(this.$refs.coverImgInput).then(url => {
        this.bookCopy.coverImg = url.secure_url;
      });
    },
    setTimingPage() {
      this.bookCopy.pages[this.currPageIdx].time = this.$refs.audio.currentTime;
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
      this.bookCopy.pages[this.currPageIdx].paragraphs[idx].parStartTime = this.$refs.audio.currentTime;
      this.$refs.audio.pause();
    },
    saveBook() {
        this.book = JSON.parse(JSON.stringify(this.bookCopy));
      this.$store
        .dispatch({ type: SAVE_BOOK, book: this.book })
        .then(book => {
            console.log('2111111111111111111111')
          this.book = JSON.parse(JSON.stringify(book));
          this.$router.push('./')
        })
        .catch(err => {});
        
    }
  },
  toggleCarusale() {
      this.showCarusale = !this.showCarusale
      console.log(this.showCarusale);
      
  },
  components: {
    bookPage,
    imgCarusale
  }
};
</script>

// <style scoped lang="scss">



// $editorInputColor: #f5c2bd;
// $editorButtonColor: #d49c97;

// .outline {
//   outline: 1px solid hotpink;
// }

// .main-container {
//   height: 100vh;
// }
// .main-editor-container{
//   width: 90%;
//   height: 90vh;

// }

// .editor-container {
//   padding: 1rem;
// }

// audio {
//   margin: 0 0.5rem 0 0;
// }

// .firstDetailsContainer{
//     position: fixed;
//     top: 0;
//     right: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.726);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1;
//     font-family: 'Lato', sans-serif;
//   background-color: #e2dedbf5;

//   color: #b3aca7;
// }

// .firstDetails {
//     margin: 1rem;
//     border: solid 1px lightgray;
//     box-shadow: 0px 0px 11px black;
//     background-color: rgb(146, 133, 133);
// }


// .form-control {
//   width: 50%;
// }


// .page-form {
//   margin: 0 0 1rem;
// }
// .img-form {
//   margin: 0 1rem 0 0;
// }

// .first-details-btn-container {
//   margin-top: 10px;
//   border-bottom: 1px solid  #b3aca7;
//   // width: 100%;
// }

// .page-container {
//   min-height: 500px;
// }
// .page-area {
//       min-height: inherit;
//       box-shadow: 0 0 11px black;
// }





// .page-btns-container {
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
// }

// .page-ctr {
//   width: fit-content;
//   padding: 1rem;
// }
// .page-ctr-btn {
//   h1 {
//     margin: 0 0.5rem 0 0;
//   }
// }
// .par-btns-container {
//   display: flex;
//   justify-content: space-around;
//   right: 0;
//   padding: 0.3rem;
// }

// .par-list {
//   margin: 0;
//   padding: 0;
//   li {
//     margin: 0 0 1rem;
//   }
// }

// .book-categories {
//   // background: white;
//   // margin: 1rem;
//   width: 100%;
// }

// .book-categories:hover {
//   cursor: pointer;

// }

// .editor-previews {
//   li {
//     margin: 0 1rem 0 0;
//   }
// }

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }
// .set-btn {
//   margin: 0 0.5rem 0 0;
// }
// .details-btn {
//   margin: 0 0 0.5rem;
// }

// @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400);


// input::placeholder, textarea::placeholder {
//   color: #aca49c;
//   font-size: 0.875em;
// }

// input:focus::placeholder, textarea::focus:placeholder {
//   color: #bbb5af;
// }

// /* on hover placeholder */
// input:hover::placeholder, textarea:hover::placeholder {
//   color: #e2dedb;
//   font-size: 0.875em;
// }

// input:hover:focus::placeholder, textarea:hover:focus::placeholder {
//   color: #cbc6c1;
// }



// body {
//   font-family: 'Lato', sans-serif;
//   background: #e2dedb;
//   color: #b3aca7;
// }

// header {
//   position: relative;
//   margin: 100px 0 25px 0;
//   font-size: 2.3em;
//   text-align: center;
//   letter-spacing: 7px;
// }

// #form {
//   position: relative;
//   width: 500px;
//   margin: 50px auto 100px auto;
// }

// input, .file-upload__label, .file-upload__input {
//   font-family: 'Lato', sans-serif;
//   font-size: 0.875em;
//   width: 500px;
//   height: 40px;
//   padding: 0px 15px 0px 15px;
  
//   background: transparent;
//   outline: none;
//   color: #726659;
  
//   border: solid 1px #b3aca7;
//   border-bottom: none;
  
//   transition: all 0.3s ease-in-out;

// }

// input:hover {
//   background: #b3aca7;
//   color: #e2dedb;
// }

// textarea {
//   width: 500px;
//   max-width: 500px;
//   height: 110px;
//   max-height: 110px;
//   padding: 15px;
  
//   background: transparent;
//   outline: none;
  
//   color: #726659;
//   font-family: 'Lato', sans-serif;
//   font-size: 0.875em;
  
//   border: solid 1px #b3aca7;
  
//   transition: all 0.3s ease-in-out;
// }

// textarea:hover {
//   background: #b3aca7;
//   color: #e2dedb;
// }

// #submit {
//   width: 500px;
  
//   padding: 0;
//   margin: 5px 0px 0px 0px;
  
//   font-family: 'Lato', sans-serif;
//   font-size: 0.875em;
//   color: #b3aca7;
  
//   outline:none;
//   cursor: pointer;
  
//   border: solid 1px #b3aca7;
// }

// #submit:hover {
//   color: #e2dedb;
// }

// .categories label {
//   text-align: left;
// }
// .file-upload {
// 	position: relative;
// 	display: inline-block;
// }

// .file-upload__label1 {
//   display: block;
//   border-bottom: solid 1px #b3aca7;
//     font-family: 'Lato', sans-serif;
//     font-size: 0.875em;
//   // padding: 1em 2em;
//   // color: #fff;
//   // background: rgb(68, 68, 68);
//   // border-radius: .4em;
//   // transition: background .3s;
  
//   &:hover {
//     //  cursor: pointer;
//     //  background: #000;
//       background: #b3aca7;
//       color: #e2dedb;
//   }
// }
    
// .file-upload__input1 {
//     position: absolute;
//     left: 0;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     font-size: 1;
//     width:0;
//     height: 100%;
//     opacity: 0;
// }
// </style>
