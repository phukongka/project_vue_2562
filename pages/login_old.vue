<template>
  <div>
    <v-container @keypress.enter="fnc_login()" >
      <v-layout column>
        <v-flex xs12>
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
          </v-card>
        </v-flex>
        <v-flex>
       <v-text-field :rules="[rules.required]" v-model="user" prepend-icon="person" name="username" label="รหัสประจำตัว" type="text" />     
        </v-flex>
        <v-flex>
          <v-text-field :rules="[rules.required]" v-model="pass" prepend-icon="lock" name="password" label="รหัสผ่าน" id="password" type="password" />
        </v-flex>
        <v-flex>
          <v-btn color="primary" @click="doLogin">
            เข้าสู่ระบบ
            <v-icon medium right>thumb_up</v-icon>
          </v-btn>
          <v-btn color="blue white--text" fab>
            <v-icon size="35px">thumb_up</v-icon>
          </v-btn>
        </v-flex>
         <v-card-actions>
                <v-flex xs12 sm12 md12 style="text-align:center">
                 <v-btn @click="fnc_login()" color="primary" >
                   
                   <v-spacer></v-spacer>
                   เข้าสู่ระบบ
                   <v-spacer></v-spacer>
                   <v-progress-circular
                      v-if="loading==true"
                      v-model="loading"
                      :size="25"
                      color="white"
                      indeterminate
                    ></v-progress-circular></v-btn>
                 <!--<br>
                 <v-btn @click="submit" color="error" block>Google +</v-btn>-->
                <br>
                
                 </v-flex>
                 <v-flex xs12 sm12 md12 style="text-align:center">
                 <v-btn @click="fnc_regist()" color="gray" >
                   
                   <v-spacer></v-spacer>
                   สมัครใช้งาน
                   <v-spacer></v-spacer>
                   <v-progress-circular
                      v-if="loading==true"
                      v-model="loading"
                      :size="25"
                      color="white"
                      indeterminate
                    ></v-progress-circular></v-btn>
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
let blankform = {
  user: "",
  pass: "",
  
//   // start_time: "",
//   // end_time: "",
//   // date_in: "",
//   // date_out: "",
//   // now_time: ""
};

export default {
  layout: "public",
  data() {
    return {
      form: JSON.parse(JSON.stringify(blankform)),
      rules: {required: value => !!value || 'ห้ามว่าง.'}
      // form:[{
      //     user: "",
      //     pass: ""
      // }]
    };
  },
  methods: {
    async doLogin() {
      // let form = {
      //   user: "",
      //   pass: ""
      // };
      let res = await this.$http.post(
        "http://localhost:9000/user/login", this.form );
      if (!res.data.ok) {
        // login ไม่สำเร็จ
        console.log("login failed");
        return;
      }
      console.log("login ok");
      //1. จำ user /login
      //window.localStorage.setItem('user', JSON.stringify(res.data.user))// แบบนี้ เก็บถาวร
      window.sessionStorage.setItem("user", JSON.stringify(res.data.user)); // แบบนี้หาย เมื่อ restart หรือ ปิด  browser
      this.$router.push("/home");
    }, // end login
    
        async fnc_login(){
      if(this.username!="" && this.password!=""){
        this.loading=true
        // var MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
        let res= await this.$http.post('login/',{
          username:this.username,
          password:this.password
        })
        //  console.log(res.data)
        if(res.data){this.loading=false}
        if(res.data.ok==true){
         
          if(res.data.status=="pk_student"){
            
            sessionStorage.setItem("id",res.data.login.std_id)
            sessionStorage.setItem("username",res.data.login.std_username)
            sessionStorage.setItem("password",(res.data.login.std_password))
            sessionStorage.setItem("std_code",(res.data.login.std_code))
            sessionStorage.setItem("std_name",(res.data.login.std_name))
            sessionStorage.setItem("std_lname",(res.data.login.std_lname))
            sessionStorage.setItem("status",(res.data.status))
            this.$router.push({path: "/student/home"})
            // console.log(res.data.login.std_code)
          }else if(res.data.status=="pk_teacher"){
            sessionStorage.setItem("id",res.data.login.t_id)
            sessionStorage.setItem("username",res.data.login.t_username)
            sessionStorage.setItem("password",(res.data.login.t_password))
            sessionStorage.setItem("t_name",(res.data.login.t_name))
            sessionStorage.setItem("status",(res.data.status))
            this.$router.push({path: "/teacher/group"})
            // console.log(res.data)
          }else if(res.data.status=="pk_admin"){
            sessionStorage.setItem("id",res.data.login[0].a_id)
            sessionStorage.setItem("username",res.data.login[0].a_username)
            sessionStorage.setItem("password",(res.data.login[0].a_password))
            sessionStorage.setItem("a_name",(res.data.login[0].a_name))
            sessionStorage.setItem("a_lname",(res.data.login[0].a_lname))
            sessionStorage.setItem("status",(res.data.status))
            this.$router.push({path: "/manage/dashboard"})
            // console.log(res.data.login)
          }else if(res.data.status=="bld"){
            sessionStorage.setItem("id",res.data.login.bld_username)
            sessionStorage.setItem("username",res.data.login.bld_username)
            sessionStorage.setItem("password",(res.data.login.bld_password))
            sessionStorage.setItem("a_name",(res.data.login[0].bld_username))
            sessionStorage.setItem("a_lname",(res.data.login[0].bld_username))
            sessionStorage.setItem("status",(res.data.status))
            this.$router.push({path: "/manage/dashboard"})
            //  console.log(res.data)
          }
            
          
        }else{this.type_api="error",this.danger=true,this.alt_txt=res.data.alt_txt}
      }else{this.type_api="error",this.danger=true,this.alt_txt="กรุณากรอกข้อมูล"}
    },

  }
};
</script>
