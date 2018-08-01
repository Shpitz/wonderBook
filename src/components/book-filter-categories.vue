    <template>
        <section class="book-filter-categories">
            <ul class="clean-list flex-warp justify-center" >
                <li  class="categorie-container" v-for="(cat,idx) in categories"
                :class="[cat.img === '' ? 'no-img' : '',filterBy.byCategorie === cat.catTxt ? 'active' : '']"
                 :key="idx" @click="setCategorie(cat.catTxt)" title='Search by categorie'   >
                    <div class="categorie-sub-container flex align-center">
                        <!-- <img :src="cat.img"/> -->
                    <div class="cat-img" :class="[cat.img === '' ? 'hidden' : '']"
                    :style="{ backgroundImage: 'url(' + cat.img + ')' }"/>
                    <div class="txt">
                     <p>
                     {{cat.catTxt}}
                     </p>
                    </div>
                    </div>
                </li>
            </ul>
        </section>
    </template>

<script>
import { BOOKS_FILTER } from "../store/book-module.js";
export default {
  props: {
    categories: Array
  },
  data() {
    return {
      filterBy: {
        byCategorie: ""
      }
    };
  },
  mounted() {
    
    var filter = this.$store.getters[BOOKS_FILTER];
    this.filterBy.byCategorie = filter.byCategorie;
    console.log("this.filterBy", this.filterBy);
  },

  methods: {
    setCategorie(categorie) {
      categorie = categorie === "All" ? "" : categorie;
      this.filterBy.byCategorie = categorie;
      this.$emit("searchCategorie", this.filterBy);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_vars.scss";

$container-bg:white;
  ul {
        background-color: $container-bg;
        padding: 1rem 1rem 0;
        margin: 0;
    }


.categorie-container{
    cursor: pointer;
    transition: all 0.3s;
    border:1px solid rgba(0, 0, 0, 0.1);
     margin: 0 1rem 1rem 0;
     width: 200px;
    
    p {
        margin: 0;
    }
    .cat-img {
     width: 96px;
    height: 72px;
    background-size: cover ;
    background-position: 50% 50% ;
    background-repeat: no-repeat;
    }
}
 .categorie-container:last-child {
     margin: $margin-bM;
 }
.categorie-container:hover {
      .cat-img {
        opacity: 0.8;
      }
}

.txt {
    padding: .5rem;
}
.no-img {
       width: auto;
       padding: .3rem;
}
.no-img:hover {
    color:$main-color-hover;
    font-weight: bold;
}

@media (max-width: 415px) {
    .categorie-container {
        width: 100px;
        .cat-img  {
                height: 45px;
        }
    }
    .txt {
        font-size: .8rem;
    }

}
</style>
