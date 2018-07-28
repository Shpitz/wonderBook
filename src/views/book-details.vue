<template>
        <section v-if="book" class="flex space-between page-container" >
        <div class="details-img-wrap flex justify-center">
            <!-- <div class="img-details"></div> -->
            <img :src="book.coverImg" alt="">
        </div>
        <div class="details-container" >
            <div class="details-title">
                <h1>{{book.title}}</h1>
            </div>
            <div class="flex space-around">
                <h6 class="italic no-margin">Wrriten by {{book.author}}</h6>
                <h6 class="italic no-margin">Illustrated by {{book.illustrator}}</h6>

            </div>
                <button class="play-book button4" @click="playBook()">Play Book</button>

            <ul class="details flex justify-center space-between align-center no-padding clean-list">
                <!-- <li>
                    <fieldset class="rating">
                        <input type="radio" id="star5" name="rating" value="5" />
                        <label class="full" for="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4 and a half" />
                        <label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" />
                        <label class="full" for="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3 and a half" />
                        <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" />
                        <label class="full" for="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2 and a half" />
                        <label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" />
                        <label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1 and a half" />
                        <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" />
                        <label class="full" for="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="half" />
                        <label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                    </fieldset>
                </li> -->
                <li>
                    <font-awesome-icon class="star" icon="star" /> {{book.rating}}</li>
                <li>
                    <font-awesome-icon class="icon" icon="eye" /> {{book.views}}</li>
                <li>
                    <font-awesome-icon class="clock" icon="clock" /> {{book.duration}}</li>
                <li> <font-awesome-icon class="clock" icon="calendar-alt" /> {{book.createdAt | date-format}}</li>
            </ul>

       <div class="details-description">
                <p>" {{book.description}} "</p>
            </div>
            <div class="flex categories space-around">
                <ul>
                    <li v-for="(category, idx) in book.categories" :key="idx" class="clean-list tag flex align-center">
                        <span>{{category}}</span>
                    </li>
                </ul>
            </div>


     

            <div class="">
                <div class="social">
                    <i class="icon-facebook fb"></i>
                    <i class="icon-twitter tw"></i>
                    <i class="icon-youtube yt"></i>
                    <i class="icon-dribble dr"></i>
                    <i class="icon-skype sk"></i>
                    <i class="icon-dropbox db"></i>
                    <i class="icon-apple apple"></i>
                </div>
            </div>
        </div>

    </section>

</template>

<script>
import { LOAD_BOOK } from "../store/book-module.js";

export default {
  name: "bookDetails",
  data() {
    return {
      book: null
    };
  },

  created() {
    let bookId = this.$route.params.bookId;
    this.$store
      .dispatch({ type: LOAD_BOOK, bookId })
      .then(book => (this.book = book));
  },
 
  methods: {
    playBook() {
      this.$router.push(`/bookReading/${this.book._id}`);
    },
    
  }
};
</script>

<style scoped lang="scss">
// section {
//     background-color: rgba(143, 169, 241, 0.788);
// }

.page-container {
  box-shadow: 0 3px 7px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
}
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

.details-container {
  width: 50%;
  margin: 5px;
  padding: 20px;
}
.details-container div{
    margin: 0 0 10px;
}

.details-title {
  font-size: 2.3em;
  font-family: Gaegu;
}

.img-details {
  width: 80%;
  height: 100%;
  background-image: url("https://images2.storyjumper.com/transcoder.png?trim&id=78-oqy1h9n0d9-56y1kdrcl&maxw=512&maxh=512");
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

.fa-btn:hover {
  color: rgb(51, 126, 201);
}

.tag {
  display: inline-block;
  padding: 0.4em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255, 255, 255, 0.863);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  background: rgba(153, 226, 151, 0.966);
}

.tag:hover {
  border-color: rgb(7, 73, 12);
}

.italic {
  font-style: italic;
}

.button4 {
  display: inline-block;
  padding: 0.4em 1.2em;
  margin: 0 0.1em .5em 0;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  color: #ffffff;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  background: rgba(153, 226, 151, 0.966);
}
.button4:hover {
  border-color: rgb(7, 73, 12);
}
// @media all and (max-width:30em){
//  a.button4{
//   display:block;
//   margin:0.2em auto;
//  }
// }

/* ***** RATING ******* */

@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

fieldset,
label {
  margin: 0;
  padding: 0;
}
body {
  margin: 20px;
}
h1 {
  font-size: 1.5em;
  margin: 10px;
}

/****** Style Star Rating Widget *****/

.rating {
  border: none;
  float: left;
}

.rating > input {
  display: none;
}
.rating > label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}

.rating > .half:before {
  content: "\f089";
  position: absolute;
}

.rating > label {
  color: #ddd;
  float: right;
}

/***** CSS Magic to Highlight Stars on Hover *****/

.rating > input:checked ~ label, /* show gold star when clicked */
.rating:not(:checked) > label:hover, /* hover current star */
.rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
} /* hover previous stars in list */

.rating > input:checked + label:hover, /* hover current star when changing rating */
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label, /* lighten current selection */
.rating > input:checked ~ label:hover ~ label {
  color: #ffed85;
}

/* ***** SOCIAL****** */
@mixin iconTransition {
  transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1); /* ease-in-out */
}

@mixin wiggler {
  animation-name: wiggle;
  animation-duration: 0.4s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.wrap {
  width: 35%;
  margin: 100px auto;
  text-align: center;
}

.social {
  font-size: 2.5em;
  height: 50px;
  overflow: hidden;
  border-bottom: 1px solid #abc;
}

i {
  position: relative;
  top: 30px;
  margin: 0 10px;
  @include iconTransition;

  &:hover {
    top: 5px;
  }
}

.fb {
  color: #3b5998;
}

.tw {
  color: #09aeec;
}

.yt {
  color: #aa2a25;
}

.dr {
  color: #ea4c89;
}

.sk {
  color: #00a5e6;
}

.db {
  color: #000;
}

.apple {
  color: #ccc;
}
</style>
