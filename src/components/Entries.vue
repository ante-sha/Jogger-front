<template>
  <div>
    <h1>{{ any() }}</h1>
    <v-flex>
      <ul v-if="!update">
        <li v-if="entryArr !== undefined && entryArr.length !== 0" v-for="(ent,index) in entryArr">
          <span>{{ index+1 }}.</span>
          <span>Date: {{ ent.date.split('T')[0] }}</span>
          <span >Duration: {{ ent.duration }}min</span>
          <span >Length: {{ ent.length }}m</span>
          <v-btn v-on:click="callUpdate(ent, index)"><v-icon>update</v-icon></v-btn>
          <v-btn v-on:click="delEntry(ent, index)"><v-icon>delete_forever</v-icon></v-btn>
          <hr>
        </li>
        <li v-if="!newEnt"><v-btn id="add" class="green"  v-on:click="fun()" >Add new entry</v-btn></li>
        <li  v-if="newEnt">
        <form>
            <span>Date: <input type="date" v-model="newEntry.newDate" required/></span>
            <span >Duration: <input type="number"v-model="newEntry.newDuration" required/>min</span>
            <span >Length: <input type="number"  v-model="newEntry.newLength" required/>m</span>
            <v-btn v-on:click="send()" class="green">Add</v-btn>
            <hr>

          </form>
        </li>
      </ul>
    </v-flex>
    <div v-if="update">
      <li>
        <v-form>
          <v-btn v-on:click="update=!update">Back</v-btn>
          <span>Date: <input type="date"  v-model="entry.date" required/></span>
          <span >Duration: <input type="number" v-model="entry.duration" required/>min</span>
          <span >Length: <input type="number" v-model="entry.length" required/>m</span>
          <hr>
        </v-form>
        <v-btn v-on:click="Update"><v-icon>update</v-icon></v-btn>
      </li>
    </div>
    <p>{{ Check() }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    newEnt: false,
    tmp: -1,
    entry: {},
    today: new Date(),
    newEntry: {},
    entryArr: [],
    update: false
  }),
  name: 'Entries',
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
    Check(){
      if(!this.$root.token) this.$router.push('/login')
    },
    any(){
      if(this.entryArr === undefined || this.entryArr.length === 0) return 'There is no entries!'
      else return ''
    },
    send(){
      if(this.newEntry.newDate && this.newEntry.newLength && this.newEntry.newDuration){
        this.$http.post('http://localhost:3000/entry', {
          userId: this.$route.params.id,
          duration: this.newEntry.newDuration,
          length: this.newEntry.newLength,
          date: this.newEntry.newDate
        }, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
          this.entryArr.push( { _id: res.body._id, userId: res.body.userId, duration: res.body.duration, length: res.body.length, date: res.body.date
        })}).catch(err => alert(err.statusText))
      } else {
        alert('Enter all fields')
      }
    },
    Update(){
      this.$http.patch('http://localhost:3000/entry/' + this.entry._id,{
          newDuration: this.entry.duration,
          newLength: this.entry.length,
          newDate: this.entry.date
        },
        {headers: {Authorization: 'Bearer ' + this.$root.token}}
      ).then(res => {
        console.log(res)
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

  created() {
    this.$http.get('http://localhost:3000/entry/users/' + this.$route.params.id, {headers: {Authorization: 'Bearer ' + this.$root.token}}).then(res => {
      this.entryArr = res.body.entry || []
    }).catch(err => {
      console.log(err)
    })
  }

}
</script>

<style scoped>
h1{
  text-align: center;
}

#add{
  width: 200px;
  text-align: center;
  margin: 0 auto;
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
}
span{
  margin: 10px auto;
  padding: 5px;
  font-size: 16px;
}
ul{
  margin-top: 30px;
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
