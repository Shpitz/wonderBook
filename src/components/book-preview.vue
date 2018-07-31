<template>
<div class="blog-card spring-fever " :style="{backgroundImage:'url(' +backgroundImg+')'}">
  <div class="title-content">
    <slot class="btn-edit-slot"></slot>
    <h3>{{book.title}}</h3>
    <hr />
    <div class="intro">By {{book.author}}</div>
  </div><!-- /.title-content -->
  <div class="card-info">
      {{pageDesc}}
  </div><!-- /.card-info -->
  <div class="utility-info">
    <ul class="utility-list">
      <li> <font-awesome-icon class="icon" icon="eye" /> {{book.views}}</li>
      <li class="date">{{datePublish | date-format}}</li>
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
$card-width:  300px;
$card-height: 400px;
$h-color:     #081641;
$yellow:      #D0BB57;
$txt-color:   #DCE3E7;
$text-bg: rgba(255, 255, 255, 0.55);

 $txt-pading:.5rem;
.icon {
  color:$yellow;
}
.btn-edit-slot {
  float: right;
}

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
  // margin: 50px 0 0 0;
  position: absolute;
  z-index: 20;
  width: 100%;
  top: 0;
  left: 0;
}
h3{
  font-size: 20px;
  font-weight: 500;
  color: $h-color;
  background-color: $text-bg;
  font-family: 'Merriweather', sans-serif;
  margin: 0;
  padding: $txt-pading;
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
  width: 100%;
  bottom: 0px;
  left: 0;
  z-index: 20;
}
.utility-list{
  list-style-type: none;
  // margin: 0 0 30px;
  background-color: $text-bg;
  padding:$txt-pading;
  width: 100%;
  
  li{
    margin: 0 15px 0 0;
    padding: 0 0 0 22px;
    display: inline-block;
    color: $h-color;
    font-family: 'Merriweather', sans-serif;
    
    &.date{
      background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/icon-calendar.svg) no-repeat 0 .1em;
    }
  }
}

</style>
