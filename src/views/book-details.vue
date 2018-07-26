<template>
    <section  v-if="book" class="flex space-between">
        <div class="details-img-wrap flex justify-center">
            <!-- <div class="img-details"></div> -->
            <img src="https://images2.storyjumper.com/transcoder.png?trim&id=78-oqy1h9n0d9-56y1kdrcl&maxw=512&maxh=512" alt="">
        </div>
        <div class="details-container">
            <div class="details-title">
            <h1>{{book.title}}</h1>
            </div>
                        <div class="details-share-btns">
                <button class="fa-btn">
                    <font-awesome-icon icon="envelope" />
                </button>
                <button class="fa-btn">
                    <font-awesome-icon icon="bell" />
                </button>
                <button class="fa-btn">
                    <font-awesome-icon icon="edit" />
                </button>
                <button class="fa-btn">
                    <font-awesome-icon icon="book" />
                </button>

            </div>
            <div class="details-header">
            <pre>{{book.categories}}</pre>
            <p>{{book.rating}}</p>
            <p>{{book.views}}</p>
            <p>{{book.duration}}</p>
            <p>{{book.createdAt | date-format}}</p>
            <p>{{book.numOfPages}}</p>
            <p>{{book.author}}</p>
            <p>{{book.illustrator}}</p>
            </div>

            <div class="details-description">
            <p>{{book.description}}</p>
            </div>
            <div class="btn-wrap flex column">
                <button class="play-book" @click="playBook()">Play Book</button>
                <button class="back">Back</button>
            </div>
        </div>
    </section>

</template>

<script>
import {LOAD_BOOK} from "../store/book-module.js";

export default {
    name: 'bookDetails',
    data() {
        return {
            book: null,
        }
    },
    methods: {
        playBook() {
            this.$router.push(`/bookReading/${this.book._id}`)
        }
    },
    created() {
        let bookId = this.$route.params.bookId;
        this.$store.dispatch({type: LOAD_BOOK, bookId})
            .then(book => this.book = book)
    }
}
</script>

<style scoped>
.details-img-wrap {
    align-items: center;
    width: 50%;
    border-right: solid 1.2px rgba(128, 128, 128, 0.568); 
    /* margin: 5px; */
}

.details-img-wrap img {
width: 80%;
height: 80%;

}

.details-container{
    width: 50%;
    margin: 5px;
    padding: 50px;
}

.img-details {
    width: 80%;
    height: 100%;
    background-image: url('https://images2.storyjumper.com/transcoder.png?trim&id=78-oqy1h9n0d9-56y1kdrcl&maxw=512&maxh=512');
    background-position: right;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
}

.fa-btn {
    border: none;
    background: transparent;
    padding: 10px;
    outline: none;
}

.fa-btn:hover{
    color: rgb(51, 126, 201)
}

</style>
