์<template>
   <div>
    <div>Hello world2</div> 
    <div>{{text}}</div>
    <input type="text" v-model="text">
    <input type="text"  :value="text">
    <input type="button" :value="btnText" :disabled="false">
      {{btnText}}
        <input type="button" :value="btnText1" :disabled="text.length > 3">
   </div>
</template>
<script>
export default {

data() {
    // setInterval(() => {
    //     this.text += '*'
    // }, 2000);
    return {
    text: '',
   }
 },
 computed: {
     btnText() {
        return  this.text.length > 3 ? 'YES' : 'NO'
     },
  },
}
</script>
