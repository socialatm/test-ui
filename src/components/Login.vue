<template>
  <div class="form">
    <div class="form-group">
      <label>Email</label>
      <input
        v-model="username"
        type="text"
        class="form-control"
        placeholder="Email"
      >
    </div>
    <div class="form-group">
      <label>Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password"
      >
    </div>
    <div>
      <button
        class="btn btn-primary"
        @click="login"
      >
        Log in
      </button>
    </div>
    <div
      class="err"
      v-if="error"
    >
      <p>Password or username are not matching the database</p>
      <p>Please try again</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        username: "",
        password: "",
        error: false
      }
    },
    created(){
      // set the base url early
      this.axios.defaults.baseURL = 'http://localhost:4000/';
    },
      methods: {
        login(){
          this.axios.post('data/login', {username: this.username, password: this.password })
          .then((res) => { 
          //  make the token global here
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;   
          this.axios.get(`data/user/${res.data.id}`)
            .then((res) => {
            console.log(res);
            this.user = res.data;
            // assign the user to an axios default & we can pass it from component to component
            this.axios.defaults.user = res.data;
            this.$router.push('/newsfeed').catch(() => {});
          }, (err) => {
            console.log(err);
          });
          }).catch(() => {
            this.error = true;
          })
        }
      }
  }
</script>

<style scoped>
    input.form-control {
        margin-bottom: 0.5em;
    }
    .btn-primary {
        width: 100%;
        margin-bottom: 1em;
        background-color:#333333;
    }
    .form{
        padding: 1em;
    }

    .err {
        margin-top: 2em;
        background-color: rgba(255, 112, 79, 0.7);
    }
</style>
