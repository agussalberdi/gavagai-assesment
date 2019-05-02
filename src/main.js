import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    username (state,name) {
      state.username = name;
    }
  },
  actions: {
    update_user_name(store,name)
    {
      store.commit('username',name);
    }
  }
})

Vue.prototype.$http = axios
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
      
  		if(!localStorage.getItem("login"))
      {
        this.$router.push('login');
        return;
      } 

      if(!this.$store.username && localStorage.getItem('login'))
      {
        this.$store.dispatch('update_user_name',this.$store.state.username);
        this.$router.push('user');
        return;
      }

      if(this.$store.username && localStorage.getItem('login'))
      {
         this.$router.push('user');
         return;
      }
  	}
  },
  render: h => h(App)
})