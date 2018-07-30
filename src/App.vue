<template>
  <div id="app">
    <div id="nav">
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
@import './src/assets/scss/_vars.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: $main-color;
}

</style>
