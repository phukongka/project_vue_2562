์<template>
   <div>
    <div>Hello world2</div> 
    <div  v-if="show"> {{text}}</div>
    <div  v-show="show"> {{text}}</div>
    <input v-model.trim="text"> <br>
    <input type="text" v-model="text">
    <input type="text"  :value="text">
      {{btnText}}
      <div> text={{ text }} xxxxx   </div>
       <div> html=<span v-html="text"></span>xxxxx </div>
    <input type="button" :value="btnText" :disabled="text.length <= 3" @click="addStd">
    <input type="button" value="Toggle" @click="toggleShow" >
    <div>Total {{students.length}} student</div>
   <div v-for="(st, idx) in students" :key="st.id">
      {{idx +1}} {{st.id}}<b> {{st.code}} </b> {{st.name}}
   </div>
    <div v-for="i in 10" :key="i">
        {{i}}
    </div>
   </div>
</template>
<script>
export default {
data() {
    return {
    text: '',
    show: true,
    students: [
      {id: 1,code: '1111', name: 'name1'},
      {id: 2,code: '1112', name: 'name2'},
      {id: 3,code: '1113', name: 'name3'},
      {id: 4,code: '1114', name: 'name4'},
      {id: 5,code: '1115', name: 'name5'},
    ],
   }
 },
 computed: {
     btnText() {
        return  this.text.length > 3 ? 'YES' : 'NO'
     },
  },
  methods: {
      toggleShow(){
        this.show = !this.show
      },
      addStd() {
         let id = this.students.length +1 
        this.students.push({id, code: '11115', name: 'name5'})
      },
  },
}
</script>
