<template>
          <section>
      
<div  v-if="!user">
<div class="container">
    <div class="info"></div>
</div>
<div class="form">
    <div class="thumbnail">
      <img src="../../public/img/icons/profile.png" /></div>
    <form autocomplete="off" ref="signUp" 
    class="register-form" :class="{hidden:!isSignUp}" @submit.prevent="signup">
        <h1>Sign Up</h1>
      <input type="text" placeholder="Name" required v-model="signupDetails.name" />
      <input type="password" placeholder="password" required v-model="signupDetails.password"/>
      <input type="text" placeholder="email address" required />
      <button type="submit">create account</button>
        <p class="message">Already registered? <a @click="toggleSign">Sign In</a></p>
    </form>
    <!-- login -->
    <form autocomplete="off" ref="login"
     class="login-form" :class="{hidden:isSignUp}" @submit.prevent="login">
      <h1>Login</h1>
      <input type="text" required placeholder="user name" v-model="loginDetails.name" />
    <input type="password" required placeholder="password" v-model="loginDetails.password" />
      <button type="submit">login</button>
        <p class="message">Not registered? <a @click="toggleSign">Create an account</a></p>
    </form>
</div>
</div>
        </section>
</template>

<script>
import eventBus, { USER_CONNECTED } from "../services/event-bus.service.js";
import userService from "../services/user-service.js";
import { LOG_IN, GET_USER, SIGN_UP, LOG_OUT } from "../store/user-module.js";
export default {
  data() {
    return {
      user: null,
      loginDetails: {
        name: "",
        password: ""
      },
      signupDetails: {
        name: "",
        password: "",
        book_id: [],
        isAdmin: false
      },
      isSignUp: false
    };
  },
  computed: {
    currUser() {
      this.user = this.$store.getters[GET_USER];
      return this.user;
    }
  },
  methods: {
    signup() {
      this.$store
        .dispatch({ type: SIGN_UP, signupDetails: this.signupDetails })
        .then(() => {
          this.user = this.$store.getters[GET_USER];
          eventBus.$emit(USER_CONNECTED, this.user);
          this.$router.push('/');
        });
    },
    login() {
      this.$store
        .dispatch({ type: LOG_IN, loginDetails: this.loginDetails })
        .then(() => {
          this.user = this.$store.getters[GET_USER];
          eventBus.$emit(USER_CONNECTED, this.user);
          this.$router.push('/');
        })
        .catch(err => {
          this.loginDetails.name = '';
          this.loginDetails.password = '';
        });
    },

    toggleSign() {
      this.isSignUp = !this.isSignUp;
    }
  }
};
</script>

<style scoped lang='scss'>
@import "./src/assets/scss/_vars.scss";

$white: #ffffff;
$black: #000000;
$accent: #e86c62;
$form-width: 300px;

.form {
  position: relative;
  z-index: 1;
  background: $white;
  max-width: $form-width;
  margin: 0 auto 100px;
  padding: 30px;
  text-align: center;
  font-family: $main-font;
}

.thumbnail {
  width: 150px;
  height: 150px;
  margin: 0 auto 30px;
  border-radius: 100%;
  img {
    display: block;
    width: 100%;
  }
}
h1 {
  color: $accent;
  font-weight: 900;
  margin: 0 auto 30px;
}

input {
  outline: 0;
  background: darken($white, 5%);
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  border-radius: 3px;
  font-size: 14px;
}

button {
  outline: 0;
  background: $accent;
  width: 100%;
  border: 0;
  padding: 15px;
  border-radius: 3px;
  color: $white;
  font-size: 14px;
  transition: (all 0.3 ease);
  cursor: pointer;
}
.message {
  margin: 15px 0 0;
  color: darken($white, 30%);
  font-size: 12px;
  a {
    color: $accent;
    text-decoration: none;
  }
}

.container {
  position: relative;
  z-index: 1;
  max-width: $form-width;
  margin: 0 auto;
  &:before,
  &:after {
    content: "";
    display: block;
    clear: both;
  }

  .info {
    margin: 50px auto;
    text-align: center;
  }
}

// h1 {
//   margin: 0 0 15px;
//   padding: 0;
//   font-size: 36px;
//   font-weight: 300;
//   color: lighten($black, 10%);
// }

span {
  color: lighten($black, 30%);
  font-size: 12px;
}

a {
  color: $black;
  text-decoration: none;
}
</style>

