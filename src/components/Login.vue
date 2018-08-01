<template>
  <div>
  </keepalive>
    <v-app>
      <v-flex>
        <v-layout align-center justify-center row fill-height >
        <v-form v-model="valid" id="formular">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passRules"
            label="Password"
            type=password
            required
            ></v-text-field>
            <v-layout  align-center justify-end row fill-height >
              <v-btn v-if="valid" v-on:click="signup">Sign up</v-btn>
              <v-btn v-if="valid" v-on:click="login">Login</v-btn>
              <v-btn v-if="!valid" href="http://www.google.com">Help</v-btn>
            </v-layout>
        </v-form>
      </v-layout>
      </v-flex>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passRules: [
      v => !!v || 'Required.' ,
      v => v.length >= 6 || 'Min 6 characters'
    ]
  }),
  name: 'Login',
  methods: {
    login: function() {
      this.$http.post('http://localhost:3000/users/login',{
        email: this.email,
        pass: this.password
      }).then(result => {
        console.log(result)
        this.$root.token = result.body.token
        this.$root.user = result.body.user
        this.$root.logged = true
        this.$router.push('/profile')
      }).catch(error => {
        console.log(error)
        alert(error.statusText);
      })
    },
    signup: function() {
    this.$http.post('http://localhost:3000/users/signup',{
      email: this.email,
      pass: this.password
    }).then(result => {
      console.log(result)
      this.$root.token = result.body.token
      this.$root.user = result.body.user
      this.$root.logged = true
      this.$router.push('/profile')
    }).catch(error => {
      console.log(error)
      alert(error.statusText);
    })
  }
  }
}
</script>

<style scoped>
#formular{
  padding: 100px;
  width: 600px;
}

</style>
