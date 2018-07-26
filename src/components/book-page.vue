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
            return `./img/books/${this.pageData.img}`
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
