<template>
  <div>
    <h1>ระบบลงเวลาปฏิบัติงาน</h1>
    <v-flex>
      <v-text-field v-model="form.user" label="กรอกรหัส"/>
    </v-flex>
    <v-btn color="success" @click="signIn">signIn</v-btn>
    <v-btn color="success" @click="showList">รายละเอียด</v-btn>
    <v-btn color="success" @click="logOut">Logout</v-btn>
  </div>
</template>
<script>
import moment from "moment";
// หาช่วงห่างของเวลา
//const my_moment = moment("2019-06-05 09:00:00", "YYYY-MM-DD hh:mm:ss");
// console.log("diff years ::==", moment().diff(my_moment, "years"));
// console.log("diff months ::==", moment().diff(my_moment, "months"));
// console.log("diff weeks ::==", moment().diff(my_moment, "weeks"));
// let blankform = {
//   user: "",
//   start_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//   end_time: "",
//   date_in: moment(Date.now()).format("HH:mm:ss"),
//   date_out: "",
//   now_time: "",
  
// };

export default {
   layout: "tem_signin",
  data() {
     
    return {
      form: {
        user: "",
        start_time: "",
        end_time: "",
        date_in: "",
        date_out: "",
        now_time: "",
        status: ""
      },
      //JSON.parse(JSON.stringify(blankform)),
      user: {}
    };
  },
}
</script>

