<template>
  <div class="main-post ">
    <div class="flex text-center container">
      <div class="post text-center">
        <div>
          <input
            v-model="post.title"
            type="text"
            placeholder="Title"
          >
        </div>
        <div
          id="media"
          v-show="isMedia()"
          class="text-center"
        />
        <div>
          <textarea
            v-model="post.content"
            cols="100"
            placeholder="...Tell the world whats on your mind"
          />
        </div>
        <p
          class="text-center"
          v-if="loading"
        >
          <span class="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
        </p>
      </div>
    </div>
    <div class="text-center buttons">
      <button
        @click="addFoto"
        class="btn"
      >
        <span
          class="glyphicon glyphicon-picture"
          aria-hidden="true"
        />
        <input
          @change="getImageInput"
          class="file"
          ref="fileImg"
          type="file"
          accept="image/*"
        >
      </button>
      <button
        class="btn"
        @click="addVideo"
      >
        <span
          class="glyphicon glyphicon-facetime-video"
          aria-hidden="true"
        />
        <input
          class="file"
          ref="fileVideo"
          type="file"
          accept="video/*"
          @change="getVideoInput"
        >
      </button>
      <button
        class="btn"
        @click="addYt"
      >
        <img src="/assets/youtube.png">
      </button>
      <button
        class="btn post-button"
        @click="sendPost"
      >
        Post
      </button>
      <button
        class="btn close-button"
        @click="closePost"
      >
        X
      </button>
    </div>
  </div>
</template>

<script>
    
  export default {
    data: function () {
      return {
        post: {},
        showYoutube: false,
        image: {},
        video: {},
        youtube: "",
        fotoAdded: false,
        videoAdded: false,
        ytAdded: false,
        loading: false
      }
    },
    computed: {},
    methods: {
      isMedia(){
        return this.fotoAdded || this.videoAdded || this.ytAdded;
      },
      getImageInput(event){
        this.fotoAdded = true;
        this.image = event.target.files[0];
        document.getElementById('media').appendChild(this.generateImg(this.image));
      },
      getVideoInput(event){
        this.videoAdded = true;
        this.video = event.target.files[0];
        console.log(this.video);
        document.getElementById('media').appendChild(this.generateVideo(this.video));
      },

/* @todo
            generateVideo(file){
//                let vid = document.createElement("video");
//                vid.setAttribute('controls', '');
//                vid.setAttribute('width', '640');
//
//                vid.src = "https://clonebookposts.s3.eu-central-1.amazonaws.com/587def6534fe105baf3f46de";
                let h2 = document.createElement("h2");
                h2.innerHTML = 'Your Video has been added succesfully - Video Preview is not supported yet';

                return h2;
            },
*/
      generateImg(file){
        let img = document.createElement("img");
        img.setAttribute("style", "max-width: 80%;");
        let reader = new FileReader();
        reader.onloadend = function () {
          img.src = reader.result;
        }
        reader.readAsDataURL(file);
          return img;
      },
      sendPost(){
        if (!this.post.title && !this.post.content) {
          alert('Pls give your post a title or add some content at least');
          return;
        }
        this.loading = true;
        const formData = new FormData();
        formData.append("title", this.post.title);
        formData.append('content', this.post.content);
        if (this.fotoAdded) {
          formData.append("mediaType", "image");
          formData.append("media", this.image);
          console.log("image appended")
        }
        else if (this.videoAdded) {
          formData.append("mediaType", "video");
          formData.append("media", this.video);
        } else if (this.youtube !== "") {
          formData.append("mediaType", "youtube");
          formData.append("media", this.youtube);
        }
        this.sendPost(formData)
        .then((data) => {
          delete data.body.author;
          data.body.author = {};
          data.body.author.username = this.user.username;
          data.body.author.avatar = this.user.avatar;
        }, (err) => {
          console.log(err);
        })
      },
      addFoto(){
        this.$refs.fileImg.click();
      },
      addVideo(){
        this.$refs.fileVideo.click();
      },
      addYt(){
        console.log('youtube');
      },
      closePost() {}
    }
  }
</script>

<style scoped>
    .file {
        display: none;
    }
    .fa-spin{
        font-size: 4em;
    }
    .flex {
        display: flex;
        margin-top: 4vh;
        flex-direction: row;
        width: 100%;
    }
    .border {
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        padding-bottom: 0.5em;
    }
    .btn {
        max-width: 60px;
        max-height: 30px;
        color: white;
        background-color: #333;
        margin-top: 10px;
    }
    .close-button{
        margin-left: 20px;
    }
    .post {
        width: 100%;
        margin-right: auto;
    }
    input {
        width: 100%;
        border: none;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        font-size: 2.5vh;
        font-weight: bold;
        text-align: center;
        outline: none;
        padding-top: 1em;
    }
    textarea {
        margin-top: 5px;
        width: 100%;
        border: none;
        font-size: 2.5vh;
        outline: none;
        min-height: 10vh;
        resize: none
    }
    textarea::-webkit-scrollbar {
        display: none;
    }
    button > img {
        vertical-align: baseline;
    }
    #media {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        padding-bottom: 2em;
        padding-top: 2em;
    }
    .main-post {
        box-shadow: -1px 9px 46px 0px #333333;
        margin-bottom: 2em;
    }
    .buttons {
        padding-bottom: 1em;
    }
</style>
