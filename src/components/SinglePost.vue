<template>
  <div class="post-div">
    <div class="text-center">
      <div class="post text-center">
        <div class="flex">
          <router-link :to="{name: 'userView' , params: { id: getUserId }}">
            <a>
              <img
                :src="avatar"
                class="avatar"
              >
            </a>
          </router-link>
          <router-link :to="{name: 'userView' , params: { id: getUserId }}">
            <a>
              <h2 class="user">{{ post.author.username }}</h2>
            </a>
          </router-link>
        </div>
        <div class="title">
          <p
            class="post-title"
            v-if="post.title !== 'undefined'"
          >
            {{ post.title }}
          </p>
        </div>
        <div
          id="media"
          v-if="isMedia"
          class="text-center"
        >
          <img
            v-if="mediaType === 'image'"
            :src="post.media"
          >
          <video
            v-if="mediaType=== 'video'"
            controls=""
            width="80%"
            :src="post.media"
          />
        </div>
        <p
          v-if="post.content !== 'undefined'"
          class="content"
        >
          {{ post.content }}
        </p>
      </div>
    </div>
    <div
      class="comments-display"
      v-if="showComm"
    >
      <!--comments-->
      <div
        v-for="comment in post.comments"
        :key="comment"
      >
        <comment-comp
          :comment="comment"
          :key="comment._id"
        />
      </div>
    </div>
    <div class="buttons flex">
      <div class="likes flex">
        <button
          v-if="!liked"
          class="btn"
          @click="addLike"
        >
          Like
        </button>
        <span
          v-else
          class="likedIcon glyphicon glyphicon-star"
          aria-hidden="true"
        />
        <h2 class="likesNumber">
          {{ likesCount }}
        </h2>
      </div>
      <div class="input-group comment-input">
        <input
          type="text"
          class="form-control"
          placeholder="Comment.."
          v-model="commentText"
        >
        <span class="input-group-btn">
          <button
            class="btn"
            type="button"
            @click="postComment"
          >+</button>
        </span>
      </div>
      <div class="comments">
        <button
          class="btn"
          @click="showComm = !showComm"
        >
          {{ showHide }} {{ commentsCount }} Comments
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Comment from './CommentComp.vue';

    export default{
        data: function () {
            return {
                showComm: false,
                commentText: '',
            }
        },
        components:{
          commentComp: Comment
        },
        props: {
            post: {
              type: Object,
              default: () => {}
            }
        },
        methods: {
            
           /* @todo
            addLike(){
                this.postLike(this.post._id)
                    .then(() => {  //  .then((data) => {
                        this.post.likes.push(this.userId);
                    }, (err) => {
                        console.log(err);
                    })
            },
*/
/*    @todo
            postComment(){
                this.sendComment(this.post._id, this.commentText)
                    .then((data) => {
                        this.post.comments = data.body;
                        this.showComm = true;
                        this.commentText = '';
                    }, (err) => {
                        console.log(err);
                    })
            }
*/

        },
        computed: {
            isMedia(){
                return this.post.media;
            },
            likesCount(){
                let count = this.post.likes.length;
                if (count === 0) {
                    return;
                }
                return count;
            },
            commentsCount(){
                let count = this.post.comments.length;
                if (count === 0) {
                    return 0;
                }
                return count;
            },


/* @todo
            mediaType(){
                if (!this.post.mediaType) return '';
                if (this.post.mediaType.includes('image')) return 'image';
                if (this.post.mediaType.includes('video')) return 'video';
                if (this.post.mediaType.includes('youtube')) return 'youtube';
            },

*/


            avatar(){
                if (!this.post.author.avatar) return "http://placehold.it/60x60";
                return this.post.author.avatar;
            },
            liked(){
                return this.post.likes.includes(this.userId);  //  Global
            },
            getUserId(){
                if (this.post.author._id) return this.post.author._id;
                return this.userId;  //  Global
            },
            showHide(){
                if(this.showComm) return 'Hide';
                return 'Show';
            }
        }
    }
</script>

<style scoped>
    .post-div {
        margin-top: 3em;
        margin-bottom: 1em;
        border-width: 2px;
        border-style: solid;
        border-color: #333333;
        padding: 1em;
        transition: transform 0.5s linear;
    }
    .avatar {
        max-width: 8vh;
        max-height: 8vh;
        margin-top: 5px;
        margin-right: 10px;
    }
    .post-div:hover {
        box-shadow: -1px 9px 46px 0px #333333;
    }
    .flex {
        display: flex;
        flex-direction: row;
    }
    .user {
        margin-right: auto;
        margin-top: -1px;
    }
    .comments {
        margin-left: auto;
    }
    img {
        max-width: 80%;
    }
    .btn {
        color: white;
        background-color: #333;
    }
    .btn:focus {
        outline: none;
    }
    p {
        font-size: 2.5vh;
    }
    .comment-input {
        max-width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
    .title {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        max-width: 80%;
        margin-right: auto;
        margin-left: auto;
    }
    .content {
        margin-top: 1em;
    }
    .post-title {
        margin-top: 1em;
    }
    .likedIcon {
        font-size: 5vh;
        color: rgba(219, 215, 19, 0.82);
    }
    .likesNumber {
        margin-left: 10px;
        font-size: 4vh;
        margin-top: auto;
        margin-bottom: auto;
    }
    .buttons {
        margin-top: 2em;
    }
    a {
        color: #333333;
    }
    a:focus {
        text-decoration: none;
        color: #23527c;
    }
    a:hover {
        text-decoration: none;
        color: #23527c;
    }
    #media {
        margin-top: 2em;
    }
    .comments-display{
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #333333;
        margin-top: 2em;
    }
</style>
