<template>
   <section class="last-page animated fadeIn">
    <slot></slot>
    <div class="flex column justify-center">
      <div>
        <h1>{{book.title}}</h1>
        <h3>{{book.author}}</h3>
        <h2>
          <font-awesome-icon class="icon" icon="calendar-alt" />{{book.createdAt | date-format}}</h2>
        <div class="control-btn flex justify-center">
          <button class="clean-btn">
            <font-awesome-icon class="clock" icon="shopping-cart" /> Buy
          </button>
          <button class="clean-btn">
            <i class="fa fa-facebook"></i>
            Share
          </button>
          <button class="clean-btn">
            <font-awesome-icon class="clock" icon="comment" /> Comment
          </button>
        </div>
      </div>

    </div>
<!-- <a href="https://www.facebook.com/sharer/sharer.php?u=bookReading/5b6303aa5751a43fcdd9bc8a" target="_blank">
  Share on Facebook
</a> -->
    </section>
</template>

<script>
export default {
  props: {
    book: Object
  },
   created() {
      console.log(this.book)
  },
};
</script>

<style scoped lang="scss">
.last-page {
    position: absolute;
    z-index: 3;
    height: calc(100vh - 110px);
    width: 98vw;
    background-color: #000000cc;
     color:white;
    justify-content: center;

}
.last-page>div {
    height: 100%;
}
.control-btn {
 button {
 display: flex;
 flex-direction: column;
 align-items: center;
  justify-content: center;
  font-size: 2rem;
   color:white;
   padding: 1rem;
   }
   .fa-facebook  {
       padding: 0;
   }
    .fa-facebook:hover  {
       background-color: transparent;
   }
}
.icon {
    margin: 0 .5rem 0 0;
}

@media (max-width:500px) {
  .control-btn {
    button {
      font-size: 1.5rem;

    }
  }
}
</style>
