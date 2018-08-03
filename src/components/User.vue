<template>
    <v-app v-bind:style="this.$root.background">
        <v-flex>
          <v-layout align-start justify-center row fill-height>
          <span><img v-bind:src="source[user.rank]"/></span>
          <span>
            <p>Email: {{ user.email }}</p>
            <p>Rank: {{ getRank() }}</p>
            <p>Exp: </p>
            <p>Level: </p>
          </span>
          </v-layout >
          <div>
            <hr>
            <v-layout align-start justify-end row fill-height>
              <v-btn class="grey" v-on:click="deleteUser()">{{ text() }}</v-btn>
            </v-layout>
          </div>
        </v-flex>
    </v-app>
</template>

<script>
import logCheck from '../mixins/logCheck'
export default {
  data: () => ({
    source: [
      '',
      'http://www.coastalbend.edu/uploadedImages/CBC/Content/Student_Services/Tutoring/stick_figure_covered_books_1600_clr_9024.png',
      'https://i1.wp.com/www.classtools.net/blog/wp-content/uploads/2015/05/spy.jpg',
      'http://www.accountancy-edge.co.uk/wp-content/uploads/2013/04/company-director.jpg'
    ],
    user: []
  }),
  name: 'User',
  methods: {
    text(){
      if(this.$route.params.id === this.$root.user._id) return 'Delete your account'
      else return 'Delete users account'
    },
    getRank(){
      if (this.user.rank === 1) return 'Trainee';
      else if (this.user.rank === 2) return 'Agent';
      else if(this.user.rank === 3) return 'Director';
      else return 'Error'
    },
    deleteUser(){
      this.$http.delete('http://localhost:3000/users/' + this.$route.params.id, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res =>{
        if(this.$route.params.id === this.$root.user._id) this.$root.token = ''
        else this.$router.push('/allUsers')
      }).catch(err => {
        console.log(err)
        alert(err.statusText)
      })
    }
  },
  mixins: [logCheck],
  created(){
    if (this.Check()) {
      this.$http.get('http://localhost:3000/users/' + this.$route.params.id, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res =>{
        this.user = res.body
      }).catch(err => {
        console.log(err)
        alert(err.statusText)
      })
    }
  }
}
</script>

<style scoped>
v-btn{
  right: 10%
}

p{
  font-size: 20px;
  font-family: monospace;
  padding: 10px;
  margin: 10px;
  text-align: center;
}
span{
  display: inline-block;
  margin-right: 50px;
}
img{
  max-width: 200px;
  max-height: 300px;
}

div{
  padding: 10px;
}


</style>
