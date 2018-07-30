<template>
        <section>
        <div v-if="!isFirstDetails" class="firstDetails">
            <form>
                <div class="">
                    <span>Book Title:</span>
                    <input class="form-control" type=text v-model="book.title" placeHolder="Enter your book title here">
                </div>
                <div class="">
                    <span>Author:</span>
                    <input class="form-control" type=text v-model="book.author" placeHolder="Enter your name here">
                </div>
                <div class="">
                    <span>Illustrator:</span>
                    <input class="form-control" type=text v-model="book.illustrator" placeHolder="Enter illustrator name here">
                </div>
                <div class="">
                    <span>catefories:</span>
                    <input class="form-control" type=text v-model="book.categories" placeHolder="Enter categories here">
                </div>
                <div class="">
                    <span>description:</span>
                    <textarea rows='4' cols='50' class="form-control" v-model="book.description" placeHolder="Your book description here" />
                </div>
                <button @click.prevent="saveDetails">save</button>
            </form>
        </div>
        <div>
            <h1>{{book.title}}</h1>
        <div class="audio-area">
            <!-- <button @click="uploadAudio">Upload audio file</button> -->
            <form action="" @submit.prevent="setAudioFile" ref="audioInput">
                <input @change.prevent="setAudioFile" type="file" accept="audio/*">
                <div>
                    <button type="submit" class="btn">Submit</button>
                </div>
            </form>
            <audio ref="audio" :src="book.audio" controls />
        </div>
        <h1>page # {{currPageIdx}}</h1>
        <div class="page-timing-container flex">
            <button @click="setTimingPage">Start Timing</button>
            <div class="display-timing">{{book.pages[currPageIdx].time}}</div>
        </div>
        <div class="page-container flex">
            <div class="page-area">
                <form method="POST" @submit.prevent="setImgFile" ref="imgInput">
                    <input type="file" accept="image/*" >
                    <div>
                        <button type="submit" class="btn">Submit</button>
                    </div>
                </form>
                <div class="img-container" :style="{ backgroundImage: 'url(' + book.pages[currPageIdx].img + ')' }">
                    <p v-for="(p,idx) in book.pages[currPageIdx].paragraphs" :key="idx" >
                        {{p.txt}}
                    </p>
                </div>
            </div>
            <div class="par-area">
                <ul class="pagePar clean-list">
                    <li v-for="(par,idx) in book.pages[currPageIdx].paragraphs" :key="idx">
                        <textarea rows='3' cols='50' class="form-control" v-model="par.txt" placeHolder="Your paragraph here"/>
                        <button>Set</button>
                        <button @click="deletePar(idx)">Delete</button>
                        <button @click="setTimingPar(idx)">Start Timing</button>
                        <div class="display-timing">{{book.pages[currPageIdx].paragraphs[idx].parStartTime}}</div>
                    </li>
                </ul>
            </div>
            <button @click="addPar">Add Par</button>
        </div>
        <button @click="addPage">Add page</button>
        </div>
        
        <button @click="saveBook">Save</button>
        <ul class="editor-previews clean-list flex">
            <li @click="selectPage(pageIdx)" v-for="(page,pageIdx) in book.pages" :key="pageIdx"><bookPage :pageData="page"></bookPage></li>
        </ul>
    </section>
</template>

<script>
import {
  SAVE_BOOK,
} from "../store/book-module.js";
import bookPage from "../components/book-page.vue";
import cloudinaryService from "../services/cloudinary-service.js"
export default {
  name: "bookEditor",
  data() {
    return {
        audioPath :'',
        imgPath :'',
        isFirstDetails: false,
        book: null,
        pageNum: 0,
        currPageIdx: 0,
        parNum: 1,
        paragraph: {
            txt: '',
            parStartTime: 0,
            parEndTime: 0
        }
    };
  },
  created() {
      this.book = {
        title :'',
        author: '',
        illustrator: '',
        categories: [],
        description: '',
        rating : 0,
        views : 0,
        numOfPages : 0,
        duration: 0,
        audio : '',
        coverImg : '',
        pages: [],
        reviews : [],
        status: 'inProgress',
        createdAt: Date.now(),
      }
      this.addPage();
      console.log(this.book);
      console.log(this.currPageIdx,'currPageIdx');
      
      console.log(this.book.pages[this.pageNum-1]);

      
  },
  computed: {},
  methods: {
    addPage() {
     
      this.pageNum += 1;
      var newPage = {
            time: 0,
            img: '',
            paragraphs: [
                {
                txt: '',
                parStartTime: 0,
                parEndTime: 0
                }
            ]
      }
      this.currPageIdx = this.pageNum-1;
      this.book.pages.push(newPage);
      console.log(this.book.pages);
      
    },
    selectPage(idx){
        debugger;
        this.currPageIdx = idx
    },
    addPar() {
    var newPar = {...this.paragraph}
      this.book.pages[this.currPageIdx].paragraphs.push(newPar);
    },
    deletePar(idx) {
         this.book.pages[this.currPageIdx].paragraphs.splice(idx, 1);
        
    },
    saveDetails() {
        this.isFirstDetails = true
        this.saveBook()
        console.log(this.book);

        
    },
    setAudioFile() {
        // console.log(this.$refs.audioInput)
        // this.audioPath ="./audio/walkingTogether.mp3"
        // this.book.audio = this.audioPath;

        // var something = cloudinaryService.uploadImg(this.$refs.audioInput);
        cloudinaryService.doUploadAudio(this.$refs.audioInput)
        .then((url)=>{
            console.log('url!audiio!!!',url.secure_url)
            this.book.audio = url.secure_url;
            })
    },

    setImgFile() {
        cloudinaryService.doUploadImg(this.$refs.imgInput)
        .then((url)=>{
            console.log('url!!!!!!!!!!',url.secure_url)
            this.book.pages[this.currPageIdx].img = url.secure_url;
            })
    },
    setTimingPage(){
        console.log('start timing',this.$refs.audio.currentTime)
        this.book.pages[this.currPageIdx].time = this.$refs.audio.currentTime
        this.$refs.audio.pause()
    },
    setTimingPar(idx){
        console.log('start timing',this.$refs.audio.currentTime)
        this.book.pages[this.currPageIdx].paragraphs[idx].parStartTime = this.$refs.audio.currentTime
        this.$refs.audio.pause()
    },
    saveBook() {
      this.$store.dispatch({ type: SAVE_BOOK, book: this.book})
      .then((book)=>{
          console.log('book',book);
          this.book = JSON.parse(JSON.stringify(book))
      })
      .catch(err => {
        
      });
    },
},
components: {
          bookPage
      }
}
</script>

<style scoped>
.firstDetails{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(81, 109, 82, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    border: 1px solid black;
}
.img-container{
    border: 1px black solid;
    width: 400px;
    height: 300px;


}

.editor-previews li{
    max-width: 80px;
    max-height: 80px;
}
</style>
