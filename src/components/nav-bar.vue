<template>
    <section class="nav-bar">
        <logo-cmp></logo-cmp>
        <div class="routes-container"> 
            <router-link to="/" class="clean-link nav-route">Home</router-link> 
            <router-link to="/about" class="clean-link nav-route">About</router-link>
            <router-link to="/contact" class="clean-link nav-route">Contact</router-link>
            <router-link to="/login" class="clean-link nav-route">Login</router-link>
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

.nav-bar, .routes-container {
  display: flex;
  justify-content: space-between;
}

.routes-container {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-route{
    width: 25%;
    font-size: 1.5rem;
    font-family: Gaegu;
}

.clean-link{
    text-decoration: none;
}


</style>
