<template>
<div v-if="book" class="paper">
    <img class="poster" :src=backgroundImg />
    <!-- <h2>{{datePublish | date-format}}</h2> -->
    <h1>{{book.title}}</h1>
    <!-- <hr/> -->
	<p>
      <h3>{{book.author}}</h3>
	  <div>{{datePublish | date-format}}</div>
      <div><font-awesome-icon class="icon" icon="eye" /> {{book.views}}</div>
    </p>
    <!-- <a class="btn">Read </a> -->
    <!-- <div class="space"></div> -->
</div>
<!-- <div v-if="book" class="blog-card spring-fever " :style="{backgroundImage:'url(' +backgroundImg+')'}">
  <div class="title-content">
  <div class="flex align-center card-header justify-center">
    <slot class="btn-edit-slot"></slot>
    <h3>{{book.title}}</h3>
  </div>
    
    <hr />
    <div class="intro">By {{book.author}}</div>
  </div>
                  <div class="play-mask absolute flex">
                  <div class="play-ctr flex">
                    <div class="flex align-center justify-center">
                      <font-awesome-icon class="icon" icon="play" /> 
                    </div>
                  </div>
              </div>
  <div class="card-info">
      {{pageDesc}}
  </div>
  <div class="utility-info">
    <ul class="utility-list">
      <li> <font-awesome-icon class="icon" icon="eye" /> {{book.views}}</li>
      <li class="date">{{datePublish | date-format}}</li>
    </ul>
  </div>
  <div class="gradient-overlay"></div>
  <div class="color-overlay"></div>
</div> -->
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
@import url('https://fonts.googleapis.com/css?family=Open+Sans:700|Playfair+Display');
$san-serif:'Open Sans',
sans-serif;
$serif:'Playfair Display',
serif;

$color-shadow:transparentize(#303336, .9);



.paper {
  margin: 5vh 5vh;
  width: 50vh;
  height: 80vh;
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
  font-size: 1.5rem;
  color: #303336;
  letter-spacing: 1px;
  margin: 1vh 2vw;
  font-family: $serif;
//   min-height: 86px;
}

h2 {
  font-size: .4rem;
  color: #A0A6AB;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: $san-serif;
  font-weight: 700;
  margin-bottom: 10px;
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

// @import "./src/assets/scss/_vars.scss";
// $card-width:  300px;
// $card-height: 400px;
// $h-color:     #081641;
// $yellow:      #D0BB57;
// $txt-color:   #DCE3E7;
// $text-bg: rgba(255, 255, 255, 0.55);

//  $txt-pading:.5rem;
// .icon {
//   color:$yellow;
// }


// .blog-card{
//     cursor: pointer;
//   width: $card-width;
//   height: $card-height;
//   position: relative;
//   margin: 0 20px 20px 0;
//   overflow: hidden;
//   border-radius: 10px;
//   box-shadow: 3px 3px 20px rgba(0, 0, 0, .5);
//   text-align: center;
  
//   &.spring-fever{
//     background-size: cover;
//     background-position: bottom;
//   }
  
//   .color-overlay{
//     /* Rectangle 11: */
//     background: rgba(84,104,110,0.4);
//     width: $card-width;
//     height: $card-height;
//     position: absolute;
//     z-index: 10;
//     top: 0;
//     left: 0;
//     transition: background .3s cubic-bezier(.33,.66,.66,1);
//   }
//   .gradient-overlay{
//     /* bg-gradient: */
//     background-image: linear-gradient(rgba(0,0,0,0.00) 0%, rgba(0,0,0,.6) 21%);
//     width: $card-width;
//     height: $card-height;
//     position: absolute;
//     top: 350px;
//     left: 0;
//     z-index: 15;
//   }
  
//   &:hover{
    
//     .card-info{
//       opacity: 1;
//       bottom: 70px;
//     }
//     .color-overlay{
//       background: rgba(84,104,110,0.8);
//     }
//   }
// }

// .title-content{
//   text-align: center;
//   // margin: 50px 0 0 0;
//   position: absolute;
//   z-index: 20;
//   width: 100%;
//   top: 0;
//   left: 0;
 
// }
// h3{
//   font-size: 20px;
//   font-weight: 500;
//   color: $h-color;
//   font-family: 'Merriweather', sans-serif;
//   margin: 0 auto;
// }
// .card-header {
//   background-color: $text-bg;
//     padding: $txt-pading;


// }
// hr{
//   width: 50px;
//   height: 3px;
//   margin: 20px auto;
//   border: 0;
//   background: $yellow;
// }
// .intro{
//   width: 170px;
//   margin: 0 auto;
//   color: $txt-color;
//   font-family: 'Droid Serif', serif;
//   font-size: 13px;
//   font-style: italic;
//   line-height: 18px;
// }
// .card-info{
//   width: 100%;
//   position: absolute;
//   bottom: 100px;
//   left: 0;
//   margin: 0 auto;
//   padding: 0 50px;
//   color: $txt-color;
//   font-family: 'Droid Serif', serif;
//   font-style: 16px;
//   line-height: 24px;
//   z-index: 20;
//   opacity: 0;
//   transition: bottom .3s, opacity .3s cubic-bezier(.33,.66,.66,1);
// }

// .utility-info{
//   position: absolute;
//   width: 100%;
//   bottom: 0px;
//   left: 0;
//   z-index: 20;
// }
// .utility-list{
//   list-style-type: none;
//   // margin: 0 0 30px;
//   background-color: $text-bg;
//   padding:$txt-pading;
//   width: 100%;
  
//   li{
//     margin: 0 15px 0 0;
//     padding: 0 0 0 22px;
//     display: inline-block;
//     color: $h-color;
//     font-family: 'Merriweather', sans-serif;
    
//     &.date{
//       background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/icon-calendar.svg) no-repeat 0 .1em;
//     }
//   }
// }

//   .play-mask {
//     height: 100%;
//     width: 100%;
//     background-color: #00000040;
//     align-items: center;
//     justify-content: center;
//   }
//   .play-ctr {
//     // background-color: $container-bg;
//     background-color: $container-bg;
//     width: 80px;
//     height: 80px;
//     border-radius: 100%;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.3s;
//     div {
//       width: 80%;
//       height: 80%;
//       border-radius: inherit;
//       border: 1px solid;
//     }
//   }


//   @media (max-width: 550px){
//     $card-width-max:350px;
//    .blog-card {
//      margin: 0 0 20px ;
//      width: $card-width-max;
//      .color-overlay { 
//       width: $card-width-max;
//    }
//     .gradient-overlay {
//        width: $card-width-max;

//     }
//    }
   
//   }

//   @media (max-width: 360px){
//     $card-width-max:250px;
//    .blog-card {
//      margin: 0 0 20px ;
//      width: $card-width-max;
//      .color-overlay { 
//       width: $card-width-max;
//    }
//     .gradient-overlay {
//        width: $card-width-max;

//     }
//    }
   
//   }

  

</style>
