  <template>
    <section>
      <div class="footer">
        <div class="footer-social-icons">
          <ul class="social-icons">
            <li><a class="social-icon"><i class="fa fa-facebook"></i></a></li>
            <li><a class="social-icon"><i class="fa fa-twitter"></i></a></li>
            <li><a class="social-icon"><i class="fa fa-rss"></i></a></li>
            <li><a class="social-icon"><i class="fa fa-youtube"></i></a></li>
            <li><a class="social-icon"><i class="fa fa-linkedin"></i></a></li>
            <li><a class="social-icon"><i class="fa fa-google-plus"></i></a></li>
          </ul>
        </div>
        <router-link to="/about/contact" class="clean-link nav-route" @click.native="gotoContact">Contact</router-link>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam atque aliquid dolorem minus quaerat facere, explicabo
          deserunt cumque praesentium atque, fugiat sit doloribus maxime eum non nostrum? Dolores?</p>
        <div class="hr" />
        <div class="footer-creator">
          ©2018
        </div>
      </div>
    </section>
  </template>

<script>
export default {
methods:{
   gotoContact() {
      if (this.$route.name === "about" || this.$route.name === "contact") {
        var elContact = document.getElementById("contact-us");
        if (elContact)
          elContact.scrollIntoView({
          });
      }
    }
}
}
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/_vars.scss";

$container-bg:#ecececb3;
.footer {
    color:#404040;
    background-color: $container-bg;
    font-family: 'Merriweather', sans-serif;
    p {
        padding: 1rem;
        margin: 0;
    }
}
.hr {
    height: 1px;
    background-color: #40404061;
}
.clean-link {
      text-decoration: none;
    }
.nav-route {
      font-size: 1.4rem;
      font-weight: bold;
      padding: 5px;
      margin: 3px;
      color: $main-color;
      transition: all 0.2s;
    }

.nav-route:hover {
      color: $main-color-hover;
    }
/* ***** SOCIAL****** */
@mixin iconTransition {
  transition: all 100ms cubic-bezier(0.42, 0, 0.58, 1); /* ease-in-out */
}

@mixin wiggler {
  animation-name: wiggle;
  animation-duration: 0.4s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.wrap {
  width: 35%;
  margin: 100px auto;
  text-align: center;
}


.footer-creator {
    padding: .5rem;
}


@media(max-width: 380px) {
    p {
            font-size: .8rem;
    }
}
</style>
