<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
    <div>
    </div>
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
      localStorage.removeItem('token');
      location.reload();
    }
  },
  computed: {
    greeting(){
      return 'Welcome ' + this.$store.state.username;
    }
  }
}
</script>

<style scoped>
</style>