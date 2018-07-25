<template>
<div class="blog-card spring-fever">
  <div class="title-content">
    <h3>{{book.title}}</h3>
    <hr />
    <div class="intro">By {{book.author}}</div>
  </div><!-- /.title-content -->
  <div class="card-info">
      {{book.description}}
  </div><!-- /.card-info -->
  <div class="utility-info">
    <ul class="utility-list">
      <li class="comments">12</li>
      <li class="date">{{datePublish | date-format}}</li>
      <li><slot></slot></li>
    </ul>
  </div><!-- /.utility-info -->
  <!-- overlays -->
  <div class="gradient-overlay"></div>
  <div class="color-overlay"></div>
</div><!-- /.blog-card -->
</template>

<script>
export default {
  name: "bookPreview",
  props: {
    book: Object
  },
  computed:{
      datePublish(){
          return Math.round( this.book.createdAt)
      }
  }
};
</script>

<style scoped lang="scss">
$card-width:  300px;
$card-height: 400px;
$h-color:     #021d73;
$yellow:      #D0BB57;
$txt-color:   #DCE3E7;

.blog-card{
    cursor: pointer;
  width: $card-width;
  height: $card-height;
  position: relative;
  margin: 0 20px 20px 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .5);
  text-align: center;
  
  &.spring-fever{
    background: url('../../public/img/books/page9.jpg') no-repeat;
    background-size: cover;
    background-position: bottom;
  }
  
  .color-overlay{
    /* Rectangle 11: */
    background: rgba(84,104,110,0.4);
    width: $card-width;
    height: $card-height;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    transition: background .3s cubic-bezier(.33,.66,.66,1);
  }
  .gradient-overlay{
    /* bg-gradient: */
    background-image: -webkit-linear-gradient(rgba(0,0,0,0.00) 0%, rgba(0,0,0,.6) 21%);
    background-image: -moz-linear-gradient(rgba(0,0,0,0.00) 0%, rgba(0,0,0,.6) 21%);
    background-image: -o-linear-gradient(rgba(0,0,0,0.00) 0%, rgba(0,0,0,.6) 21%);
    background-image: linear-gradient(rgba(0,0,0,0.00) 0%, rgba(0,0,0,.6) 21%);
    width: $card-width;
    height: $card-height;
    position: absolute;
    top: 350px;
    left: 0;
    z-index: 15;
  }
  
  &:hover{
    
    .card-info{
      opacity: 1;
      bottom: 70px;
    }
    .color-overlay{
      background: rgba(84,104,110,0.8);
    }
  }
}

.title-content{
  text-align: center;
  margin: 70px 0 0 0;
  position: absolute;
  z-index: 20;
  width: 100%;
  top: 0;
  left: 0;
}
h3{
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  color: $h-color;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 0;
}
hr{
  width: 50px;
  height: 3px;
  margin: 20px auto;
  border: 0;
  background: $yellow;
}
.intro{
  width: 170px;
  margin: 0 auto;
  color: $txt-color;
  font-family: 'Droid Serif', serif;
  font-size: 13px;
  font-style: italic;
  line-height: 18px;
}
.card-info{
  width: 100%;
  position: absolute;
  bottom: 100px;
  left: 0;
  margin: 0 auto;
  padding: 0 50px;
  color: $txt-color;
  font-family: 'Droid Serif', serif;
  font-style: 16px;
  line-height: 24px;
  z-index: 20;
  opacity: 0;
  transition: bottom .3s, opacity .3s cubic-bezier(.33,.66,.66,1);
}

.utility-info{
  position: absolute;
  bottom: 0px;
  left: 0;
  z-index: 20;
}
.utility-list{
  list-style-type: none;
  margin: 0 0 30px 20px;
  padding: 0;
  width: 100%;
  
  li{
    margin: 0 15px 0 0;
    padding: 0 0 0 22px;
    display: inline-block;
    color: $txt-color;
    font-family: 'Roboto', sans-serif;
    
    &.comments{
      background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/icon-chat.svg) no-repeat 0 .1em;
    }
    &.date{
      background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/icon-calendar.svg) no-repeat 0 .1em;
    }
  }
}










.cards {
    width: 100%;
    display: flex;
    justify-content: center;
    max-width: 820px;
    min-width: 250px;
}

.card--1 .card__img, .card--1 .card__img--hover {
    background-image: url('../../public/img/books/page9.jpg')
}


.card__like {
    width: 18px;
}

.card__clock {
    width: 15px;
  vertical-align: middle;
    fill: #AD7D52;
}
.card__time {
    font-size: 12px;
    color: #AD7D52;
    vertical-align: middle;
    margin-left: 5px;
}

.card__clock-info {
    float: right;
}

.card__img {
  visibility: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 235px;
  border-top-left-radius: 12px;
border-top-right-radius: 12px;
  
}

.card__info-hover {
    // position: absolute;
    padding: 16px;
  width: 100%;
  opacity: 0;
  top: 0;
  
}

.card__img--hover {
  transition: 0.3s all ease-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
//   position: absolute;
    height: 235px;
  border-top-left-radius: 12px;
border-top-right-radius: 12px;
top: 0;
  
}
.card {
    margin: 0 25px 25px 0;
  transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0,0.1);
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0,0.1);
}

.card__info {
z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
   padding: 16px 24px 24px 24px;
}

.card__category {
    font-family: 'Raleway', sans-serif;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 2px;
    font-weight: 500;
  color: #868686;
}

.card__title {
    margin-top: 5px;
    margin-bottom: 10px;
    font-family: 'Roboto Slab', serif;
}

.card__by {
    font-size: 12px;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
}

.card__author {
    font-weight: 600;
    text-decoration: none;
    color: #AD7D52;
}

.card:hover .card__img--hover {
    height: 100%;
    opacity: 0.3;
}

.card:hover .card__info {
    background-color: transparent;
    position: relative;
}

.card:hover .card__info-hover {
    opacity: 1;
}


</style>
