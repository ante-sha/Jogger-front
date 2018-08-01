<template>
  <div>
    <v-app>
      <v-layout align-top justify-center row fill-height pt-5 >


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
    <p>{{ Check() }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  name: 'Profile',
  methods: {

    Check(){
      if(!this.$root.token) this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.btn{
  width: 300px;
  display: inline-block;
  margin: 0 auto;
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
