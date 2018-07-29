<template>
   <section >
        <div class="page-container flex space-between" :style="{ backgroundImage: 'url(' + pageImg + ')' }">
           <div class="p-container" ref="p-container">
       <p v-for="(p,idx) in pageData.paragraphs" :key="idx" :class="[idx === parIdx ? 'red' : '']">
                         {{p.txt}}
                </p>
           </div>
              <slot></slot>
             </div>
     </section>
</template>

<script>
export default {
  props: {
    pageData: Object,
    parIdx: Number
  },
  created() {
    console.log("pageData in book page", this.pageData);
  },
  mounted() {
    this.goto("p-container");
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
    }
  }
};
</script>

<style scoped lang="scss">
.page-container {
  height: 85vh;
  background-size: cover;
  align-items: flex-start;
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 0 11px black;
  background-position: center;
}

.red {
  color: red;
  font-weight: bold;
}
.p-container {
  border-radius: 10px;
  background-color: #f0f8ff57;
  padding: 1rem;
  p {
    word-wrap: break-word;
    text-align: left;
    font-family: "Merriweather", sans-serif;
    color: #2c3e50;
    transition: all 0.3s;
  }
}
</style>
