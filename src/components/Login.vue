<template>
  <div class="form">
    <div class="form-group">
      <label>Username</label>
      <input
        v-model="username"
        type="text"
        class="form-control"
        placeholder="Username"
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
  import axios from 'axios';
    export default {
      data: function () {
        return {
          username: "",
          password: "",
          error: false
        }
      },
      methods: {
        login(){
          axios.post('http://localhost:4000/data/login', {username: this.username, password: this.password })
          .then((res) => {
          axios.get(`http://localhost:4000/data/user/${res.data.id}`, {
            headers: {
              'Authorization': `Bearer ${res.data.token}`
            }
          })
          .then((res) => {
            console.log(res.data);
            this.user = res.data;
            this.$router.push('/home');
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
