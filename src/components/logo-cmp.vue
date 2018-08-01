<template>
    <section class="logo">
         <div class="img"></div>
        <h1>
            Wonder-Book
        </h1>
    </section>
</template>

<script>

export default {};
</script>

<style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

    .logo {
    font-family: $logo-font;
    font-size: 2.5rem;
    color:$main-color;
    display: flex;
    padding: .5rem;
    .img {
     height: 50px;
    width: 100px;
   background-repeat: no-repeat;
    background-size: contain;
    background-image: url("../../public/img/background/logo.png");
    }
    h1 {
        margin:0;
            }
    }
</style>
