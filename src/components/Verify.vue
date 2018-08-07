<template>
    <v-app v-bind:style="this.$root.background + ' width:60%;'">
      <v-flex>
        <h1>Verification</h1>
        <v-layout align-center justify-center row fill-height >
        <h3>{{ message }}</h3>
      </v-layout>

      </v-flex>
    </v-app>
</template>

<script>
export default {
  data: () => ({
    message: ""
  }),
  name: 'Verify',
  methods: {

  },
  created(){
    this.$http.get('http://localhost:3000/verify/' + this.$route.params.token).then(res => {
      this.message = 'Success, you can go login now.'
    }).catch(err => {
      console.log(err)
      this.message = 'You have wrong link or expired one.'
    })
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
</style>
