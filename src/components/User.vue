<template>
    <v-app v-bind:style="this.$root.background">
        <v-flex>
          <v-layout align-center justify-center column fill-height>
            <h1>User data</h1>
            <div class="window re">
              <img v-bind:src="source[user.rank]"/>

              <div class="data re">
                <p>Email: {{ user.email }}</p>
                <p>Rank: {{ getRank() }}</p>
                <p v-if="!user.verify">Account not verified</p>
                <p v-if="user.verify">Exp: </p>
                <p v-if="user.verify">Level: </p>
              </div>
            </div>
          </v-layout >
          <hr>
          <!-- <div class="text-xs-center"><v-btn class="blue-grey lighten-4 del" v-on:click="deleteUser()">{{ text() }}</v-btn></div> -->
          <div class="text-xs-center" v-if="this.$route.params.id !== this.$root.user._id">
            <v-dialog
            v-model="dialog"
            width="300"
            >
            <v-btn
            slot="activator"
            color="blue-grey lighten-4"
            light
            >
              Delete Users Account
            </v-btn>

            <v-card>
              <v-card-title
              class="headline grey lighten-2"
              primary-title
              >
                Warning!
              </v-card-title>

              <v-card-text>
                When you delete account, data is irretrivable.<br>Do you want to continue?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="primary"
                flat
                @click="deleteUser()"
                >
                  Yes
                </v-btn>
                <v-btn
                color="primary"
                flat
                @click="dialog = false"
                >
                  No
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        </v-flex>
    </v-app>
</template>

<script>
import logCheck from '../mixins/logCheck'
export default {
  data: () => ({
    dialog: false,
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
      this.dialog = false
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
h1{
  text-align: center;
  margin-top: 15px;
  text-decoration: underline;
  cursor: default;
}

p{
  font-size: 20px;
  font-family: monospace;
  padding: 10px;
  margin: 10px;
  text-align: center;
}


img{
  display: inline-block;
  width: 35%;
  max-height: 300px;
  margin: 20px 0;
}
.window{
  margin: 20px auto;
  padding: 0;
}
.re{
  padding: 10px;
  display: inline-block;
  text-align: center;
}
.data{
  position: relative;
  top: -50px;
}



</style>
