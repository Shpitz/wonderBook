<template>
   <section >
        <div class="page-container flex" :style="{ backgroundImage: 'url(' + pageImg + ')' }">
            <!-- <p>
                {{pageData.txt}}
            </p> -->
                <p v-for="(p,idx) in pageData.paragraphs" :key="idx" :class="[idx === parIdx ? 'red' : '']">
                         {{p.txt}}
                </p>
             </div>
     </section>
</template>

<script>
export default {
  props: {
      pageData:Object,
      parIdx:Number
  },
  created(){
      console.log('pageData in book page',this.pageData)
  },
    computed: {
        pageImg(){
            //TODO: make it wor;
            return this.pageData.img;
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

.red{
    color: red;
}
</style>
