<template>
  <div class="main">
    <div class=" control">
      <div class=" nav">
        <ul class=" nav nav-pills">
          <router-link to="/">
            Home
          </router-link> |
          <router-link to="/history">
            History
          </router-link> |
          <router-link to="/friends">
            <a>Friends</a>
          </router-link> |
        </ul>
      </div>
      <div class=" search">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search for..."
            v-model="searchText"
            @input="instantSearch"
          >
          <span class="input-group-btn">
            <button
              class="btn btn-secondary"
              type="button"
              @click="performSearch"
            >Go!</button>
          </span>
        </div>
      </div>
      <button
        class="btn"
        @click="logout"
      >
        Logout
      </button>
    </div>
    <div v-if="showResults">
      <div class="text-center">
        <button
          class="btn closeSearch"
          @click="searched = false"
        >
          Close
        </button>
      </div>
      <userDetails :user="this.user" />
      <searchResultList :results="results" />
    </div>
    <router-view :user="user" />
  </div>
</template>

<script>
  import userDetails from '@/components/UserDetails.vue';
  import SearchResultList from '@/components/SearchResultList.vue';
  import {eventBus} from "../main";

  export default{
    data: function () {
      return {
        user: {},
        searchText: '',
        results: [],
        searched: false,
        friendInterval: 0,
        loading: false
      }
    },
    components: {
      searchResultList: SearchResultList,
      userDetails: userDetails
    },
    methods: {

    
      fetchUser(userid){
        this.getUser(userid) // Global
        .then((user) => {
        this.user = user;
        }, (err) => {
        console.log(err);
        });
      },
      
      performSearch(){
        this.axios.get(`http://localhost:4000/data/search`, {
          params: {
            string: this.searchText
          },  
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
          })
        .then((data) => {
          this.results = data.body;
          this.searched = true;
          console.log(data.body);
        }, (err) => {
          console.log(err);
        })
      },
      instantSearch(){
        if (this.searchText.length > 3) {
          this.performSearch();
        }
        if (this.searchText === '') {
          this.searched  =false;
        }
      },
      fetchFriends(userId){
        if(userId) this.user.friends.push(userId);
        
        this.axios.get(`http://localhost:4000/data/user/${this.axios.defaults.user._id}`) // , {
        .then((data) => {
            console.log(`newsfeedComp line 143: \n ${data}`);
            this.friendships = data.body; //Global
            eventBus.$emit('friendshipActionDone');
          }, (err) => {
            console.log(err)
          });
      },
      logout(){
        this.logout(); // Global
        this.$router.push('/login');
      }
    },
    computed: {
      showResults(){
        if (this.searched && this.results.length !== 0) return true;
        return false;
      }
    },
    created(){
      this.user = this.axios.defaults.user;
      console.log(this.user);
        
       //     this.fetchFriends();
      /*
            eventBus.$on('friendshipAction', (userId) => {
                console.log('event load friends');
                this.fetchFriends(userId);
            });
            eventBus.$on('posted', () => {
                this.loading = false;
            });

            eventBus.$on('posting', () => {
                this.loading = true;
            });
*/
            this.friendInterval =  setInterval(() => {
                if(!this.loading){
                    this.fetchFriends(this.user._id);
                }
            },300000)
    },
    beforeUnmount(){
      clearInterval(this.friendInterval);
    }
  }
</script>

<style scoped>
  .main {
    margin-top: -65px;
    max-width: 1000px;
  }
  .nav {
    margin-right: auto;
  }
  .search {
    width: 30vw;
    margin-right: 4%;
  }
  .control {
    display: inline-flex;
    flex-direction: row;
    width: 100%;
  }
  .nav-pills > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {
    color: #fff;
    background-color: #333333;
    border: 0;
  }
  .nav-pills > li > a:hover {
    background-color: rgba(219, 215, 19, 0);;
    transform: scale(1.1);
  }
  .nav-pills > li > a {
    color: #333333;
  }
  .btn-secondary {
    background-color: #333;
    color: white;
  }
  .btn {
    max-width: 80px;
    max-height: 35px;
    color: white;
    background-color: #333;
    outline: none;
  }
  .closeSearch {
    margin-top: 30px;
    max-width: 100px;
    max-height: 55px;
  }
  .btn:active {
    outline: none;
  }
</style>
