<template>
    <section v-if="book" class="first-details-container">
    <button @click="exitDetailsModal" class="btn-exit-modal editor-btn editor-regular-btn ">
      <font-awesome-icon class="icon" icon="times" />
    </button>
    <transition name="fade">
      <main id="main">
        <section id="left" :style="{ backgroundImage: 'url(' + getCoverImg + ')'}">
          <div id="head">
            <h1>Join the wonder</h1>
          </div>
          <div class="modal-upload-container flex justify-center">
            <form method="POST" ref="coverImgInput" class="upload-form flex column">
              <div class="file-upload input-file-container">
                <input type="file" accept="image/*" @change.prevent="setCoverImgFile" class="file-upload__input input-file">
                <label tabindex="0" for="my-file" class="input-file-trigger">
                  <font-awesome-icon class="icon" icon="image" />
                </label>
              </div>
            </form>
            <form action="" ref="audioInput" class="upload-form page-form">
              <div class="file-upload input-file-container">
                <input type="file" accept="audio/*" @change.prevent="setAudioFile" class="file-upload__input  input-file">
                <label tabindex="0" for="my-file" class="input-file-trigger">
                  <font-awesome-icon class="icon" icon="music" />
                </label>
              </div>
            </form>
          </div>
        </section>
        <section id="right">
          <h1>Book details</h1>
          <form action="#">
            <div id="form-card" class="form-field">
              <label>Book title:</label>
              <input v-model="book.title" placeholder="Book title" required>
            </div>
            <div id="form-card" class="form-field">
              <label>Author:</label>
              <input v-model="book.author" placeholder="Author" required>
            </div>
            <div id="form-card" class="form-field">
              <label>Illustrator:</label>
              <input v-model="book.illustrator" placeholder="Illustrators" required>
            </div>
            <div id="form-date" class="form-field">
              <label for="expiry-month">Categories:</label>
              <v-select placeHolder="Categories" multiple v-model="book.categories" :options="options"></v-select>
            </div>
            <div id="form-card" class="form-field">
              <label>Description:</label>
              <textarea class="editor-input not-resize-txt" rows='4' cols='50' v-model="book.description" placeholder="The story about Yoko ruining everything!"
              />
            </div>
            <div class="modal-btns-container flex space-around">
              <input type="submit" @click.prevent="saveDetails" value="SAVE" class="edit-btn">
              <input type="button" @click.prevent="exitDetailsModal" value="CANCEL" class="edit-btn">
            </div>
          </form>
        </section>
      </main>
    </transition>
  </section>
</template>

<script>
import cloudinaryService from "../services/cloudinary-service.js";
export default {
  name: "bookFirstDetails",
  props: ["bookFromEditor"],
  data() {
    return {
      book: null,
      options: ["Toddlers", "Early Reader", "Beginner English", "Animals", "Dogs", "Family"],
    };
  },
  created() {
      this.book = JSON.parse(JSON.stringify(this.bookFromEditor));
      console.log('book from editor: ', this.book);
      
  },
  computed: {
      getCoverImg(){
        if (this.book.coverImg){
        return this.book.coverImg;
      }
      else return './img/background/placeholder.png'
    },
  },
  methods: {
    exitDetailsModal() {
      this.$emit('cancelFirstDetails');
    },

    saveDetails() {
      this.$emit('saveDetails', this.book);
    },

    setAudioFile() {
      cloudinaryService.doUploadAudio(this.$refs.audioInput).then(url => {
        this.book.audio = url.secure_url;
      });
    },

    setCoverImgFile() {
      cloudinaryService.doUploadImg(this.$refs.coverImgInput).then(url => {
        this.book.coverImg = url.secure_url;
      });
    },
  }
};
</script>

<style lang="scss" scoped>

@import "./src/assets/scss/_vars.scss";

.first-details-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  // font-family: "Lato", sans-serif;
  color: #393e56de;
}

.btn-exit-modal {
  position: absolute;
  top: 10px;
  right: 10px;
}

h1 {
  font-family: $main-font;
  font-size: 1.17rem;
}


@import url("https://fonts.googleapis.com/css?family=Raleway:300,400,700");


$shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
$primary: #9095b1;
$secondary: #393e56;
$margin-form-label:5px;
#main {
  position: relative;
  width: 80%;
  height: 80%;

  left: 30px;

  border-radius: 10px;
  box-shadow: $shadow;

  background-color: white;
}

#left {
  position: relative;
  background-size: cover;
  background-position: center;
  height: calc(100% + 50px);
  width: 40%;
  top: -35px;
  left: -50px;
  padding: 10px 25px;
  box-shadow: $shadow;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}


#left #head {
  opacity: 0.95;
}

#right {
  padding: .5rem 0;
  position: absolute;
  width: calc(60% - 40px);
  height: 100%;
  top: 0;
  left: 40%;
  display: flex;
  flex-flow: column nowrap;
  padding-left: 20px;
}

#right form {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height:100%; 
  justify-content: space-around;
}

#right form input,
#right form select {
  appearance: none;
  border: none;
  border-bottom: 2px solid #ccc;
  // padding: 5px;
   outline: none;
  transition: all 0.2s;
  margin-top: 2.5px;
  position: relative;
}
#right form input:focus {
     border-bottom: 2px solid #808ab2;

}
#right form input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: lightgray;
} 
 
   
#right form .form-field {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin-bottom: $margin-form-label;
}
.form-field label {
    margin-bottom: $margin-form-label;

}

#right form #date-val {
  display: flex;
  justify-content: space-between;
}

#right form #date-val select {
  width: 45%;
}

.edit-btn{
  width: 30%;
}

.upload-form{
  margin: 0.5rem;
}

#right form button[type="submit"], .edit-btn {
  background: linear-gradient(135deg, $secondary 0%, $secondary 100%);
  padding: 5px;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 400;
  font-size: 12pt;
  margin-top: 10px;
  height: 40px;
  cursor: pointer;
}
#right form button[type="submit"]:hover ,.edit-btn:hover {
  background: linear-gradient(135deg, $primary 0%, $primary 100%);
  color: $secondary;
}

@media (max-width: 700px) {
  #left {
    width: 50%;
  }
}
</style>


