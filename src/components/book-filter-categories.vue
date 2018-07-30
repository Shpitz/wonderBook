    <template>
        <section class="book-filter-categories">
            <ul class="clean-list flex justify-center">
                <li class="categorie-container" v-for="(cat,idx) in categories"
                 :key="idx" @click="setCategorie(cat.catTxt)">
                    <div class="categorie-sub-container flex align-center">
                        <!-- <img :src="cat.img"/> -->
                    <div class="cat-img" :class="[cat.img === '' ? 'hidden' : '']"
                    :style="{ backgroundImage: 'url(' + cat.img + ')' }"/>
                    <div>
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
$container-bg:#ecececb3;
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
    margin: 0 1rem 0 0;
    }
}
 .categorie-container:last-child {
     margin: 0 0 1rem 0;
 }
.categorie-container:hover {
      .cat-img {
        opacity: 0.8;
      }
}
</style>
