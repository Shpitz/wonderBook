<template>
    
<section class="book-editor" >
    <div v-if="book">
    <transition name="fade">
    <div v-if="isFirstDetails" class="firstDetails form-style-3">
        <form id="form" class="topBefore">
                <input class="form-control" type=text v-model="book.title" placeHolder="Book title">
                <input class="form-control" type=text v-model="book.author" placeHolder="Author name">
                <input class="form-control" type=text v-model="book.illustrator" placeHolder="Illustrator name">
                <textarea rows="5" cols="500" class="form-control" v-model="book.description" placeHolder="Book description" />
                <v-select class="book-categories form-control" placeHolder="Categories" multiple v-model="book.categories" :options="options"></v-select>
                <form method="POST" ref="coverImgInput" class="page-img-upload-form">
                    <input type="file" accept="image/*" @change.prevent="setCoverImgFile" class="input-file">
                    <label tabindex="0" for="my-file" class="input-file-trigger">Select a file...</label>
                </form>


                    <!-- <div class="input-file-container">
                        <input class="input-file" type="file" name="image" onchange="onFileInputChange(event)" />
                        <label tabindex="0" for="my-file" class="input-file-trigger">Select a file...</label>
                    </div> -->

                <div class="first-details-btn-container">
                    <input type="submit" @click.prevent="saveDetails" value="Save">
                    <input type="button" @click.prevent="cancelFirstDetails" value="Cancel">
                </div>
        </form>
    </div>
    </transition>
    <button v-if="!isFirstDetails" @click="editBookDetails">Update Book Details</button>
    <h1>{{book.title}}</h1>

    <!-- <h1>Page {{currPageIdx+1}}</h1> -->


    <div class="page-container flex">
        <div class="page-area">
            <div class="page-btns-container">
                <div class="page-timing-container">
                    <button @click="setTimingPage">Page Timing</button>
                    <div class="display-timing">{{book.pages[currPageIdx].time}}</div>
                </div>
                <form method="POST" ref="imgInput" class="page-img-upload-form">
                    <input type="file" accept="image/*" @change.prevent="setImgFile">
                </form>
            </div>
            <div class="img-container" :style="{ backgroundImage: 'url(' + book.pages[currPageIdx].img + ')' }">
                <div class="par-area">
                    <ul class="pagePar clean-list">
                        <li class="paragraphs-item" v-for="(par,idx) in book.pages[currPageIdx].paragraphs" :key="idx">
                            <textarea rows='3' cols='50' v-model="par.txt" placeHolder="Your paragraph here" />
                            <div class="par-btns-container">
                                <button @click="deletePar(idx)">Delete</button>
                                <div class="par-timing-container">
                                    <button @click="setTimingPar(idx)">Start Timing</button>
                                    <div class="display-timing">{{book.pages[currPageIdx].paragraphs[idx].parStartTime}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <button @click="addPar">Add Par</button>
            </div>
            <div class="page-btns-container">
                <button @click="addPage">Add page</button>
                <button @click="deletePage(currPageIdx)">Delete page</button>
            </div>
        </div>
    </div>
    <div class="audio-area">
        <form action="" ref="audioInput">
            <input type="file" accept="audio/*" @change.prevent="setAudioFile">
        </form>
        <audio ref="audio" :src="book.audio" controls />
    </div>
    <button @click="saveBook">Save</button>
    <ul class="editor-previews clean-list flex">
        <li @click="selectPage(pageIdx)" v-for="(page,pageIdx) in book.pages" :key="pageIdx">
            <bookPage :pageData="page" :previewInEdit="true" ></bookPage>
        </li>
    </ul>
</div>
</section>
</template>

<script>
import { SAVE_BOOK,LOAD_BOOK } from "../store/book-module.js";
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
    if (this.$route.params.bookId){
        this.$store.dispatch({ type: LOAD_BOOK, bookId: this.$route.params.bookId })
        .then((book) => {
            console.log('book after dispach!!!!',book)
            return this.book = book});
    }
    else {
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
      debugger;
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
      console.log("before delete", this.book.pages);
      console.log("before delete", this.pageNum);
      this.book.pages.splice(idx, 1);
      this.pageNum -= 1;
      console.log("after delete", this.book.pages);
      console.log("after delete", this.pageNum);
    },
    saveDetails() {
      this.isFirstDetails = false;
      this.saveBook();
    },
    cancelFirstDetails(){
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
      console.log("start timing", this.$refs.audio.currentTime);
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
      console.log("start timing", this.$refs.audio.currentTime);
      this.book.pages[this.currPageIdx].paragraphs[
        idx
      ].parStartTime = this.$refs.audio.currentTime;
      this.$refs.audio.pause();
    },
    saveBook() {
      this.$store
        .dispatch({ type: SAVE_BOOK, book: this.book })
        .then(book => {
          console.log("book", book);
          this.book = JSON.parse(JSON.stringify(book));
        })
        .catch(err => {});
      console.log("book:", this.book);
    }
  },
  components: {
    bookPage
  }
};
</script>

<style scoped lang="scss">

$editorInputColor : #f5c2bd;
$editorButtonColor : #d49c97;

.book-editor{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.upload-btn{
    width: 100px;
    height: 100px;
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

.form-control{
    width: 50%;
}

.first-details-btn-container{
    margin: 1rem;
    display: flex;
    justify-content: space-around;
    width: 50%;
}

/* .first-details-container, .first-title-container{
    display: flex;
    justify-content: space-around;
    align-items: center;
} */

.page-container{
    width: 90%;
    margin: 1rem;
}

.page-btns-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.page-timing-container{
    display: flex;
    align-items: center;
}

.page-area{
  border: 1px black solid;
    width: 100%;
}

.img-container {
  width: 100%;
}

.page-img-upload-form{
    display: flex;
    flex-direction: column;
}

.paragraphs-item{
    display: flex;
    flex-direction: column;
}

.par-btns-container{
    display: flex;
    justify-content: space-around;
}

.par-timing-container{
    display: flex;
}

.pagePar{
    padding: 1rem;
}

.page-btns-container{
    display: flex;

}



.book-categories {
  background: white;
  margin: 1rem;
  width: 50%;
}

.audio-area{
    width: 50%;
    border: solid 1px black;
}

.editor-previews {
  li {
    margin:0 1rem 0 0;
  }
}



.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  
</style>
