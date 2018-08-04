<template>
    <section>
        <div class="flex section section1">
            <div class="flex column space-around section-txt">
                <div>
                    <h1>Easily publish books</h1>
                    <p>Don't let your stories be forgotten</p>
                </div>
                <button class="create-button" @click="createBook">Create your book</button> 
            </div>
            <div class="section-img">
                <img src="../../public/img/boy-read2.jpg" alt="">
            </div>
        </div>
        <div class="flex section section2">
            <div class="section-img">
                <img src="../../public/img/girl-read2.jpg" alt="">
            </div>
            <div class="flex column justify-center section-txt">
                <h1>Add your voice</h1>
                <p>Keep your stories alive with your voice, sound effects, and music.</p> 
            </div>
        </div>
        <div class="bee flex justify-center">
            <img src="../../public/img/background/bee2.png" alt="">
        </div>
        <div class="flex column justify-center section section3 section-txt">
            <h1>Read & hear books</h1>
            <div class="flex column subtext">
                <p>Enjoy books shared by worldwide members.</p>
                <p>Connect with authors to show appreciation.</p>
            </div>
        </div>
        <div class="flex justify-center">
            <book-filter-categories :categories="filterCategories" @searchCategorie="updateFilter"></book-filter-categories>
        </div>
        <div class="bee flex justify-center">
            <img src="../../public/img/background/bee1.png" alt="">
        </div>
        <div class="flex section section4">
            <div class="flex column justify-center section-txt">
                <h1>Educate</h1>
                <div class="subtext">
                    <p>Inspire passion for reading & writing</p>
                    <p>Read & hear books from our free library</p>
                </div>
            </div>
            <div class="section-img">
                <img src="../../public/img/father-son-read.jpg" alt="">
            </div>
        </div>
        <div class="bee flex justify-center">
            <img src="../../public/img/background/bee2.png" alt="">
        </div>
        <div class="flex section section5">
            <div class="section-img">
                <img src="../../public/img/family-read.jpg" alt="">
            </div>
            <div class="flex column justify-center section-txt">
                <h1>Collaborate</h1>
                <div class="subtext">
                    <p>More fun with friends, family, and classmates</p>
                    <p>Share your books & get positive feedback from our community</p>
                </div>
            </div>
        </div>
        <app-footer></app-footer>

    </section>
</template>

<script>
import { UPDATE_SEARCH_FILTER } from "../store/book-module.js";
import bookSerivce from '../services/book-service.js'
import appFooter from "../components/footer-cmp.vue"
import bookFilterCategories from "../components/book-filter-categories.vue"
export default {
    name: 'bookCreate',
    dtat() {
        return {
            filterCategories:  [],

        }
    },
    created() {
        this.filterCategories = bookSerivce.getCategories()

    },
    methods: {
        createBook() {
            this.$router.push('/bookEditor')
        },
        updateFilter(filterBy) {
        this.$store.commit({ type: UPDATE_SEARCH_FILTER, filterBy});
        this.$router.push(`/`);
        }
    },
    components: {
        appFooter,
        bookFilterCategories,
        bookSerivce
    }


}
</script>

<style scoped>

    .create-button {
        margin: 1em;
    }
    .bee{
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        padding-bottom: 10px;
    }
    .bee img {
        width: 20%;
        height: 40%;
        margin: 0 auto;
        display: block;
    }

    .section-img {
        width: 50%;
        margin: 0;
        padding: 0;
        object-fit: contain;
    }
    .section-img img {
        width: 95%;
    }

    .section-txt {
        width: 50%;
        padding: 2em;
        margin: 1em; 
    }
    .section3.section-txt{
        width: 100%;
    }
    .section-txt h1 {
        text-transform: uppercase;
        font-size: 2.3em;
        margin: 0;
    }
    .section-txt p{
        font-size: 1.3em;
        /* margin: 10px; */
    }
    .subtext {
        margin-top: 30px;
    }
    .section {
        margin: 2em 2em;
    }

    @media(max-width: 800px) {
        .section {
            flex-direction: column;
        }
        .bee img{
            width: 40%;
        }
        .section-img {
            width: 100%;
            order: 0;
        }
        .section-img img {
            width: 80%;
        }

        
    }



</style>
