        
    function register(user)
        {
            // return this.$http.post('user', user);
            return axios.post('http://localhost:4000/data/register', user);
        }
        