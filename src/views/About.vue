<template>
<section class="about flex justify-content-center">
        <div class="about-container flex flex-dir-col space-between">
            <logo-cmp class="about-logo"></logo-cmp>
            <div class="about-text-container">
                <h1>Omer Sela & Gal Sinai & Itzik Turjeman</h1>
                <h3>Full-stack programers</h3>
                <div>Children's Wonder-Book copyright ©2018 Omer sela, Gal Sinai, Itzik Turjeman.</div>
                <div>Individual stories, illustrations, animations and sounds copyright ©2018 by the respective authors.</div>
                <div>All rights reserved.</div>
                <div>No part of these stories may be reproduced or transmitted in any form or by any process without prior written permission from the authors.</div>
                <div>Permission is granted for nonexclusive use of the Children's Storybooks Online logo at the top of this page for purposes of reference or promotion related to this site.</div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea deleniti magnam porro, quibusdam distinctio aut
                    fuga reprehenderit aspernatur. Iste, nostrum tempora corrupti quaerat sequi accusamus quo expedita sunt
                    facere neque.
                </p>
                 <!-- <font-awesome-icon icon="map-marker-alt"/> -->
                <ul class="contact-us-container clean-list flex space-around align-items-center">
                    <li class="contact-us facebook flex space-around align-items-center">
                        <i class="fa fa-facebook-f"></i>
                    </li>
                    <li class="contact-us twiter flex space-around align-items-center">
                        <i class="fa fa-twitter"></i>
                    </li>
                    <li class="contact-us behance flex space-around align-items-center">
                        <i class="fa fa-behance"></i>
                    </li>
                    <li class="contact-us dribble flex space-around align-items-center">
                        <i class="fa fa-dribbble"></i>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
import logoCmp from "../components/logo-cmp.vue";
export default {
    components: {
      logoCmp,
    },
 
    data() {
      return {
      }
    }  
}
</script>



<style scopped>
.about {
    /* background-color: #2eb398; */
    color: #3a5195;
    padding: 5px 0;
    display: flex;
    justify-content: center;
}

.about h1 {
    font-family: Maven Pro, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    color: #3a5195;
    font-size: 3rem;
    font-weight: 400;
}

.about h3 {
    font-family: Maven Pro, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0 0 10px;
    color: #1e3169;
    font-size: 2rem;
}

.about p {
    font-weight: 400;
    font-size: 14px;
    line-height: 21.56px;
}

.about-container {
    width: 80%;
    border-left: #219d84 solid 1px;
    border-right: #219d84 solid 1px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1.5rem;
}

.about-logo {
    /* background-size: contain; */
    /* background-image: url("../../public/img/aboutlogo.jpg"); */
    /* background-position: top; */
    /* background-repeat: no-repeat; */
    /* min-height: 100px; */
    /* width: 50%; */
    /* min-width: 100px; */
    /* margin: 0 20px 0 0; */
    font-size: 10rem;
}

.about-text-container {
    margin-left: 1rem;
}


</style>
