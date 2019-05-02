<template>
  <div>
    <form action="/post" v-if="!loading">
      <img src="../assets/img/gavagai.png" id="logo">
      <h2>{{title}}</h2>
      <div class="form-item">
        <i class="far fa-user fa-2x"></i>
        <div>
          <input type="text" name="username" v-model="username">
          <label for="username">Username</label>
        </div>
      </div>
      <div class="form-item">
        <i class="fas fa-lock fa-2x"></i>
        <div>
          <input type="PASSWORD" name="password" v-model="password">
          <label for="password">Password</label>
        </div>
      </div>
      <button type="submit" v-on:click.prevent="login">LOGIN</button>
      <a href="#">Forgot Password?</a>
      <p v-if="errorMessage">{{errorMessage}}</p>
    </form>
    <Loading v-if="loading"></Loading>
  </div>
</template>

<script>
import Loading from './Loading.vue'
export default {
  name: 'login',
  components:{Loading},
  data () {
    return {
        loading: false,
        username: "",
        password: "",
        title: "Chatbot Tool",
        errorMessage: ""
    }
  },
  methods:{
    login: function(){
      const baseURI = 'https://stage.apis.chatbot.gavagai.io/api/v1/login'

      this.$http.post(baseURI, {
        username: this.username,
        password: this.password
      }).then((result) => {
        console.log(result);
        if (result.status == 200) {
          // show the loading message
          this.loading = true;
          setTimeout(()=>{
            this.loading = false;
            
            // use vuex to store user inforamtion
            this.$store.dispatch('update_user_name',this.username);
            
            // save login status in localstorage
            localStorage.setItem('login', true);
            
            // redirect to user page
            this.$router.push('/user')
          },1000);
        }
      })
      .catch((err) => {
        this.errorMessage = err.response.data.Message;
        this.username = "";
        this.password = "";
      })

      
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 305px;
  margin: 0 auto;
  background-color: white;
  padding: 40px 0;
  box-shadow: 0px 5px 5px 1px #aba8a8;
}

#logo{
  width: 200px;
}

.form-item {
  position: relative;
}

.form-item div,i {
  display: inline-block;
  vertical-align: middle;
}

.form-item input {
  display: block;
  margin: 15px 5px;
  width: 95%;
  border: none;
  outline: none;
  border-bottom: 1px solid #000000;
  padding: 5px;
  cursor: pointer;
}

.form-item label {
  position: absolute;
  pointer-events: none;
  top: 15px;
  left: 35px;
  margin-bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-item input:focus + label {
  font-size: 14px;
  top: 0;
}

button[type="submit"] {
  margin-top: 35px;
}

i {
  color: #000000;
}
</style>