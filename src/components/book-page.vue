 <template>
        <section  class="book-page " ref="bookPage">
            <!-- :class="{collapsed:!pageData}" -->
            <div v-if="!previewInEdit" class="animate fade page-container page-display  relative" ref="page-container" :style="{ backgroundImage: 'url(' + pageImg + ')'}">
                <div class="p-container" ref="p-container">
                    <p v-for="(p,idx) in pageData.paragraphs" :key="idx"
                     :class="[idx === parIdx ? 'active-p animated fadeIn' : '']">
                        {{p.txt}}
                    </p>
                </div>
                <slot></slot>
                <button @click="fullScreen" slot="fullScreen" class="full-btn clean-btn">
                    <font-awesome-icon class="icon" icon="arrows-alt" />
                </button>
            </div>
            <!-- priview in editor -->
              <div v-if="previewInEdit"  class="page-container relative page-edit-preview" 
               :style="{ backgroundImage: 'url(' + pageImg + ')'}">
                <div class="p-container-prev" >
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
  }
};
</script>

<style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

.book-page {
  background-position: center;
  background-image: url("../../public/img/background/book-page.png");
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
  // transition:opacity 1s ease-in-out;
  // img {
  //    object-fit: cover;
  //   width: 100%;
  //   height: 100%;
  //   border-radius: inherit;
  //   z-index: -1;
  // }
}


.p-container {
  border-radius: 10px;
  background-color: #f0f8ff57;
  padding: 1rem;
  // margin: 0.5rem;
  max-width: 80%;
  p {
    word-wrap: break-word;
    text-align: left;
    font-size: 1.3rem;
    font-family: $story-font;
    // transition: all 0.3s;
  }

  .active-p {
    font-weight: bold;
    font-size: 1.5rem;
  }
}
.full-btn {
  align-self: flex-end;
  align-self: flex-end;
  position: absolute;
  left: 95%;
}
</style>
