<template>
    <section>
        <div class="footer">
            <div class="footer-icons social">
               
                    <i class="icon-facebook fb"></i>
                    <i class="icon-twitter tw"></i>
                    <i class="icon-youtube yt"></i>
                    <i class="icon-dribble dr"></i>
                    <i class="icon-skype sk"></i>
                    <i class="icon-dropbox db"></i>
                    <i class="icon-apple apple"></i>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Quam atque aliquid dolorem minus quaerat facere, explicabo accusantium maiores aliquam quasi, rerum eligendi 
                voluptas similique. Quidem voluptas fugit unde expedita quasi.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Esse, illum at totam expedita ullam aperiam eaque ut numquam deserunt cumque praesentium atque, 
                fugiat sit doloribus maxime eum non nostrum? Dolores?</p>
                <div class="hr"/>
                <div class="footer-creator">
                   ©2018
                </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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

.social {
  padding: 1rem;
  font-size: 1.5em;
//   height: 50px;
  overflow: hidden;
}

i {
  position: relative;
  margin: 0 10px;
  @include iconTransition;

  &:hover {
    top: -5px;
  }
}
.footer-creator {
    padding: .5rem;
}


</style>
