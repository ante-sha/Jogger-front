<template>
  <div>
    <v-app>
      <h1>Report</h1>
      <v-btn id="go" v-bind:to="'/entry/users/' + this.$route.params.id" class="light-blue">Go to entries</v-btn>
      <v-layout align-top justify-center row fill-height pt-5 >
        <v-flex>
          <v-data-table
          :headers="headers"
          :items="reports"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.fromTo }}</td>
            <td>{{ props.item.avgS }}</td>
            <td>{{ props.item.duration }}</td>
            <td>{{ props.item.length }}</td>
          </template>
        </v-data-table>

        </v-flex>

      </v-layout>

    </v-app>

    <p>{{ Check() }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    reports: [],
    headers: [
      {
            text: 'Date',
            align: 'left',
            value: 'fromTo'
          },
          { text: 'Average speed (m/s)', value: 'avgS' },
          { text: 'Overall duration (min)', value: 'duration' },
          { text: 'OverAll length (m)', value: 'length'}
    ]
  }),
  name: 'Reports',
  methods: {
    Check(){
      if(!this.$root.token) this.$router.push('/login')
    }
  },
  created(){
    this.$http.get('http://localhost:3000/reports/' + this.$route.params.id, {
      headers: {Authorization: 'Bearer ' + this.$root.token}
    }).then(res => {
      this.reports = res.body.report || []
      for (let i=0; i<this.reports.length; i++){
        this.reports[i].avgS = this.reports[i].length/this.reports[i].duration/60
        this.reports[i].avgS = this.reports[i].avgS.toFixed(2)
        var firstDayOfYear = new Date(this.reports[i].year, 0, 1)
        var from = new Date(this.reports[i].year, 0, 1 + (this.reports[i].week) * 7 - firstDayOfYear.getDay())
        var to = new Date(this.reports[i].year, from.getMonth(), from.getDate() + 7)
        this.reports[i].fromTo = (from.getFullYear() + ' , ' + ("0" + (from.getMonth() + 1)).slice(-2) + ' , ' + ("0" + from.getDate()).slice(-2) + ' - ' +
        to.getFullYear() + ' , ' + ("0" + (to.getMonth() + 1)).slice(-2) + ' , ' + ("0" + to.getDate()).slice(-2))
      }
    }).catch(err => {
      console.log(err)
      alert(err.statusText)
    })
  }
}
</script>

<style scoped>
h1{
  text-align: center;
}
#go{
  text-align: center;
  margin: 10px auto;
}

span{
  border-right-style: solid;
}

li {
  display: block;
  margin: 0 auto;
  text-align: center;
  padding: 10px 5px 5px 5px;
  border-style: solid;
  border-width: 2px;
}
span{
  margin: 10px 20px;
  padding: 5px;
  font-size: 16px;
}
ul{
  margin-top: 30px;
}



</style>
