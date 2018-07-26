<template>
   <section >
        <div class="page-container flex" :style="{ backgroundImage: 'url(' + pageImg + ')' }">
            <p>
                {{pageData.txt}}
            </p>
                <!-- <p v-for="(p,idx) in pageData.paragraph" :key="idx">
                         {{p.text}}
                </p> -->
             </div>
     </section>
</template>

<script>
export default {
  props: {
      pageData:Object
  },
  created(){
      console.log('pageData in book page',this.pageData)
  },
    computed: {
        pageImg(){
<<<<<<< HEAD
            return `./img/books/${this.pageData.img}`
=======
            //TODO: make it wor;
            return this.pageData.img;
>>>>>>> 7bb3a5da1a3abbb1e214cc49a28bf40d9f514fb2
        }
    }
};
</script>

<style scoped lang="scss">
.page-container {
    height: 80vh;
    background-size: cover;
    p {
        word-wrap: break-word;
    }
}
</style>
