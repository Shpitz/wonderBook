<template>
    <section>
            <!-- <carousel :navigationEnabled="true">' + buildSlideMarkup(10) + '</carousel> -->
              <carousel :per-page="4" :mouse-drag="true" 
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
    // import carousel from 'VueCarousel.Carousel'
    // import slide from 'VueCarousel.Slide'
    import bookPage from "../components/book-page.vue";

    import { Carousel, Slide } from 'vue-carousel';
    export default {
        name: "imgCarusale",
        props: ['pages'],
        data() {
            return {

            }
        },
        methods: {
            handleSlideClick (pageIdx) {
                console.log(pageIdx)
                this.$emit('onPreviewClicked', pageIdx)
            },
        },
        components: {
            Carousel,
            Slide,
            bookPage
        }
    }
</script>

<style scoped>
.slide-page-container {
    margin: 0 1rem 0 0;
    padding: 1rem;
}


</style>
