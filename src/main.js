import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    username (state, name) {
      state.username = name;
    },
    token (state, token) {
      state.token = token;
    }
  },
  actions: {
    auth_success(store, name, token)
    {
      store.commit('username',name);
      store.commit('token', token);
    }
  }
})

Vue.prototype.$http = axios //this makes possible to use axios in all my code
Vue.config.productionTip = false

new Vue({
  el: '#app',
  created:function(){
  	this.checkLogin()
  },
  watch:{
  	'$route':'checkLogin'
  },
  router,
  store,
  template: '<App/>',
  components: { App },
  methods:{
  	checkLogin(){
      
  		if(!localStorage.getItem("token")) {
        this.$router.push('login');
        return;
      } 

      if(!this.$store.username && localStorage.getItem('token')) {
        this.$store.dispatch('auth_success',this.$store.state.username, this.$store.state.token);
        this.$router.push('user');
        return;
      }

      if(this.$store.username && localStorage.getItem('token')) {
         this.$router.push('user');
         return;
      }
      
  	}
  },
  render: h => h(App)
})