<template>
  <div id="app">
    <!--<img src="./assets/logo.png">
    <router-view/>-->
    <v-app>
    <v-toolbar>
      <v-toolbar-title>JOGGER</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="!this.$root.token" to="/login" left exact><v-icon left>arrow_right</v-icon>Sign in</v-btn>
        <v-btn v-if="this.$root.token" to="/profile" left exact><v-icon left>home</v-icon>Home</v-btn>
        <v-btn to="/aboutus" left exact><v-icon left>description</v-icon>About Us</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>

  </v-app>
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
#app{
  margin: 0 auto;
  background-color: #e2e2e2;
}
div{
  margin: 0 auto;
  padding: 0;
}
.v-btn--active{
  background-color: #c0c7cf;
}
.v-btn{
  color: black;
}

</style>
