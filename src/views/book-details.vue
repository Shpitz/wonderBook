<template>
    <section class="flex">
        <!-- <div class="img-container"></div> -->
        <img :src="book.coverImg" alt="">
        <div class="details-container">
        <h1>{{book.title}}</h1>
        <p>{{book.author}}</p>
        <p>{{book.createdAt | date-format}}</p>
        <p>{{book.description}}</p>
        <p>{{book.length}}</p>
        <p>{{book.numOfPages}}</p>
        </div>
    </section>

</template>

<script>
import {LOAD_BOOK} from "../store/book-module.js";

export default {
    name: 'bookDetails',
    data() {
        return {
            // book: null,
            book: {
                title: 'POPCORN DRAGON',
                author: 'omer sela ackerstain',
                status: 'done',
                createdAt: 1532447848554,
                description: `A long time ago, near a village called Buttery Glen,
                there lived a dragon. He was the color of midnight.
                He was huge and covered in sharp, pointy scales. The fire he 
                breathed could light up the night sky.
                A long time ago, near a village called Buttery Glen,
                there lived a dragon. He was the color of midnight.
                He was huge and covered in sharp, pointy scales. The fire he 
                breathed could light up the night sky.`,
                audio: '',
                numOfPages: 0,
                length: 240,
                coverImg: './img/books/page9.jpg'
                }
        }
    }
    // created() {
    //     let bookId = this.$route.params.bookId;
    //     this.$store.dispatch({type: LOAD_BOOK, bookId})
    //         .then(book => this.book = book)
    // }


}
</script>

<style scoped>
/* .img-container {
    background-image: url('../../public/img/books/page9.jpg')
} */

</style>
