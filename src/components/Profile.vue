<template>
    <v-app v-bind:style="this.$root.background">
      <h1>User menu</h1>
      <v-layout align-top justify-center row fill-height pt-3 >
          <div class="wrap">
            <v-btn block class="green btn" v-bind:to="'/user/' + this.$root.user._id">User data</v-btn>
            <v-btn block class="yellow btn" v-bind:to="'/entry/users/' + this.$root.user._id">Entries</v-btn>
            <v-btn block class="blue btn" v-bind:to="'/reports/' + this.$root.user._id">Reports</v-btn>
            <v-btn block class="grey btn" href="http://localhost:8080/login">Log out</v-btn>
            <div v-if="this.$root.user.rank > 1">
              <v-btn class="red" to="/allUsers">All users</v-btn>
              <v-btn class="red" v-if="this.$root.user.rank >2" to="/allEntries">All entries</v-btn>
            </div>
          </div>
      </v-layout>
    </v-app>
</template>

<script>
import logCheck from '../mixins/logCheck'
export default {
  data: () => ({

  }),
  name: 'Profile',
  methods: {
  },
  mixins: [logCheck],
  created() {
    this.Check()
  }
}
</script>

<style scoped>
h1{
  text-align: center;
  margin: 15px auto;
  text-decoration: underline;
}
.btn{
  width: 300px;
  display: inline-block;
  margin: 5px auto;
  text-align: center;
}

.wrap{
  text-align: center;
  margin: 0 auto;
  max-width: 700px;
}

div{
  padding: 10px;
}

</style>
