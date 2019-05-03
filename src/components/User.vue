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
      this.$store.dispatch('logout');
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