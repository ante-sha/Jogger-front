<template>
    <v-app v-bind:style="this.$root.background">
    <h1>{{ any() }}</h1>
    <v-flex>
      <v-container pt-2 pb-1 class="text-xs-center"><v-btn dark id="go" v-if="repBut" v-bind:to="'/reports/' + this.$route.params.id">Go to reports</v-btn></v-container>
      <ul v-if="!update">
        <li v-if="!newEnt"><v-btn id="add" class="green lighten-2"  v-on:click="fun()" >Add new entry</v-btn></li>
        <li  v-if="newEnt">
        <form>
            <span>Date: <input type="date" v-model="newEntry.newDate" required/></span>
            <span >Duration: <input type="number"v-model="newEntry.newDuration" required/>min</span>
            <span >Length: <input type="number"  v-model="newEntry.newLength" required/>m</span>
            <v-btn v-on:click="send()" class="green lighten-2">Add</v-btn>
            <hr>
          </form>
        </li>
        <li v-if="entryArr !== undefined && entryArr.length !== 0" v-for="(ent,index) in tmpEntryArr">
          <div id="num">{{ (index+1) + (page - 1) * count }}.</div>
          <span>Date: {{ ent.date.split('T')[0] }}</span>
          <div class="data" >Duration: {{ Math.floor(ent.duration) }}min</div>
          <div class="data" >Length: {{ Math.floor(ent.length) }}m</div>
          <div>
          <v-btn v-on:click="callUpdate(ent, index + (page - 1) * count)"><v-icon>update</v-icon></v-btn>
          <v-btn v-on:click="delEntry(ent, index + (page - 1) * count)"><v-icon>delete_forever</v-icon></v-btn>
          </div>
          <hr>
        </li>
        <div class="text-xs-center">
          <v-pagination
          color="black"
          v-model="page"
          :length="numOfPag"
          ></v-pagination>
        </div>
      </ul>
      <div v-if="update">
        <li>
          <v-form>
            <v-btn v-on:click="update=!update">Back</v-btn>
            <v-btn v-on:click="Update" right><v-icon>update</v-icon></v-btn>
            <span>Date: <input type="date"  v-model="entry.date" required/></span>
            <span >Duration: <input type="number" v-model="entry.duration" required/>min</span>
            <span >Length: <input type="number" v-model="entry.length" required/>m</span>
            <hr>
          </v-form>
        </li>
      </div>
    </v-flex>
    </v-app>
</template>

<script>
import logCheck from '../mixins/logCheck'
export default {
  data: () => ({
    newEnt: false,
    repBut: true,
    tmp: -1,
    entry: {},
    today: new Date(),
    newEntry: {},
    entryArr: [],
    tmpEntryArr: [],
    page: 1,
    numOfPag: 0,
    count: 7,
    update: false
  }),
  name: 'Entries',
  watch: {
    page(){
      this.tmpEntryArr = this.entryArr.slice(this.count * (this.page - 1), (this.count * this.page))
    },
    entryArr(){
      this.tmpEntryArr = this.entryArr.slice(this.count * (this.page - 1), (this.count * this.page))
      this.numOfPag = Math.ceil(this.entryArr.length / this.count)
      if (this.page > this.numOfPag) this.page = this.numOfPag
      if (this.entryArr.length === 1 ) this.page = 1
    }
  },
  methods: {
    fun(){
      this.newEnt=true;
      this.newEntry.newDate = this.today.getFullYear().toString() + '-' + ("0" + (this.today.getMonth() + 1)).slice(-2) + '-' + ("0" + this.today.getDate()).slice(-2)
    },
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
      if(this.entryArr === undefined || this.entryArr.length === 0) {
        this.repBut = false;
        return 'There is no entries!'
      } else {
        this.repBut = true;
        if(this.$route.params.id === this.$root.user._id) return 'Your entries'
        else return 'Users entries'
      }
    },
    send(){
      if(this.newEntry.newDate && this.newEntry.newLength && this.newEntry.newDuration){
        this.$http.post('http://localhost:3000/entry', {
          userId: this.$route.params.id,
          duration: this.newEntry.newDuration,
          length: this.newEntry.newLength,
          date: this.newEntry.newDate
        }, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
          this.newEnt = false
          this.entryArr.push({ _id: res.body._id, userId: res.body.userId, duration: res.body.duration, length: res.body.length, date: res.body.date })
          alert('Entry posted!')
        }).catch(err => alert(err.body.message))
      } else {
        alert('Enter all fields')
      }
    },
    Update(){
      if(this.entry.length && this.entry.duration && this.entry.date >= '2018-08-01') {
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
      } else {
        alert('Enter valid data in all fields')
      }

    }
  },
  computed: {

  },
  mixins: [logCheck],
  created() {
    if (this.Check()) {
      this.$http.get('http://localhost:3000/entry/users/' + this.$route.params.id, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
        this.entryArr = res.body.entry || []
      }).catch(err => {
        console.log(err)
        alert(err.statusText)
        if(err.status === 401) this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
.light-blue{
  color: black;
  font-size: 16px;
}
h1{
  text-align: center;
  margin-top: 15px;
  text-decoration: underline;
  cursor: default;
}
#num{
  margin: 0px 10px;
  width: 30px;
  display: inline-block;
  border-right: 1px solid;
}
#go{
  text-align: center;
  margin: 10px auto;
  width: 140px;
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
span{
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
  text-align: center;
  padding: 10px 5px 5px 5px;
  border-style: solid;
  border-width: 2px;
  background-color: rgba(255,255,255,0.7);
}
span{
  margin: 10px auto;
  padding: 5px;
  font-size: 16px;
}
ul{
  margin-top: 20px;
  padding: 10px;
}
.v-btn{
  width: 30px;
}

</style>
<!-- // beforeUpdate() {
//   console.log('pali')
//   this.$http.get('http://localhost:3000/entry/users/' + this.$route.params.id, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
//     this.entryArr = res.body.entry
//   }).catch(err => {
//     console.log(err)
//   })
// } -->
