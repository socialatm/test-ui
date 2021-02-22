<template>
  <div class="main-edit text-center">
    <img
      :src="avatar"
      id="userAvatarEdit"
    >
    <p>
      <button
        class="btn-avatar btn"
        @click="changeAvatar"
      >
        Change Avatar
        <input
          @change="getImageInput"
          class="file"
          ref="fileImg"
          type="file"
          accept="image/*"
        >
      </button>
    </p>
    <div class="form text-center">
      <div class="form-group">
        <label>First name</label>
        <input
          v-model="username.firstName"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Last name</label>
        <input
          v-model="username.lastName"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Username</label>
        <input
          v-model="userusername"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="usercontact.email"
          type="email"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input
          v-model="usercontact.phone"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Age</label>
        <input
          v-model="userage"
          type="number"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Street</label>
        <input
          v-model="useraddress.street"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Zip</label>
        <input
          v-model="useraddress.zip"
          type="text"
          class="form-control"
        >
      </div>
      <div
        class="form-group"
        v-if="user.address"
      >
        <label>City</label>
        <input
          v-model="useraddress.city"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Country</label>
        <input
          v-model="useraddress.country"
          type="text"
          class="form-control"
        >
      </div>
      <div>
        <button
          class="btn btn-primary"
          @click="postUser"
        >
          Save
        </button>
        <button
          class="btn closeBtn"
          @click="closeEdit"
        >
          X
        </button>
      </div>
      <div
        class="err"
        v-if="error"
      >
        <p>Please try again</p>
        <p>{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {eventBus} from "../main";
  export default{
    props: {
      user: {
        type: Object,
        default: () => {}
      }
    },
    data: function () {
      return {
        testPassword: "",
        error: false,
        errorMsg: {},
        image: {},
      };
    },
    computed: {
      avatar(){
        if (!this.user.avatar) return "http://placehold.it/160x220";
        return this.user.avatar;
      },
    },
        methods: {
            postUser(){
                console.log(this.user);
                this.updateUser(this.user)  // Global
                    .then(() => {    //  .then((data) => {
                        eventBus.$emit('userSaved');
                    }, (err) => {
                        console.log(err);
                        this.error = true;
                        this.errorMsg = err.body;
                    });


            },
            closeEdit(){
                eventBus.$emit('userSaved');
            },
            changeAvatar(){
                this.$refs.fileImg.click();
            },
            generateImg(file){

                let reader = new FileReader();
                // let self = this;
                reader.onloadend = function () {
                    document.getElementById('userAvatarEdit').src = reader.result;
                }
                reader.readAsDataURL(file);
            },
            getImageInput(event){
                this.image = event.target.files[0];
                this.generateImg(this.image);
                this.sendAvatar();
            },
            sendAvatar(){
                const formData = new FormData();
                formData.append("image", this.image);
                this.sendUserAvatar(formData)    // Global
                    .then((data) => {
                        this.useravatar = data.body;    //  Global
                    }, (err) => {
                        console.log(err);
                    })
            }
        },
        created() {
            if (this.user.address) return;
            this.useraddress = {};
        }
  }
</script>

<style scoped>
    .err {
        margin-top: 2em;
        background-color: rgba(255, 112, 79, 0.7);
    }
    .btn-primary {
        width: 50%;
        margin-bottom: 1em;
        background-color: #333333;
        height: 5vh;
    }
    .closeBtn{
        background-color: #333333;
        height: 5vh;
        margin-left: 20px;
        margin-bottom: 1em;
        color: white;
    }
    .form {
        padding: 1em;
    }
    .main-edit {
        margin-top: 3em;
        margin-bottom: 2em;
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
    }
    .btn-avatar {
        margin-bottom: 1em;
        margin-top: 0.5em;
        background-color: #333333;
        color: white;
        width: 160px;
    }
    .file {
        display: none;
    }
    img {
        max-width: 250px;
    }
    input {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
