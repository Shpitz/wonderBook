<template>
  <div id="app">
    <div id="nav">
      <nav-bar :onHome="onHomePage"></nav-bar>
    </div>
    <router-view/>
  </div>
</template>
<script>
import eventBus, {
  USER_CONNECTED,
  USER_DISCONNECTED
} from "./services/event-bus.service.js";
import navBar from "./components/nav-bar.vue";
import { LOAD_USER, LOG_OUT } from "./store/user-module.js";

export default {
  data() {
    return {
      onHomePage: true
    };
  },
  created() {
    if (this.$route.fullPath !== "/") this.onHomePage = false;
    else this.onHomePage = true;
    this.loadUser();
    eventBus.$on(USER_DISCONNECTED, user => {
      if (!user) {
        this.$store
          .dispatch({ type: LOG_OUT })
          .then(_ => console.log("logiut from app"));
      }
    });
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
      this.$store
        .dispatch({ type: LOAD_USER })
        .then(user => {
          eventBus.$emit(USER_CONNECTED, user);
        })
        .catch(err => {
          console.log("error in book app loadUser component", err);
        });
    }
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
