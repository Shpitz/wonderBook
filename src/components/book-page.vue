  <template>
    <section class="book-page " >
      <!-- <loader v-if="!pageData"></loader> -->
      <!-- <div v-if="!previewInEdit" :class="{collapsed:!pageData , fullImg:isFullScrean}"
       class=" page-container page-display  relative"
        ref="page-container" :style="{ backgroundImage: 'url(' + pageImg + ')'}">
        <div class="p-container" ref="p-container">
          <p v-for="(p,idx) in pageData.paragraphs" :key="idx" :class="[idx === parIdx ? 'active-p animated fadeIn' : '']">
            {{p.txt}}
          </p>
        </div>
        <slot></slot>
        <button @click="fullScreen" slot="fullScreen" class="full-btn clean-btn">
          <font-awesome-icon class="icon" icon="arrows-alt" />
        </button>
      </div> -->


<div class="wrapper" ref="page-container" v-if="!previewInEdit" >
  <div class="wrapper-container"   ref="bookPage"  :class="{fullImg:isFullScrean}"  >
    <div class="image-media" :style="{ backgroundImage: 'url(' + pageImg + ')'}">
        <div class="p-container" ref="p-container">
          <p v-for="(p,idx) in pageData.paragraphs" 
          :key="idx" :class="[idx === parIdx ? 'active-p animated zoomIn' : '']">
            {{p.txt}}
          </p>
        </div>
    </div>
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
      <div v-if="previewInEdit" class="page-container relative page-edit-preview" :style="{ backgroundImage: 'url(' + pageImg + ')'}">
        <div class="p-container-prev ">
          <p v-for="(p,idx) in pageData.paragraphs" :key="idx">
            {{p.txt}}
          </p>
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
      return this.pageData.img;
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
      console.log(this.isFullScrean)
    }
  }
};
</script>

<style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

.book-page {
  background-position: center;
  // background-image: url("../../public/img/background/book-page.png");
  background-size: contain;
  background-repeat: no-repeat;
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
    font-size: 1.3rem;
    font-weight: bold;
    font-family: $story-font;
  }

.p-container {
  border-radius: 10px;
  // background-color: #f0f8ff57;
  padding: 1rem;
  max-width: 80%;
 
  .active-p {
    font-weight: bold;
    font-size: 1.5rem;
    color: #ff2121;
  }
}
.full-btn {
  align-self: flex-end;
  align-self: flex-end;

}

#container.fullImg{
  height: 95vh;
  width: 95vw;
}


  @media(max-width:340px) { 
     p {
    font-size: 1rem;
     }
     .p-container {
       .active-p {
        font-size: 1.3rem;
          }
     }
  }


</style>
