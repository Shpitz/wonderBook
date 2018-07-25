<template>
    <section class="nav-bar">
        <div class="nav-bar-container">
            <logo-cmp></logo-cmp>
            <div class="routes-container"> 
                <router-link to="/" class="clean-link nav-route">Home</router-link> 
                <router-link to="/about" class="clean-link nav-route">About</router-link>
                <router-link to="/contact" class="clean-link nav-route">Contact</router-link>
                <router-link to="/login" class="clean-link nav-route">Login</router-link>
            </div>
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

<style scopped>

.nav-bar {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 90%;
}

.nav-bar-container{
    display: flex;
    justify-content: space-between;

}

.routes-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-route{
    font-size: 1.5rem;
    font-family: Gaegu;
    padding: 5px;
    margin: 3px;
    background-color: #041f7361;
    transition: all 0.2s
}

.nav-route:hover{
    background-color: #041f7391;
}

.clean-link{
    text-decoration: none;
}


</style>
