<template>
    <section class="logo">
         <!-- <div class="img"></div> -->
        <h1>
            WONDER <span>B</span>OOK
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
    align-items: center;
    padding: .5rem;
   
    h1 {
        margin:0;
            }
            span {
                color:$main-color-hover;
            }
    }
 .img {
    height: 50px;
    width: 100px;
   background-repeat: no-repeat;
    background-size: contain;
    background-image: url("../../public/img/background/logo.png");
    }
    
    @media(max-width:570px){
        .img {
            height: 30px;
            width: 60px;
        }
         h1 {
             font-size: 1.5rem;
         }
    }
      @media(max-width:350px){
        
         h1 {
             display: none;
         }
    }
</style>
