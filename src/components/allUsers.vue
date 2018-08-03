<template>
  <div>
    <v-app v-bind:style="this.$root.background">
        <v-flex>
          <h1>All managable users</h1>
          <ul>
            <li v-for="(user,index) in users">
              <span> {{ index+1 }}.</span>
              <v-btn v-bind:to="'/entry/users/' + user._id"><v-icon left>list</v-icon>Entries</v-btn>
              <v-btn v-bind:to="'/reports/' + user._id"><v-icon left>reorder</v-icon>Report</v-btn>
              <div id="email">Email: {{ user.email }}</div>
              <span >Rank: {{ user.rank }}.</span>
              <br>
              <label v-if="visible(user)">
                <v-btn  class="light-green" v-on:click="rankUp(user,index)"><v-icon left>arrow_drop_up</v-icon>Rank up</v-btn>
                <v-btn class="red accent-2" v-on:click="rankDown(user,index)"><v-icon left>arrow_drop_down</v-icon>Rank down</v-btn>
              </label>
              <v-btn class="grey" v-bind:to="'/user/' + user._id"><v-icon left>person</v-icon>Profile</v-btn>
              <hr>
            </li>
          </ul>
        </v-flex>
    </v-app>
  </div>
</template>

<script>
import logCheck from '../mixins/logCheck'
export default {
  data: () => ({
    users: []
  }),
  name: 'allUsers',
  methods: {
    rankUp(user, index){
      if (user.rank === 3) {
        alert('You already made him admin')
      } else {
        this.$http.patch('http://localhost:3000/manage/promote',{
          userId: user._id,
          newRank: user.rank+1
        } , {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(
          this.users[index].rank = user.rank+1
        ).catch(err => {
          console.log(err)
          alert(err.statusText)
        })
      }

    },
    rankDown(user, index){
      if (user.rank === 1) {
        alert('You can not demote this user')
      } else {
        this.$http.patch('http://localhost:3000/manage/promote',{
          userId: user._id,
          newRank: user.rank-1
        } , {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(
          this.users[index].rank = user.rank-1
        ).catch(err => {
          console.log(err)
          alert(err.statusText)
        })
      }
    },
    visible(user){
      if (this.$root.user.rank === 2) return false;
      else return true;
    }
  },
  mixins: [logCheck],
  created() {
    if (this.Check()) {
      this.$http.get('http://localhost:3000/users', {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
        this.users = res.body.users || []
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
h1{
  text-align: center;
  margin-top: 15px;
  text-decoration: underline;
}

#email{
  display: inline-block;
  width: 200px;
  margin: 20px;
  font-size: 16px;
  font-style: italic;
  font-weight: bold;
}


li {
  display: block;
  margin: 0 auto;
  text-align: center;
  padding: 10px 5px 5px 5px;
  border-style: solid;
  border-width: 2px;
  background-color: rgba(255,255,255,0.7);
}
span{
  padding: 5px;
  font-size: 16px;
  border-style: solid;
}
ul{
  margin-top: 30px;
  padding: 0 12px;
}



</style>
