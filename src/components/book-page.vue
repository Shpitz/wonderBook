  <template>
    <section >
<div class="wrapper" ref="page-container" v-if="!previewInEdit" >
  <div class="wrapper-container book-page "    ref="bookPage"  :class="{fullImg:isFullScrean}"  >
    <div :class="[pageData.imgSize]" @click="$emit('onImage')"  class="image-media"
        :style="imgStyle">
        <div class="p-container" ref="p-container">
          <p v-for="(p,idx) in pageData.paragraphs" 
          :key="idx"  :style="{color:p.color}"
          :class="[idx === parIdx ? 'active-p animated fadeIn' : '']">
            {{p.txt}}
          </p>
        </div>
    </div>
      <div class="img-error"></div>
    <div class="media-settings">
   <button @click="fullScreen"  class="full-btn clean-btn">
          <font-awesome-icon class="icon" icon="arrows-alt" />
        </button>
    </div>
    <slot>
    </slot>
  </div>
</div>
      <!-- priview in editor -->
      <div class="book-page ">
  <div v-if="previewInEdit" class="page-container relative page-edit-preview" 
      :style="{ backgroundImage: 'url(' + pageImg + ')'}">
        <div class="p-container-prev ">
          <p v-for="(p,idx) in pageData.paragraphs" :key="idx">
            {{p.txt}}
          </p>
        </div>
      </div>
      </div>
    
    </section>
  </template>

<script>
import StorageService from "../services/book-service.js";

export default {
  data() {return {
    isFullScrean : false
  }},
  props: {
    pageData: Object,
    parIdx: Number,
    previewInEdit: Boolean
  },
  mounted() {
    if(!this.previewInEdit) this.goto("page-container");
  },
  computed: {
    pageImg() {
      var img = this.pageData.img;
      return img
    },
    imgStyle(){
      return  { 
        backgroundImage: 'url(' + this.pageData.img + ')',
       backgroundPosition:this.pageData.imgPosition
       }
    }

  },
  methods: {
    goto(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);

    },
    fullScreen() {
      var elem = this.$refs.bookPage;
      if (!this.isFullScrean){        
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
      }
      else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
      }
      this.isFullScrean = !this.isFullScrean;
    }
  }
};
</script>

 <style scoped lang="scss">
    @import "./src/assets/scss/_vars.scss";


    .book-page {
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .image-media{
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      &::before{
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  // class for div with img background
    .cover {
      background-size: cover;
    }
    .contain {
      background-size: contain;
    }
// end

    .img-error{
    background-image: url("../../public/img/background/img-error.png");
    height: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 50%;
    z-index: -1;
    width: 50px;
    top: 50%;

    }
    .page-display {
      height: 85vh;

    }

    .page-container {
      background-size: cover;
      align-items: flex-start;
      padding: 0.5rem;
      border-radius: 10px;
      box-shadow: 0 0 11px black;
      background-position: center;
      display: flex;
      justify-content: space-between;
      font-family: $story-font;

    }

    p {
      word-wrap: break-word;
      text-align: left;
      font-size: 2.5rem;
      font-weight: 600;
      -webkit-text-stroke: 0.033rem rgb(236, 228, 228);
      font-family: $story-font;
    }

    .p-container {
      border-radius: 10px; // background-color: #f0f8ff57;
      padding: 1rem;
      max-width: 100%;

      .active-p {
        font-weight: 700;
        font-size: 3.3rem;
        
      }
    }

    .full-btn {
      color:#6d6d6d;
      align-self: flex-end;
      align-self: flex-end;

    }

    #container.fullImg {
      height: 95vh;
      width: 95vw;
    }
     @media(max-width:550px) {
        p {
        font-size: 1rem;
      }
      .p-container {
        .active-p {
          font-size: 1.2rem;
        }
      }
     }

     @media(min-width:550px) and (max-width:736px) {
          p {
        font-size: 2rem;
      }
      .p-container {
        .active-p {
          font-size: 2.2rem;
        }
      }
     }

    @media(max-width:736px) {
     
    .image-media {
    background-size: contain;
    background-position: top;

         }
    }
      
   
  </style>
