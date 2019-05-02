<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
    <button @click='logout'>Logout</button>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {

    }
  },
  methods:{
    logout(){
      localStorage.removeItem('login');
      location.reload();
    }
  },
  computed: {
    greeting(){
      // get user name from vuex
      return 'Welcome ' + this.$store.state.username;
    }
  }
}
</script>

<style scoped>
</style>