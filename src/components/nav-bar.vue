<template>
    <section class="nav-bar">
        <div class="nav-bar-container">
            <logo-cmp  class="animated tada"></logo-cmp>

             <div :class="{show: menuOpen}" class="routes-container animated fadeIn"> 
                <router-link to="/" class="clean-link nav-route">Home</router-link> 
                <router-link to="/about" class="clean-link nav-route">About</router-link>
                <router-link to="/about/contact" class="clean-link nav-route" @click.native="gotoContact">Contact</router-link>
                <router-link to="/login" class="clean-link nav-route">Login</router-link>
            </div>
           
         <div class="nav-menu hidden" @click="menuOpen = !menuOpen" :class="{clickMenu: menuOpen}" >
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
  components: {
    logoCmp
  },
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
  }
};
</script>

<style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

$container-bg: #ececec4a;
.nav-bar {
    box-shadow: 0 0 5px black;
    margin: 0 0 0.4rem;

  a {
    font-weight: bold;
    color: $main-color;
    background-color: #a3a3a35c;
    &.router-link-exact-active {
      color:$main-color-hover;
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

.nav-route {
  font-size: 1.5rem;
  font-family: Gaegu;
  padding: 5px;
  margin: 3px;
  transition: all 0.2s;
}

.nav-route:hover{
color:$main-color-hover;
}

.clean-link {
  text-decoration: none;
}

/* nav-menu */
.nav-menu{
  width: 35px;
  height: 21px;
  margin: 10px 10px;
  position: relative;
  cursor: pointer;
}
.nav-menu span{
  background-color:#dedede;
  position: absolute;
  border-radius: 2px;
  transition: .3s cubic-bezier(.8, .5, .2, 1.4);
  width:100%;
  height: 4px;
  transition-duration: 500ms
}
.nav-menu span:nth-child(1){
  top:0px;
  left: 0px;
}
.nav-menu span:nth-child(2){
  top:8px;
  left: 0px;
}
.nav-menu span:nth-child(3){
  bottom:0px;
  left: 0px;
}
.nav-menu:not(.clickMenu):hover span:nth-child(1){
  transform: rotate(-3deg) scaleY(1.1);
}
.nav-menu:not(.clickMenu):hover span:nth-child(2){
  transform: rotate(3deg) scaleY(1.1);
}
.nav-menu:not(.clickMenu):hover span:nth-child(3){
  transform: rotate(-4deg) scaleY(1.1);
}
.clickMenu span:nth-child(1){
  transform: rotate(45deg);
  top: 13px;

}
.clickMenu span:nth-child(2){
  transform: scale(.1);

}
.clickMenu span:nth-child(3){
  transform: rotate(-45deg);
  top: 13px;
}

@media (max-width: 768px) {
    .routes-container {
    z-index: 2;
    flex-direction: column;
    box-shadow: 0 0 2px black;
    background-color: white;
    align-items: normal;
    position: absolute;
    transform: translateX(-100vw);
    right: 3px;
    top: 95px;
    }
    .routes-container.show {
        transform: translateX(0);
    }
    .nav-menu {
        display: block;
    }
}
</style>
