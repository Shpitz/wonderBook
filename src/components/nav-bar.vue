<template>
    <section class="nav-bar">
        <div class="nav-bar-container">
            <logo-cmp  class="animated tada"></logo-cmp>
             <div class="routes-container"> 
                <router-link to="/" class="clean-link nav-route">Home</router-link> 
                <router-link to="/about" class="clean-link nav-route">About</router-link>
                <router-link to="/contact" class="clean-link nav-route">Contact</router-link>
                <router-link to="/login" class="clean-link nav-route">Login</router-link>
            </div>

            <!-- <div class="routes-container"> 
                <router-link to="/" class="clean-link nav-route">Home</router-link> 
                <router-link to="/about" class="clean-link nav-route">About</router-link>
                <router-link to="/contact" class="clean-link nav-route">Contact</router-link>
                <router-link to="/login" class="clean-link nav-route">Login</router-link>
            </div> -->
        </div>
    </section>
</template>

<script>
import logoCmp from "./logo-cmp.vue";
export default {
  components: {
    logoCmp
  }
};
</script>

<style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

$container-bg:#ececec4a;
.nav-bar {
margin:$margin-bM;
  a {
    font-weight: bold;
    color:$main-color;
    &.router-link-exact-active {
      color:$main-color-hover;
    }
  }
}


.nav-bar-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.routes-container {
    display: flex;
    justify-content: space-around;
    align-items: center;

    border-bottom: 1px solid #2828287d;
    border-top: 1px solid #2828287d;
}

.nav-route{
    font-size: 1.5rem;
    font-family: Gaegu;
    padding: 5px;
    margin: 3px;
    transition: all 0.2s
}

.nav-route:hover{
color:$main-color-hover;

}


.clean-link{
    text-decoration: none;
}


</style>
