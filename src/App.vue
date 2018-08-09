<template>
  <div id="app">
    <div id="nav">
      <nav-bar :onHome="onHomePage"></nav-bar>
    </div>
    <router-view/>
  </div>
</template>
<script>
import eventBus, { USER_CONNECTED } from './services/event-bus.service.js'
import navBar from "./components/nav-bar.vue";
import {
  LOAD_USER,
} from "./store/user-module.js";

export default {
  data() {
    return {
      onHomePage: true,
    };
  },
  created() {
      if (this.$route.fullPath !== "/") this.onHomePage = false;
      else this.onHomePage = true;
      this.loadUser();
  },
  watch: {
    $route(to, from) {
      if (to.fullPath !== "/") this.onHomePage = false;
      else this.onHomePage = true;
    }
  },
  components: {
    navBar
  },
  methods: {
    loadUser() {
      this.$store.dispatch({ type: LOAD_USER })
        .then((user)=>{
          console.log('user in app vue front',user)
          eventBus.$emit(USER_CONNECTED,
          {  user: user });
        })
        .catch(err => {
          console.log("error in book app loadUser component", err);
        });
    },
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
