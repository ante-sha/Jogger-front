<template>
  <div id="app">
    <!--<img src="./assets/logo.png">
    <router-view/>-->
    <v-toolbar>
      <v-toolbar-title>JOGGER</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="!this.$root.token" to="/login" exact><v-icon left>arrow_right</v-icon>Sign in</v-btn>
        <v-btn v-if="this.$root.token" to="/profile" exact><v-icon left>home</v-icon>Home</v-btn>
        <v-btn to="/aboutus" exact><v-icon left>description</v-icon>About Us</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>


  </div>
</template>

<script>

export default {
  components: {
  },
  name: 'App',
  methods: {

  }
}
</script>

<style scoped>

.v-btn--active{
  background-color: grey;
}
.v-btn{
  color: black;
}

</style>
