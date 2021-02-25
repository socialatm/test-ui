<template>
  <div class="flex-item main">
    <div class="flex text-center">
      <router-link :to="{name: 'userView' , params: { id: userId}}">
        <a id="userRoute">
          <div class="flex-item text-center">
            <img :src="user.avatar">
            <span class="username">{{ user.username }}</span>
          </div>
        </a>
      </router-link>
      <div
        class="status"
        v-if="!nostatus"
      >
        <button
          class="btn"
          v-if="status === 'send'"
          @click="sendFriendRequest"
        >
          send friend request
        </button>
        <div v-if="status === 'accept'">
          <button
            class="btn"
            @click="acceptFriendRequest"
          >
            accept friend request
          </button>
          <button
            class="btn decline"
            @click="declineFriendRequest"
          >
            decline
          </button>
        </div>
        <span v-if="status === 'pending'"> ..pending</span>
        <span v-if="status === 'friend'"> <i
          class="fa fa-check"
          aria-hidden="true"
        /> Friends</span>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default{
    props: {
      userId: {
        type: String,
        default: () => {}
      },
      nostatus: Boolean
    },
    data: function () {
      return {
        user: {},
        status: ''
      }
    },
        methods: {
            requestStatus(){
                let status = 'send';
                this.friendships.forEach((friendship) => {
                    if (friendship.status === 'PENDING') {
                        if (friendship.userOne === this.user._id && friendship.userTwo === this.userId) {    // Global
                            console.log('accept req')
                            status = 'accept';
                        }
                        if (friendship.userOne === this.userId && friendship.userTwo === this.user._id) {    // Global
                            console.log('pending');
                            status = 'pending'
                        }
                    }
                })
                if (this.userId === this.userId) {
                    status = 'null';
                }
                if (this.user.friends.includes(this.user._id)) {
                    status = 'friend';
                }
                this.status = status;
            },
            acceptFriendRequest(){
                this.updateFriendship(this.userId, true)
                    .then(() => {    //  .then((data) => {
                        this.status = 'friend';
                        
                    }, (err) => {
                        console.log(err);
                    })
            },
            declineFriendRequest(){
                this.updateFriendship(this.userId, false)
                    .then(() => {    //  .then((data) => {
                        this.status = 'send';
                    }, (err) => {
                        console.log(err);
                    })
            },
            sendFriendRequest(){
                this.sendFriendrequest(this.userId)
                    .then(() => {    //  .then((data) => {
                        this.status = 'pending';
                    }, (err) => {
                        console.log(err);
                    })
            },
            fetchUser(){
                this.getUser(this.userId)
                    .then((data) => {
                        this.user = data.body;
                        this.requestStatus();
                    }, (err) => {
                        console.log(err);
                    });
            }
        },
        created(){
           this.fetchUser();
        }
    }
</script>

<style scoped>
    .flex {
        display: flex;
        flex-direction: row;
        margin-top: 2em;
        flex-direction: row;
        width: 100%;
        border-width: 1px;
        border-style: solid;
        border-color: #333333;
        padding: 1em;
        max-width: 80%;
        border-radius: 10px;
        margin-left: auto;
        margin-right: auto;
    }
    .flex:hover {
        box-shadow: -1px 9px 46px 0px #333333;
    }
    .flex-item {
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-right: auto;
    }
    img {
        max-width: 8vh;
        max-height: 8vh;
        vertical-align: 0;
    }
    span {
        font-size: 1.5em;
        margin-left: 20px;
    }
    .username{
        font-size: 2.5em;
    }
    .status {
        margin-left: auto;
        margin-top: auto;
        margin-bottom: auto;
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
    .btn {
        color: white;
        background-color: #333;
        max-height: 5vh;
        max-width: 220px;
    }
    .decline{
        background-color: #ff4e1d;
    }
</style>
