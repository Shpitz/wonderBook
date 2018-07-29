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
                <button @click="saveDetails">save</button>
            </form>
        </div>
        <div>
            <h1>{{book.title}}</h1>
        <div class="audio-area">
            <!-- <button @click="uploadAudio">Upload audio file</button> -->
            <form action="/action_page.php">
                <input @change="setAudioFile" type="file" accept="audio/*" ref="audioInput">
            </form>
            <audio ref="audio" :src="audioPath" controls />
        </div>
        <h1>page # {{pageNum}}</h1>
        <div class="page-timing-container flex">
            <button @click="setTimingPage">Start Timing</button>
            <div class="display-timing">{{book.pages[pageNum-1].time}}</div>
        </div>
        <div class="page-container flex">
            <div class="page-area">
                <form action="/action_page.php">
                    <input @change="setImgFile" type="file" accept="image/*" ref="imgInput">
                </form>
                <div class="img-container" :style="{ backgroundImage: 'url(' + book.pages[pageNum-1].img + ')' }">
                    <p v-for="(p,idx) in book.pages[pageNum-1].paragraphs" :key="idx" >
                        {{p.txt}}
                    </p>
                </div>
            </div>
            <div class="par-area">
                <ul class="pagePar clean-list">
                    <li v-for="(par,idx) in book.pages[pageNum-1].paragraphs" :key="idx">
                        <textarea rows='3' cols='50' class="form-control" v-model="par.txt" placeHolder="Your paragraph here"/>
                        <button>Set</button>
                        <button @click="deletePar(idx)">Delete</button>
                        <button @click="setTimingPar(idx)">Start Timing</button>
                        <div class="display-timing">{{book.pages[pageNum-1].paragraphs[idx].parStartTime}}</div>
                    </li>
                </ul>
            </div>
            <button @click="addPar">Add Par</button>
        </div>
        <button @click="addPage">Add page</button>
        </div>
        
        <!-- <button @click="saveBook">Save</button> -->

    </section>
</template>

<script>
// import {
//   SAVE_BOOK,
// } from "../store/book-module.js";

export default {
  name: "bookEditor",
  data() {
    return {
        audioPath :'',
        imgPath :'',
        isFirstDetails: false,
        book: null,
        pageNum: 0,
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
      console.log(this.pageNum);
      
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
      this.book.pages.push(newPage)
      console.log(this.book.pages);
      
    },
    addPar() {
    var newPar = {...this.paragraph}
      this.book.pages[this.pageNum-1].paragraphs.push(newPar);
      console.log('book paragraphs: ', this.book.pages[this.pageNum-1].paragraphs);
       
    },
    deletePar(idx) {
         this.book.pages[this.pageNum-1].paragraphs.splice(idx, 1);
         console.log(this.book.pages[this.pageNum-1].paragraphs);
         


    },
    saveDetails() {
        this.isFirstDetails = true
        this.saveBook()
        console.log(this.book);

        
    },
    setAudioFile() {
        this.audioPath ="./audio/walkingTogether.mp3"
        
    },
    setImgFile() {
        this.imgPath ="./img/books/walkingTogether/cover.jpg";
        this.book.pages[this.pageNum-1].img = this.imgPath;
        this.imgPath = '';
        
    },
    setTimingPage(){
        console.log('start timing',this.$refs.audio.currentTime)
        this.book.pages[this.pageNum-1].time = this.$refs.audio.currentTime
        this.$refs.audio.pause()
    },
    setTimingPar(idx){
        console.log('start timing',this.$refs.audio.currentTime)
        this.book.pages[this.pageNum-1].paragraphs[idx].parStartTime = this.$refs.audio.currentTime
        this.$refs.audio.pause()
    },
//     saveBook() {
//       this.$store.dispatch({ type: SAVE_BOOK }).catch(err => {
//         console.log("error in saveing book", err);
//       });
//   },
//   components: {
//   }
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
</style>
