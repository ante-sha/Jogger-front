<template>
  <div>
    <v-app>
      <v-layout align-top justify-center row fill-height pt-5 >


          <div class="wrap">
            <h1>About us</h1>
            <p>We are company that inspires people, boosting their dreams and blablabla</p>
            <hr>

          </div>

      </v-layout>


    </v-app>

  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  name: 'AboutUs',
  methods: {

  }
}
</script>

<style scoped>
p{
  padding: 20px;
  background-color: grey;
  border: 2px;
  border-style: solid;
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
