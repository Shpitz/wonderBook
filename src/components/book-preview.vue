<template>
<div v-if="book" class="paper flex column">
    <img class="poster" :src=backgroundImg />
    <div class="txt-container flex column">
      <div>
      <h1>{{book.title}}</h1>
    <!-- <hr/> -->
      <h3>{{book.author}}</h3>
      </div>
      <ul class="flex justify-center">
         <li><font-awesome-icon class="icon star" icon="star" /> {{book.rating}}</li>
        <li><font-awesome-icon class="icon" icon="eye" /> {{book.views}}</li> 
        </ul>
   </div>

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
  margin: 2rem;
   width: 40vh;
  height: 56vh;
  border-radius: 4px;
   border: 1px solid rgba(0, 0, 0, 0.1);
  transition: .6s ease;
  background: white;
  text-align: center;
  cursor:pointer;
  ul li:first-child{
    margin: 0 1rem 0 0;
  }
  ul li {
    display: flex;
    align-items: center;
  }
}

.paper:hover {
  box-shadow: 0 2px 10px rgba(50, 50, 90, 0.1), 0 2px 3px rgba(0, 0, 0, 0.07);
  transform: translateY(-5px);
}

img {
  width: 100%;
  height: 60%;
}

.poster {
  border-radius: 4px 4px 0 0;
}

h1 {
  font-size: 1.3rem;
  color: #303336;
  letter-spacing: 1px;
  margin:0 0 1rem;
  font-family: $serif;
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

.txt-container {

    height: 40%;
    justify-content: space-around;
    padding: 0 .5rem;
}
.icon {
  margin: 0 .5rem 0 0;
}
.star {
  color:gold;
}

</style>
