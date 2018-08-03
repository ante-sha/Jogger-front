<template>
    <v-app v-bind:style="this.$root.background">
      <h1>About us</h1>
      <v-layout align-top justify-center row fill-height pt-3 >
          <div class="wrap">
            <div id="frame">
              <p>We are company that inspires people, boosts their dreams.</p>
              <p>
                Have you ever wanted to become independent and self-confident? We have solution for that...
                Our coaches are perfect for your problems and they will certainly improve your physical appearance.
              </p>
              <br>
              <p>
                Do not let your dreams stay just a sketch on a paper, work hard for them and see how your way on thinking
                and attitudes are changing ; how you are becoming the person you wanted to be...
              </p>
          </div>
          <div><v-btn><v-icon>android</v-icon>Download</v-btn><v-btn><v-icon>phone_iphone</v-icon>Download</v-btn></div>
            <span>For your personal trainer contact us at: jogger@jogger.com</span>
            <hr>
          </div>
      </v-layout>
    </v-app>
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



#frame{
  padding: 20px;
  background-image: url("../assets/top.jpg");
  border: 2px;
  border-style: solid;
  color: white;
  font-weight: bold;
  font-size: 14px;
}
span{
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.wrap{
  text-align: center;
  margin: 0 auto;
  max-width: 700px;
}

div{
  padding: 10px;
}
h1{
  text-align: center;
  margin: 15px auto;
  text-decoration: underline;
}

</style>
