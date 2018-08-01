<template>
    <section class="contact get-in-touch flex justify-content-center">
        <div class="get-in-touch-container flex justify-content-center">
            <div class="get-in-touch-form flex flex-dir-col">
                <h1>Get in touch</h1>
                <h4>In order to get in touch use the contact form below:</h4>
                <div class="sub-contact">
                    <div class="form flex flex-dir-col">
                        <input type="text" v-model="name" placeholder="Name (Required)" class="get-in-touch-input">
                        <input type="text" v-model="mail" placeholder="Email (Required)" class="get-in-touch-input mail-massage-submition">
                        <input type="text" v-model="subject" placeholder="Subject" class="get-in-touch-input subject-massage-submition">
                        <input type="text" v-model="message" placeholder="Write your message here..." class="write-your-message body-massage-submition">
                        <div class="send-btn-container">
                            <button class="send-btn" @click="OnMessageSubmitted()">SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      name : '',
      mail : '',
      subject : '',
      message : ''
    }
  },
  methods:{
    OnMessageSubmitted(){
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=hexalcrop@gmail.com&su=${this.subject}&body=${this.message}`);
    }
  }
}
</script>


<style scoped>
 
.get-in-touch{
    display: flex;
    justify-content: center;
    padding: 10px 0;
    color: white;
    /* background-color: #887de6; */
    font-family: Maven Pro, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.get-in-touch h1 {
    margin:0;
    font-size: 30px;
    font-weight: 400;
    color: white;
}

.get-in-touch h4 {
    margin: 0 0 10px;
    font-size: 18px;
    font-weight: 400;
}

.get-in-touch-container{
    display: flex;
    justify-content: center;
    padding: 0 20px;
    width: 100%
}

.get-in-touch-form {
  display: flex;
  flex-direction: column;
    width: 100%;
}

.form{
  display: flex;
  flex-direction: column;
}


.sub-contact {
 display: block;
}


@media(min-width:500px) {
    .sub-contact {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(12,1fr);
        grid-template-rows: repeat(12,1fr);
    }
    .sub-contact .form {
        grid-column: 12 span;
        grid-row: 12 span;
    }
    .sub-contact .get-in-touch-detail {
        grid-row: 12 span;
        grid-column: 3 span;
    }
}


.get-in-touch-form input{
    background-color: white;
    border: none;
    margin: 0.5rem 0.5rem 0.5rem 0;
}

.get-in-touch-form .get-in-touch-input {
  padding: 0.5rem;
    height: 2rem;
}

.get-in-touch-form .write-your-message {
    height: 8rem;
}

.get-in-touch-form input::-webkit-input-placeholder {
    color: rgba(71, 69, 69, 0.87);
    padding: 1rem;
}

.send-btn {
    background-color: #1d2b46;
    color: #d7fcf5;
    border: none;
    width: 70px;
    height: 40px;
    margin: 1rem 0;
    font-family: Maven Pro, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.send-btn-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.get-in-touch-detail{
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
}

.get-in-touch-detail-p {
    margin-bottom: 2rem;
    line-height: 21.56px;
}

.get-in-touch-detail-p span {
    font-weight: 900;
    color: #e0e0e0;
}

.get-in-touch-detail-logos div {
    margin-bottom: 0.7rem;
}

.get-in-touch-detail-logos div i {
    color: #219d84;
}

/* path {
    color: white;
} */

.contact-us-container {
    width: 230px;
}

.contact-us {
    width: 40px;
    height: 40px;
    background-color: #b6b6b6;
    cursor: pointer;
}

</style>
