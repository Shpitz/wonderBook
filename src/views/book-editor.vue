<template>
    
<section class="book-editor">
    <div class="firstDetails">
        <form id="form" class="topBefore">
            <input class="form-control" type=text v-model="book.title" placeHolder="Book title">
            <input class="form-control" type=text v-model="book.author" placeHolder="Author name">
            <input class="form-control" type=text v-model="book.illustrator" placeHolder="Illustrator name">
            <textarea rows="10" class="form-control" v-model="book.description" placeHolder="Book description" />
            <v-select class="book-categories form-control" placeHolder="Categories" multiple v-model="book.categories" :options="options"></v-select>
            <input type="submit" @click.prevent="saveDetails" value="save">
        </form>
    </div>
    <button @click="editBookDetails">Update Book Details</button>
    <h1>{{book.title}}</h1>

    <h1>Page {{currPageIdx+1}}</h1>


    <div class="page-container flex">
        <div class="page-area">
            <div class="page-btns-container">
                <div class="page-timing-container">
                    <button @click="setTimingPage">Page Timing</button>
                    <div class="display-timing">{{book.pages[currPageIdx].time}}</div>
                </div>
                <form method="POST" @submit.prevent="setImgFile" ref="imgInput" class="page-img-upload-form">
                    <input type="file" accept="image/*">
                    <button type="submit" class="btn">Submit</button>
                </form>
            </div>
            <div class="img-container" :style="{ backgroundImage: 'url(' + book.pages[currPageIdx].img + ')' }">
                <div class="par-area">
                    <ul class="pagePar clean-list">
                        <li class="paragraphs-item" v-for="(par,idx) in book.pages[currPageIdx].paragraphs" :key="idx">
                            <textarea rows='3' cols='50' class="form-control" v-model="par.txt" placeHolder="Your paragraph here" />
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
        <form action="" @submit.prevent="setAudioFile" ref="audioInput">
            <input type="file" accept="audio/*">
            <button type="submit" class="btn">Submit</button>
        </form>
        <audio ref="audio" :src="book.audio" controls />
    </div>
    <button @click="saveBook">Save</button>
    <ul class="editor-previews clean-list flex">
        <li @click="selectPage(pageIdx)" v-for="(page,pageIdx) in book.pages" :key="pageIdx">
            <bookPage :pageData="page" :previewInEdit="true" ></bookPage>
        </li>
    </ul>

</section>
</template>

<script>
import { SAVE_BOOK } from "../store/book-module.js";
import bookPage from "../components/book-page.vue";
import cloudinaryService from "../services/cloudinary-service.js";
export default {
  name: "bookEditor",
  data() {
    return {
      audioPath: "",
      imgPath: "",
      isFirstDetails: false,
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
    console.log(this.book);
    console.log(this.currPageIdx, "currPageIdx");

    console.log(this.book.pages[this.pageNum - 1]);
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
      this.isFirstDetails = true;
      this.saveBook();
      console.log(this.book);
    },
    editBookDetails() {
      this.isFirstDetails = false;
    },
    setAudioFile() {
      cloudinaryService.doUploadAudio(this.$refs.audioInput).then(url => {
        console.log("url!audiio!!!", url.secure_url);
        this.book.audio = url.secure_url;
      });
    },

    setImgFile() {
      cloudinaryService.doUploadImg(this.$refs.imgInput).then(url => {
        console.log("url!!!!!!!!!!", url.secure_url);
        this.book.pages[this.currPageIdx].img = url.secure_url;
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

.book-editor{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.firstDetails {
  width: 40%;
  border: solid 1.5px gray;
}

.topBefore {
  display: flex;
  flex-direction: column;
}

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
  width: 100%;
  margin: 0 auto;
  background: white;
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





</style>
