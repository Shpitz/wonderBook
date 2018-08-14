<template>
    <section>
              <carousel :per-page="3" :mouse-drag="true" 
              :navigationEnabled="true"
                navigationNextLabel="▶"
                navigationPrevLabel="◀">
                <slide class="slide-page-container"  v-for="(page,pageIdx) in pages" data-index="pageIdx" :key="pageIdx" data-name="MySlideName" @slideClick="handleSlideClick(pageIdx)">
                    <bookPage :pageData="page" :previewInEdit="true" ></bookPage>
                </slide>
            </carousel>
    </section>
</template>

<script>
import bookPage from "../components/book-page.vue";

import { Carousel, Slide } from "vue-carousel";
export default {
  name: "imgCarusale",
  props: ["pages"],
  data() {
    return {};
  },
  methods: {
    handleSlideClick(pageIdx) {
      this.$emit("onPreviewClicked", pageIdx);
    }
  },
  components: {
    Carousel,
    Slide,
    bookPage
  }
};
</script>

<style scoped>
.slide-page-container {
  margin: 0 1rem 0 0;
  padding: 1rem;
  max-width: 250px;
}
</style>
