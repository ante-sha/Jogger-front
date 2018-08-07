<template>
    <v-app v-bind:style="this.$root.background + ' width:60%;'">
      <v-flex>
        <h1>Singup</h1>
        <v-layout align-center justify-center row fill-height >
        <h3 v-if="open">Please validate your email on your email.</h3>
        <v-form v-model="valid" id="formular" v-if="!open">
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
              <v-btn light v-if="valid" v-on:click="signup">Sign up</v-btn>
              <v-btn v-if="!valid" href="http://www.google.com">Help</v-btn>
            </v-layout>
        </v-form>
        <div v-if="!open"><v-btn><v-icon>android</v-icon>Download</v-btn><v-btn><v-icon>phone_iphone</v-icon>Download</v-btn></div>
      </v-layout>

      </v-flex>
    </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    open: false,
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
  name: 'SignUp',
  methods: {
    signup: function() {
    this.$http.post('http://localhost:3000/users/signup',{
      email: this.email,
      pass: this.password
    }).then(result => {
      this.open = true
    }).catch(error => {
      console.log(error)
      alert(error.body.message);
    })
  }
  }
}
</script>

<style scoped>
h3{
  margin-top:50px;
}
h1{
  text-align: center;
  margin-top: 15px;
  text-decoration: underline;
}
#formular{
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
}
div{
  display:block;
  text-align:center;
  margin: 0 auto;
}

</style>
