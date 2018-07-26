<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/bookReading/5b59a54e38e91934842357b1">Book reading</router-link>  -->
      <nav-bar></nav-bar>
    </div>
    <router-view/>
  </div>
</template>
<script>
import navBar from './components/nav-bar.vue';
export default {
    components: {
      navBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
