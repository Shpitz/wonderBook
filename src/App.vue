<template>
  <div id="app">
    <div id="nav">
      <nav-bar :onHome="onHomePage"></nav-bar>
    </div>
    <router-view/>
  </div>
</template>
<script>
import navBar from "./components/nav-bar.vue";
export default {
  data() {
    return {
      onHomePage: true
    };
  },
  created() {
    console.log("route", this.$route);
      if (this.$route.fullPath !== "/") this.onHomePage = false;
      else this.onHomePage = true;
  },
  watch: {
    $route(to, from) {
      if (to.fullPath !== "/") this.onHomePage = false;
      else this.onHomePage = true;
    }
  },
  components: {
    navBar
  }
};
</script>

<style lang="scss">
@import "./src/assets/scss/_vars.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: $main-color;
}
</style>
