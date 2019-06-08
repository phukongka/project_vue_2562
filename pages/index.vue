<template>
  <div>
     <audio ref="start" src="/audio/start.wav" autoplay></audio>
    <v-container   @keypress.enter="doLogin">
      <v-layout column>       
        <v-flex>   
           <v-text-field v-model="user"  prepend-icon="person" label="Login" type="text" ></v-text-field>
        </v-flex>
        <v-flex>
           <v-text-field v-model="pass" id="password" prepend-icon="lock" label="Password" type="password"></v-text-field>
      
        </v-flex>
        <v-flex>
            <div class="text-xs-center">
                 <v-btn round outline color="white" @click="doLogin" style="width:100%">Login</v-btn>
            </div>
        </v-flex>
     
      </v-layout>
    </v-container>
    <div>
    <v-card-actions class="justify-center">
   <v-btn
      fab      
      color="white"      
      dark
      fixed
     
      style="margin-top:11px;"
     >
     <v-icon color="#22abb6">add</v-icon>
    </v-btn>
</v-card-actions>
     </div>
  </div>
</template>

<script>
// let blankform = {
//   user: "",
//   pass: ""
//   // start_time: "",
//   // end_time: "",
//   // date_in: "",
//   // date_out: "",
//   // now_time: ""
// };

export default {
  layout: "default1",
  data() {
    return {
      user: "",
      pass: "",
      // form: JSON.parse(JSON.stringify(blankform))
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
      this.$refs.start.play()
      console.log("login ok");
      //1. จำ user /login
      //window.localStorage.setItem('user', JSON.stringify(res.data.user))// แบบนี้ เก็บถาวร
      window.sessionStorage.setItem("user", JSON.stringify(res.data.user)); // แบบนี้หาย เมื่อ restart หรือ ปิด  browser
      this.$router.push("/signin");
    } // end login
    // login ok
    // ridirect to home
  }
};
</script>

