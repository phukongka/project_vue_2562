<template>
  <div>
    <v-container @keypress.enter="doLogin" >
      <v-layout column>
        <v-flex xs12>
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
          </v-card>
        </v-flex>
        <v-flex>
       <v-text-field :rules="[rules.required]" v-model="user" prepend-icon="person" name="user" label="รหัสประจำตัว" type="text" />     
        </v-flex>
        <v-flex>
          <v-text-field :rules="[rules.required]" v-model="pass" prepend-icon="lock" name="pass" label="รหัสผ่าน" id="password" type="password" />
        </v-flex>
         <v-card-actions>
                <v-flex xs12 sm12 md12 style="text-align:center">
                 <v-btn @click="doLogin" color="primary" >
                   
                   <v-spacer></v-spacer>
                   เข้าสู่ระบบ
                   <v-spacer></v-spacer>
                  </v-btn>
                 <!--<br>
                 <v-btn @click="submit" color="error" block>Google +</v-btn>-->
                <br>
                
                 </v-flex>
                 <v-flex xs12 sm12 md12 style="text-align:center">
                 <v-btn @click="register" color="gray" >
                   
                   <v-spacer></v-spacer>
                   สมัครใช้งาน
                   <v-spacer></v-spacer>
                   </v-btn>
                 <!--<br>
                 <v-btn @click="submit" color="error" block>Google +</v-btn>-->
                <br>
                
                 </v-flex>
              </v-card-actions>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// let blankform = {
//   user: "",
//   pass: ""
  
// //   // start_time: "",
// //   // end_time: "",
// //   // date_in: "",
// //   // date_out: "",
// //   // now_time: ""
// };

export default {
  //layout: "public",
  data() {
    return {
      //form: JSON.parse(JSON.stringify(blankform)),
      user: "",
      pass: "",
      rules: {required: value => !!value || 'ห้ามว่าง.'}
      // form:[{
      //     user: "",
      //     pass: ""
      // }]
    };
  },
  methods: {
    register() {
      this.$router.push({path: "/register"})
    },
    async doLogin() {
      // let form = {
      //   user: "",
      //   pass: ""
      // };
      let res = await this.$http.post(
        "http://localhost:9000/api/login", {
          user:this.user,
          pass:this.pass
        } );
      if (!res.data.ok) {
        // login ไม่สำเร็จ
        console.log("login failed");
        
        return;
      }
      console.log("login ok");
     
      //1. จำ user /login

      //window.localStorage.setItem('user', JSON.stringify(res.data.user))// แบบนี้ เก็บถาวร
      window.sessionStorage.setItem("user", JSON.stringify(res.data.user)); // แบบนี้หาย เมื่อ restart หรือ ปิด  browser
      this.$router.push("/signin");
    }, // end login
    
   }
};
</script>
