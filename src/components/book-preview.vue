<template>
<div v-if="book" class="paper">
    <img class="poster" :src=backgroundImg />
    <!-- <h2>{{datePublish | date-format}}</h2> -->
    <h1>{{book.title}}</h1>
    <!-- <hr/> -->
      <h3>{{book.author}}</h3>
	  <!-- <div>{{datePublish | date-format}}</div> -->
      <div><font-awesome-icon class="icon" icon="eye" /> {{book.views}}</div>

</div>

</template>

<script scoped>
export default {
  name: "bookPreview",
  props: {
    book: Object
  },
  computed:{
      datePublish(){
          return Math.round( this.book.createdAt)
      },
      pageDesc(){
        var bookDesc = this.book.description
        var shortDesc = bookDesc.slice(0,bookDesc.length/2)
        return shortDesc +'...'
      },
      backgroundImg(){
        return this.book.coverImg
      }
  }
};
</script>

<style scoped lang="scss">
 @import "./src/assets/scss/_vars.scss";

$color-shadow:transparentize(#303336, .9);

.paper {
  margin: 5vh 5vh;
      width: 40vh;
    height: 69vh;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(50, 50, 90, .1), 0 5px 15px rgba(0, 0, 0, .07);
  transition: .6s ease;
  background: white;
  text-align: center;
  cursor:pointer;
}

.paper:hover {
  box-shadow: 0 18px 35px rgba(50, 50, 90, .1), 0 8px 15px rgba(0, 0, 0, .07);
  transform: translateY(-5px);
}

img {
  width: 100%;
  height: 60%;
}

.poster {
  border-radius: 4px 4px 0 0;
  margin-bottom: 2vh;
}

h1 {
  font-size: 1.3rem;
  color: #303336;
  letter-spacing: 1px;
  margin:0 0 .5rem;
  font-family: $serif;
  min-height: 56px;
}

h3{
     margin: 0 0 .5rem;
    font-size: .9rem;
}

hr {
  width: 20%;
  margin-top: 3vh;
  margin-bottom: 3vh;
  border: 0;
  border-bottom: 1px solid #E6E9EC;
}

p {
  margin: 2vh 8vw;
  text-align: center;
  padding-bottom: 1vh;
  color: #A0A6AB;
  font-family: $serif;
  font-weight: 400;
  font-size: .9rem;
  line-height: 1.25rem;
}

.btn,
a.btn {
  display: inline-block;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  line-height: 20px;
  border-radius: 4px;
  padding: 1vh 2vh;
  letter-spacing: .02rem;
background: #664EF7;
  color:white;
  font-family:$san-serif;
  font-size:.8rem;
  box-shadow:0 0px 0px $color-shadow,
0 0px 0px rgba(0, 0, 0, 0);
}

.btn,
a.btn:hover {
  background: #7C66FF;
  box-shadow:0 7px 14px $color-shadow,
0 3px 6px rgba(0, 0, 0, .08);
  transform: translateY(-1px);
}

.btn,
a.btn:active {
  box-shadow:0 4px 6px $color-shadow,
0 1px 3px rgba(0, 0, 0, .12);
  transform: translateY(1px);
}

.space{
  height:4vh;
}



  

</style>
