<template>
         <section class="cards">
        <article class="card card--1">
            <div class="card__info-hover">
                <div class="card__clock-info">
                    <span class="card__time">15 min</span>
                </div>
            </div>
            <div class="card__img"></div>
            <a href="#" class="card_link">
                <div class="card__img--hover"></div>
            </a>
            <div class="card__info">
                <span class="card__category"> {{book.title}}</span>
                <h3 class="card__title">Crisp Spanish tortilla Matzo brei</h3>
                <span class="card__by">by
                    <a href="#" class="card__author" title="author">{{book.author}}</a>
                </span>
                 <slot></slot>
            </div>
        </article>


    </section>
</template>

<script>
export default {
  name: "bookPreview",
  props: {
    book: Object
  }
};
</script>

<style scoped>
.cards {
    width: 100%;
    display: flex;
    justify-content: center;
    max-width: 820px;
    min-width: 250px;
}

.card--1 .card__img, .card--1 .card__img--hover {
    background-image: url('../../public/img/books/page9.jpg')
    /* background-image: url('https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'); */
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
    position: absolute;
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
  position: absolute;
    height: 235px;
  border-top-left-radius: 12px;
border-top-right-radius: 12px;
top: 0;
  
}
.card {
    margin: 0 25px 25px 0;
  transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
    /* width: 33.3%; */
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0,0.1);
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0,0.1);
    /* transform: scale(1.01, 1.01); */
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
