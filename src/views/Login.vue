<template>
          <section>
            <div class="login">
                <form @submit.prevent="login">
                    <input type="text" v-model="loginDetails.name" placeholder="name"/>
                    <input type="password" v-model="loginDetails.password" placeholder="password">
                    <button type="submit">Login</button>
                </form>
            </div>
            <div class="signup">
                <form @submit.prevent="signup">
                    <input type="text" placeholder="name" v-model="signupDetails.name" />
                    <input type="password" placeholder="password" v-model="signupDetails.password" />
                    <button type="submit">Signup</button>
                </form>
            </div>
        </section>
</template>

<script>
import userService from '../services/user-service.js'
export default {
      data() {
        return {
            loginDetails: {
                name: '',
                password: ''
            },
            signupDetails: {
                name: '',
                password: '',
                book_id: [],
                isAdmin: false
            }
        }
    },
    methods: {
        signup() {
            userService.signup(this.signupDetails)
                .then(_ => {
                    this.$router.push('/')                    
                })
                .catch(err => console.log(err));
        },
        login() {
            userService.login(this.loginDetails)
                .then(_ => {
                    this.$router.push('/')
                })
        }
    }
};
</script>

<style>
</style>

