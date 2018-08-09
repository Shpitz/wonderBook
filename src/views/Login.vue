<template>
          <section>
            <!-- currUser: {{currUser}} -->
              <!-- <div v-if="!user" class="container">
                    <div class="message signup">
                        <div class="btn-wrapper">
                        <button class="button" id="signup" @click="vsignup">SignUp</button>
                        <button class="button" id="login" @click="vlogin"> Login</button>
                        </div>
                    </div>
                    <div class="form form--signup">
                      <div class="form--heading">Welcome! Sign Up</div>
                      <form autocomplete="off" @submit.prevent="signup">
                        <input type="text" placeholder="Name" v-model="signupDetails.name">
                        <input type="password" placeholder="Password"
                         v-model="signupDetails.password">
                        <button class="button" type="submit">Sign Up</button>
                      </form>
                    </div>
                    <div class="form form--login">
                      <div class="form--heading">Welcome back! </div>
                      <form autocomplete="off" @submit.prevent="login">
                        <input type="text" placeholder="Name" v-model="loginDetails.name">
                        <input type="password" placeholder="Password" 
                        v-model="loginDetails.password">
                        <button class="button" type="submit">Login</button>
                      </form>
                    </div>
                </div>
              <div v-if="user"><button @click="logout">Logout</button></div> -->
<div  v-if="!user">
<div class="container">
    <div class="info"></div>
</div>
<div class="form">
    <div class="thumbnail">
      <img src="../../public/img/icons/profile.png" /></div>
    <form autocomplete="off" ref="signUp" 
    class="register-form" :class="{hidden:!isSignUp}" @submit.prevent="signup">
      <input type="text" placeholder="Name" v-model="signupDetails.name" />
      <input type="password" placeholder="password" v-model="signupDetails.password"/>
      <input type="text" placeholder="email address" />
      <button type="submit">create account</button>
        <p class="message">Already registered? <a @click="toggleSign">Sign In</a></p>
    </form>
    <!-- login -->
    <form autocomplete="off" ref="login"
     class="login-form" :class="{hidden:isSignUp}" @submit.prevent="login">
      <input type="text" placeholder="username" v-model="loginDetails.name" />
    <input type="password" placeholder="password" v-model="loginDetails.password" />
      <button type="submit">login</button>
        <p class="message">Not registered? <a @click="toggleSign">Create an account</a></p>
    </form>
</div>
</div>
<button v-else @click="logout">Logout</button>
        </section>
</template>

<script>
import eventBus, { USER_CONNECTED } from '../services/event-bus.service.js'
import userService from '../services/user-service.js'
import {
  LOG_IN,
  GET_USER,
  SIGN_UP,
  LOG_OUT
} from "../store/user-module.js";
export default {
      data() {
        return {
            user : null,
            loginDetails: {
                name: '',
                password: ''
            },
            signupDetails: {
                name: '',
                password: '',
                book_id: [],
                isAdmin: false
            },
              isSignUp:false
        }
    },
    created(){
            eventBus.$on(USER_CONNECTED, user => {
          this.user = user;
    })
    },
  
     computed: {
      currUser(){
        this.user = this.$store.getters[GET_USER];
        return this.user;
      }
    
    },
    methods: {

        signup() {
          this.$store.dispatch({ type: SIGN_UP, signupDetails: this.signupDetails })
              .then(()=>{
                this.user = this.$store.getters[GET_USER];
                eventBus.$emit(USER_CONNECTED,
                        { user: this.user });
              })
            // userService.signup(this.signupDetails)
            //     .then(_ => {
            //         this.$router.push('/')                    
            //     })
            //     .catch(err => console.log(err));
        },
        login() {
            this.$store.dispatch({ type: LOG_IN, loginDetails: this.loginDetails })
              .then(()=>{
                this.user = this.$store.getters[GET_USER];
                eventBus.$emit(USER_CONNECTED,
                        {  user: this.user });
              })
              // .then((user)=>{
              //   console.log('user in login page:',user);
              // })
            // userService.login(this.loginDetails)
            //     .then(_ => {
            //         this.$router.push('/')
            //     })
        },
        logout(){
          this.$store.dispatch({ type: LOG_OUT })
            .then(()=>{
              
               this.loginDetails = {
                name: '',
                password: ''
            }
              eventBus.$emit(USER_CONNECTED, { user: this.user });
                           this.user = this.$store.getters[GET_USER];
            console.log('user in login logout',this.user)
            })
       
        },
        toggleSign(){
          this.isSignUp = !this.isSignUp
        }
     
    }
   
};
</script>

<style scoped lang='scss'>

$white: #FFFFFF;
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
}
 
  .thumbnail {
        width: 150px;
    height: 150px;
    margin: 0 auto 30px;
    // padding: 50px 30px
   border-radius:100%;
      img {
      display: block;
      width: 100%;
    }
    
  }
   

  input {
     outline: 0;
    background: darken($white, 5%);
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    border-radius:3px;
    font-size: 14px;
  }
  
  button {
       outline: 0;
    background: $accent;
    width: 100%;
    border: 0;
    padding: 15px;
    border-radius:3px;
    color: $white;
    font-size: 14px;
    transition:(all .3 ease);
    cursor: pointer;
}
  .message{
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
  content: '';
    display: block;
    clear: both;
  }
  
  .info {
       margin: 50px auto;
    text-align: center;

  }
 
}
  
    h1 {
        margin: 0 0 15px;
      padding: 0;
      font-size: 36px;
      font-weight: 300;
      color: lighten($black, 10%);
    }
      
    span {
        color: lighten($black, 30%);
      font-size: 12px;
    }
      
      a {
           color: $black;
        text-decoration: none;
      }
       

</style>

