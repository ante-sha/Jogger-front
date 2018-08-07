<template>
    <v-app v-bind:style="this.$root.background">
      <h1>Report</h1>
      <v-btn id="go" dark v-bind:to="'/entry/users/' + this.$route.params.id">Go to entries</v-btn>
      <v-layout align-top justify-center row fill-height pt-2 >
        <v-flex pr-2 pl-2>
          <v-data-table
          :headers="headers"
          :pagination.sync="pagination"
          :items="reports"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>From: {{ props.item.fromTo.split('P')[0] }}<br>To: {{ props.item.fromTo.split('P')[1] }}</td>
            <td class="miso text-xs-center">{{ props.item.avgS }}</td>
            <td class="text-xs-center">{{ props.item.duration }}</td>
            <td class="text-xs-center">{{ props.item.length }}</td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination color="black" v-model="pagination.page" :length="pages"></v-pagination>
        </div>
        </v-flex>
      </v-layout>
    </v-app>
</template>

<script>
import logCheck from '../mixins/logCheck'
export default {
  data: () => ({
    pagination: {
      rowsPerPage: 6,
    },
    reports: [],
    headers: [
      {
            text: 'Date',
            align: 'left',
            value: 'fromTo'
          },
          { text: 'Average speed(m/s)', value: 'avgS' },
          { text: 'Overall duration(min)', value: 'duration' },
          { text: 'OverAll length(m)', value: 'length'}
    ]
  }),
  name: 'Reports',
  methods: {

  },

  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  mixins: [logCheck],
  created(){
    if (this.Check()) {
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
          this.reports[i].fromTo = (from.getFullYear() + ': ' + ("0" + (from.getMonth() + 1)).slice(-2) + ': ' + ("0" + from.getDate()).slice(-2) + ' P ' +
          to.getFullYear() + ': ' + ("0" + (to.getMonth() + 1)).slice(-2) + ': ' + ("0" + to.getDate()).slice(-2))
          this.pagination.totalItems = this.reports.length
        }
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
}
#go{
  text-align: center;
  margin: 10px auto;
}
.miso{
  width: 20px;
  padding-left: 0px;
  padding-right: 0px;
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
