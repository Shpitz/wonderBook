<template>
    <section class="about-main-container flex column">
            <div class="background-img-container">
                <div class="about-cover"></div>
            </div>
            <div class="about-details flex column">
                <div class="page-container what flex column">
                    <div class="about-what-is">
                        <h1>What is Wonder-Book?</h1>
                        <p>
                            Hello and welcome to Wonder-Books, the place to find the best audio books on-line 
                            for children in all ages. If you’re looking for something new, you’re in the right place. 
                            We strive to be industrious and innovative, offering our customers a magical colorfull jurney.
                        </p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia totam enim quaerat? Placeat laboriosam laborum at neque accusamus, nihil, cupiditate repudiandae reprehenderit explicabo laudantium similique eos quia ipsam nemo mollitia.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia totam enim quaerat? Placeat laboriosam laborum at neque accusamus, nihil, cupiditate repudiandae reprehenderit explicabo laudantium similique eos quia ipsam nemo mollitia.</p>
                    </div>
                </div>
                <div class="page-container team flex column">
                        <div class="about-our-team">
                <h1>Our Team</h1>
                <div class="team-member-left">
                    <div class="member-title flex">
                        <h1>Gal Sinay | <span>Full stack developer</span> </h1>
                    </div>
                    <div class="member-details">
                            <img src="../../public/img/2.jpg" alt="">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                    </div>
                </div>
                <div class="team-member-right">
                    <div class="member-title flex">
                        <h1>Omer Sela | <span>Full stack developer</span> </h1>
                    </div>
                    <div class="member-details">
                            <img src="../../public/img/3.jpg" alt="">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                    </div>
                </div>
                <div class="team-member-left">
                    <div class="member-title flex">
                        <h1>Itzik Turjeman | <span>Full stack developer</span> </h1>
                    </div>
                    <div class="member-details">
                            <img src="../../public/img/2.jpg" alt="">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consectetur velit esse laudantium architecto? Quasi doloremque praesentium, aspernatur veritatis at, nam saepe minus magnam iure exercitationem molestiae, alias cupiditate perspiciatis?</p>
                    </div>
                </div>
            </div>
                </div>

            <div class="page-container contact flex column">
                <div class="contact-us" ref="contact-us" id="contact-us">
                    <contactUs></contactUs>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import logoCmp from "../components/logo-cmp.vue";
import contactUs from "./Contact.vue";
export default {
  components: {
    logoCmp,
    contactUs
  },

  data() {
    return {
    };
  },
  mounted() {
    if (this.$route.name === "contact") {
      this.goto("contact-us");
    }
  },
  methods: {
    goto(refName) {
      console.log(this.$refs);
      var element = this.$refs[refName];
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
};
</script>

<style scoped>
.page-container {
  width: 100%;
  align-items: center;
}

.about-cover {
  /* The image used */
  background-image: url("../../public/img/about-img.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.background-img-container {
  height: 400px;
}

.about-details {
  align-items: center;
}

.page-container.what {
  /* background-color: #f1e88ad9; */
  background-color: #efa6a0a1;
}
.page-container.team {
  /* background-color: #a5e5f6; */
  background-color: whitesmoke;
}
.page-container.contact {
  background-color: #559ec7;
}

.about-what-is,
.about-our-team,
.contact-us {
  padding: 15px;
  width: 75%;
  text-align: left;
  text-align: justify;
  text-justify: inter-word;
}

.about-our-team > h1,
.about-what-is > h1 {
  font-size: 2rem;
}

.team-member-left img {
  border-radius: 50%;
  float: left;
  margin-right: 2em;
  margin-bottom: 0.5em;
  shape-outside: circle();
}
.team-member-right img {
  border-radius: 50%;
  float: right;
  margin-left: 2em;
  margin-bottom: 0.5em;
  shape-outside: circle();
}

.member-title span {
  font-size: 0.65em;
}

.member-details img {
  max-width: 40%;
}

</style>
