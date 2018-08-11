<template>
    <section class="nav-bar">
        <div class="nav-bar-container" :class="{navHome:onHome}">
            <logo-cmp  class="animated tada" @onLogo="routeToHome"></logo-cmp>
             <div @click="closeMenu" :class="{show: menuOpen}" 
             class="routes-container animated fadeIn" > 
               <router-link to="/" class="clean-link nav-route">Home</router-link> 
                <router-link to="/bookCreate" class="clean-link nav-route">Create-Book</router-link>  
                <router-link to="/about" class="clean-link nav-route" >About</router-link>
                <router-link v-if="!loggedUser" to="/login" class="clean-link nav-route" >Login</router-link>
                 <div class="relative user-container" 
                 v-else @click.stop="toggleUserMenu">
                    <a  class="clean-link nav-route" >
                       {{loggedUser.name}}
                      <font-awesome-icon class="icon" icon="user-circle" /> 
                    </a>
                  <div v-show="userMenuOpen" class="flex column user-menu">
                 <a @click="logout" class="clean-link nav-route" >Log Out</a>
                 <router-link to="/about" class="clean-link nav-route" >My book</router-link>
                </div>
              </div>
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
import { GET_USER } from "../store/user-module.js";
import eventBus, {
  USER_CONNECTED,
  USER_DISCONNECTED
} from "../services/event-bus.service.js";
import logoCmp from "./logo-cmp.vue";
export default {
  props: ["onHome"],
  data() {
    return {
      loggedUser: null,
      menuOpen: false,
      userMenuOpen:false
    };
  },
  created() {
    eventBus.$on(USER_CONNECTED, user => {
      console.log('user from login',user)
      this.loggedUser = user;
    });
  },

  methods: {
    gotoContact() {
      this.menuOpen = false;
      if (this.$route.name === "about" || this.$route.name === "contact") {
        var elContact = document.getElementById("contact-us");
        if (elContact)
          elContact.scrollIntoView({
            behavior: "smooth"
          });
      }
    },
    closeMenu() {
      this.menuOpen = false;
    },
    routeToHome() {
      this.$router.push("/");
    },
    logout() {
      this.loggedUser = null;
      eventBus.$emit(USER_DISCONNECTED, this.loggedUser);
    },
    toggleUserMenu(){
      this.userMenuOpen = !this.userMenuOpen
    }
  },
  components: {
    logoCmp
  }
};
</script>

<style scoped lang="scss">
@import "./src/assets/scss/_vars.scss";

.navHome {
  position: absolute;
  width: 100%;
  a {
    cursor: pointer;
    background-color: transparent;
  }
}

.nav-bar {
  box-shadow: 0 0 5px black;
  margin: 0 0 0.4rem;
}

.nav-bar-container {
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
}

a {
  font-weight: bold;
  color: $main-color;
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
  font-size: 1.4rem;
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
  transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
  width: 100%;
  height: 4px;
  transition-duration: 500ms;
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
  margin: 10px 135px 10px 10px;
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
  transform: scale(0.1);
}

.clickMenu span:nth-child(3) {
  transform: rotate(-45deg);
  top: 13px;
}
.user-menu {
    position: absolute;
    right: 10px;
    background-color: whitesmoke;
    width: max-content;
}
.user-container {
  cursor: pointer;
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
    top: 0;
    height: 100%;
    justify-content: flex-start;
  }
   .clean-link {
    height: 80px;
    line-height: 80px;
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
  .navHome a {
    background-color: #a3a3a35c;
  }
  .user-menu {
     top: 90px;
    width: 100%;
    right: 0;
    background-color:transparent;
  }
  .user-container {
    display:flex;
  }
  .user-container>a{
    width: 100%;
  }
}

</style>