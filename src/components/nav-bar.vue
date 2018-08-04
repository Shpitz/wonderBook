<template>
    <section class="nav-bar">
        <div class="nav-bar-container" :class="{navHome:onHome}">
            <logo-cmp  class="animated tada"></logo-cmp>
             <div :class="{show: menuOpen}" class="routes-container animated fadeIn"> 
                <router-link to="/" class="clean-link nav-route">Home</router-link> 
                <router-link to="/about" class="clean-link nav-route">About</router-link>
                <router-link to="/about/contact" class="clean-link nav-route" @click.native="gotoContact">Contact</router-link>
                <router-link to="/login" class="clean-link nav-route">Login</router-link>
            </div>
           
         <div class="nav-menu hidden" @click="menuOpen = !menuOpen"
          :class="{clickMenu: menuOpen}" >
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    </section>
</template>

<script>
import logoCmp from "./logo-cmp.vue";
export default {
  props:['onHome'],
  data(){
      return {
          menuOpen:false
      }
  },
  methods: {
    gotoContact() {
      if (this.$route.name === "about" || this.$route.name === "contact") {
        var elContact = document.getElementById("contact-us");
        if (elContact)
          elContact.scrollIntoView({
            behavior: "smooth"
          });
      }
    }
  },
    components: {
    logoCmp
  },
  
};
</script>

<style scoped lang="scss">
    @import "./src/assets/scss/_vars.scss";

    .navHome {
      position: absolute;
      width: 100%;
      a {
        background-color: transparent;

      }
    }

    .nav-bar {
      box-shadow: 0 0 5px black;
      margin: 0 0 0.4rem;


    }


    .nav-bar-container {
      padding: .5rem;
      display: flex;
      justify-content: space-between;

    }

    a {
      font-weight: bold;
      color: $main-color;
      background-color: #a3a3a35c;
      &.router-link-exact-active {
        color: $main-color-hover;
      }
    }

    .routes-container {
      display: flex;
      justify-content: space-around;
      align-items: center;

    }

    .nav-route {
      font-size: 1.5rem;
      font-family: Gaegu;
      padding: 5px;
      margin: 3px;
      transition: all 0.2s;
    }

    .nav-route:hover {
      color: $main-color-hover;
    }

    .clean-link {
      text-decoration: none;
    }

    /* nav-menu */

    .nav-menu {
      width: 35px;
      height: 21px;
      margin: 10px 10px;
      transition: margin 0.8s;
      position: relative;
      cursor: pointer;
    }

    .nav-menu span {
      background-color: #dedede;
      position: absolute;
      border-radius: 2px;
      transition: .3s cubic-bezier(.8, .5, .2, 1.4);
      width: 100%;
      height: 4px;
      transition-duration: 500ms
    }

    .nav-menu span:nth-child(1) {
      top: 0px;
      left: 0px;
    }

    .nav-menu span:nth-child(2) {
      top: 8px;
      left: 0px;
    }

    .nav-menu span:nth-child(3) {
      bottom: 0px;
      left: 0px;
    }

    .clickMenu {
      margin: 10px 120px 10px 10px;
    }

    .nav-menu:not(.clickMenu):hover span:nth-child(1) {
      transform: rotate(-3deg) scaleY(1.1);
    }

    .nav-menu:not(.clickMenu):hover span:nth-child(2) {
      transform: rotate(3deg) scaleY(1.1);
    }

    .nav-menu:not(.clickMenu):hover span:nth-child(3) {
      transform: rotate(-4deg) scaleY(1.1);
    }

    .clickMenu span:nth-child(1) {
      transform: rotate(45deg);
      top: 13px;

    }

    .clickMenu span:nth-child(2) {
      transform: scale(.1);

    }

    .clickMenu span:nth-child(3) {
      transform: rotate(-45deg);
      top: 13px;
    }



    @media (max-width: 768px) {
      .routes-container {
        position: fixed;
        transform: translate(105%);
        transition: all 0.9s;
        z-index: 2;
        flex-direction: column;
        box-shadow: 0 0 2px black;
        background-color: white;
        align-items: normal;
        right: 0;
        top: 93px;
      }
      .routes-container .clean-link {
        height: 80px;
        line-height: 80px;
        width: 100px;
      }
      .routes-container.show {
        transform: translate(0);
        height: 100%;
        top: 0;
        background-color: #e5e5e5;
        justify-content: flex-start;

      }
      .nav-menu {
        display: block;
      }
    }

    @media (max-width: 570px) {
      .routes-container {
        top: 64px;
      }

    }
  </style>