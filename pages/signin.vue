<template>
  <div>
    <h1>ระบบลงเวลาปฏิบัติงาน</h1>
    <v-flex>
      <v-text-field v-model="form.user" label="กรอกรหัส"/>
     
    </v-flex>
    
    <v-btn color="success" @click="signIn">signIn</v-btn>
    <v-btn color="success" @click="showList">รายละเอียด</v-btn>
    <v-btn color="success" @click="showListCon">รายละเอียด_มาสาย</v-btn>
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
// console.log("diff days ::==", moment().diff(my_moment, "days"));
// console.log("diff hours ::==", moment().diff(my_moment, "hours"));
// console.log("diff minutes ::==", moment().diff(my_moment, "minutes"));
// console.log("diff seconds ::==", moment().diff(my_moment, "seconds"));
// let blankform = {
//   user: "",
//   start_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//   end_time: "",
//   date_in: moment(Date.now()).format("HH:mm:ss"),
//   date_out: "",
//   now_time: "",
  
// };

export default {
  // layout: "tem_signin",
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
  methods: {
    async signIn() {
        const my_moment = moment("2019-06-06 23:12:00", "YYYY-MM-DD hh:mm:ss");
        let  timeStatus =''
        let timeHours = moment().diff(my_moment, "hours");
        let timeMinutes = moment().diff(my_moment, "minutes");
        let start_time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        let date_in = moment(Date.now()).format("HH:mm:ss")
        let date_out = moment(Date.now()).format("HH:mm:ss")
        let user
        console.log('timestatus', timeMinutes)
        console.log('timesHours', timeHours)   
        console.log('start_time', start_time)   
        console.log('datein', date_in)  
      if(timeMinutes <= 30 ){
         timeStatus = "1" // มาทำงาน   
         console.log('ปกติ',timeMinutes)
            this.saveSingIn() 
      }    
       if (timeMinutes > 30 && timeHours < 3) {
            timeStatus = "2" // มาสาย   
            this.saveSingIn()          
        }
        if (timeHours >= 3 && timeHours <=4 ){
            timeStatus = "3" //  ติดต่องานบุคลากร
            this.saveSingIn()  
        }
         if(timeHours >= 4) {
            //TODO  alert แจ้งเตือน
            console.log("ติตด่อบุคลกร หมดเวลา")
             this.$router.replace("/signin");
          }
        this.form.start_time = start_time
        this.form.date_in = date_in
        this.form.status = timeStatus
        this.form.date_out = date_out

        console.log(timeStatus); 
     
    }, // end SignIn
    async saveSingIn() {
       let res = await this.$http.post(
        "http://localhost:9000/user/signin",this.form
        
      );
      if (!res.data.ok) {
        // save  ไม่สำเร็จ
        console.log("Save failed");
        return;
      }
      console.log("save ok");
      //1. ไปหน้าหลัก
      this.$router.push("/signin");
      // ridirect to signin
    }, // saveSignIN
    async signOut() {
        let res = await this.$http.post("http://localhost:9000/user/signOut",this.form);
      if (!res.data.ok) {
        // Update  ไม่สำเร็จ
        console.log("Update failed");
        return;
      }
      console.log("Update ok");
      //1. ไปหน้าหลัก
      this.$router.push("/signin");
      // ridirect to signin
    }, // end SignOut
    
    logOut() {
      window.sessionStorage.removeItem("user");
      this.$router.replace("/login");
    },
    showList() {
      this.$router.push("./reports/report_everday");
      // ridirect to signin
    }, // end showList
    showListCon() {
      this.$router.push("./reports/report_condition");
      // ridirect to signin
    } // end showList
  }
};
</script>

