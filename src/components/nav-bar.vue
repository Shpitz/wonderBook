<template>
    <section class="nav-bar">
        <div class="nav-bar-container">
            <logo-cmp  class="animated tada"></logo-cmp>
             <div class="routes-container"> 
                <router-link to="/" class="clean-link nav-route">Home</router-link> 
                <router-link to="/about" class="clean-link nav-route">About</router-link>
                <router-link to="/about/contact" class="clean-link nav-route">Contact</router-link>
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
    box-shadow: 0 0 5px black;
    margin: 0 0 0.4rem;

  a {
    font-weight: bold;
    color: $main-color;
    background-color: #a3a3a35c;
    &.router-link-exact-active {
      color:white;
    }
  }
}


.nav-bar-container{
    padding: .5rem;
    display: flex;
    justify-content: space-between;
}

.routes-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.nav-route{
    font-size: 1.5rem;
    font-family: Gaegu;
    padding: 5px;
    margin: 3px;
    transition: all 0.2s
}

.nav-route:hover{
color:white;
background-color: $main-color;

}


.clean-link{
    text-decoration: none;
}


</style>
