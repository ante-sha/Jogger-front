<template>
  <div>
    <v-app v-bind:style="this.$root.background">
    <h1>{{ any() }}</h1>
    <v-flex>
      <v-layout align-top justify-center row fill-height pt-1 >
      <ul v-if="!update">
        <li v-if="entryArr !== undefined && entryArr.length !== 0" v-for="(ent,index) in entryArr">
            <v-btn class="grey" v-bind:to="'/user/' + ent.userId"><v-icon left>person</v-icon>Profile</v-btn>
            <div id="num">{{ index+1 }}.</div>
            <span id="date">Date: {{ ent.date.split('T')[0] }}</span>
            <div class="data" >Duration: {{ ent.duration }}min</div>
            <div class="data" >Length: {{ ent.length }}m</div>
            <v-btn v-on:click="callUpdate(ent, index)"><v-icon>update</v-icon></v-btn>
            <v-btn v-on:click="delEntry(ent, index)"><v-icon>delete_forever</v-icon></v-btn>
            <hr>
          </li>
        </ul>
      </v-layout>
    </v-flex>
    <div v-if="update">
      <li>
        <v-form>
          <v-btn v-on:click="update=!update">Back</v-btn>
          <v-btn v-on:click="Update" right><v-icon>update</v-icon></v-btn>
          <span >Date: <input type="date"  v-model="entry.date" required/></span>
          <span >Duration: <input type="number" v-model="entry.duration" required/>min</span>
          <span >Length: <input type="number" v-model="entry.length" required/>m</span>

          <hr>
        </v-form>

      </li>
    </div>
    {{ Check() }}
  </v-app>
  </div>
</template>

<script>
import logCheck from '../mixins/logCheck'
export default {
  data: () => ({
    newEnt: false,
    tmp: -1,
    entry: {},
    newEntry: {},
    entryArr: [],
    update: false
  }),
  name: 'Entries',
  methods: {
    callUpdate(entry,index){
      this.update = true;
      this.entry = entry;
      this.entry.date = entry.date.split('T')[0];
      this.tmp = index;
    },
    delEntry(entry,index){
      this.$http.delete('http://localhost:3000/entry/' + entry._id, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
        this.entryArr.splice(index,1)
      }).catch(err => {
        console.log(err)
        alert(err.statusText)
      })
    },
    any(){
      if(this.entryArr === undefined || this.entryArr.length === 0) return 'There is no entries!'
      else return 'All entries'
    },
    // send(){
    //   if(this.newEntry.newDate && this.newEntry.newLength && this.newEntry.newDuration){
    //     this.$http.post('http://localhost:3000/entry', {
    //       userId: this.$route.params.id,
    //       duration: this.newEntry.newDuration,
    //       length: this.newEntry.newLength,
    //       date: this.newEntry.newDate
    //     }, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
    //       this.entryArr.push( { _id: res.body._id, userId: res.body.userId, duration: res.body.duration, length: res.body.length, date: res.body.date
    //     })}).catch(err => alert(err.statusText))
    //   } else {
    //     alert('Enter all fields')
    //   }
    // },
    Update(){
      this.$http.patch('http://localhost:3000/entry/' + this.entry._id,{
          newDuration: this.entry.duration,
          newLength: this.entry.length,
          newDate: this.entry.date
        },
        {headers: {Authorization: 'Bearer ' + this.$root.token}}
      ).then(res => {
        this.entryArr.splice(this.tmp,1,this.entry)
        this.update = false;
      }).catch(err => {
        console.log(err)
        alert(err.statusText)
      })
    }
  },
  computed: {

  },
  mixins: [logCheck],
  created() {
    this.$http.get('http://localhost:3000/manage/entry' , {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
      this.entryArr = res.body.Entries || []
    }).catch(err => {
      console.log(err)
    })
  }

}
</script>

<style scoped>
h1{
  text-align: center;
  margin-top: 15px;
  text-decoration: underline;
}
#num{
  margin: 0px 10px;
  width: 30px;
  display: inline-block;
  border-right: 1px solid;
}
#add{
  width: 200px;
  text-align: center;
  margin: 0 auto;
}
.data{
  width: 150px;
  display:inline-block;
  padding: 5px;
  font-size: 16px;
  border-right-style: solid;
}

input[type="date"]{
  width: 150px;
  text-align: right;
}

input[type="number"]{
  width: 100px;
  text-align: right;
}
li {
  display: block;
  margin: 0 auto;
  padding: 10px 5px 5px 5px;
  border-style: solid;
  border-width: 2px;
  background-color: rgba(255,255,255,0.7);
}
span{
  margin: 10px auto;
  padding: 5px;
  font-size: 16px;
  border-right-style: solid;
}
ul{
  margin-top: 30px;
  padding: 0 12px;
}
#date{
  width: 200px;
}
.v-btn{
  color: black;
}

</style>
