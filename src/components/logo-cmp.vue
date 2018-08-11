<template>
    <section class="logo" @click="$emit('onLogo')">
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
    font-size: 1.3rem;
    color:$main-color;
    display: flex;
    align-items: center;
    padding: .5rem;
    font-size: 1.7rem;
    letter-spacing: 2px;
    cursor: pointer;
   
    h1 {
        margin:0;
    text-transform: capitalize;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        }
        span {
             color:$main-color-hover;
              }
    }
.logo:hover {
    color:$main-color;
   span {
       color:$main-color;
   }
}
  
 @media(max-width:350px){
  h1 {
             font-size: .9rem;
      }
}
</style>
