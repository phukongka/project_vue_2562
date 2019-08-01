
<template>
    <v-card @keypress.enter="teacher_update(t_id)">
       
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
        <v-flex xs7 >
          ข้อมูลครู / บุคลากร
        </v-flex>
        <!-- <v-flex xs2 >
          <v-btn
            color="green lighten-2"
            flat
            @click="isEditing = !isEditing"
          >
            <i v-if="isEditing" class="fas fa-times fa-2x"></i>
            <i v-else class="fas fa-edit fa-2x "></i>
          </v-btn>
        </v-flex>
        <v-flex xs2 >
          <v-dialog v-model="conf_del" persistent max-width="290">
            <v-btn slot="activator" flat color="red lighten-2"><i class="fas fa-trash-alt fa-2x"></i></v-btn>
            <v-card>
              <v-card-title class="headline">ยืนยันการลบข้อมูล</v-card-title>
              <v-card-text>ต้องการลบข้อมูลรหัส {{t_code}}<br> ใช่หรือไม่?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" flat @click.native="conf_del = false">ไม่ใช่</v-btn>
                <v-btn color="primary" flat @click="teacher_del(t_id)">ใช่</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex> -->
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs4></v-flex>
            <v-flex xs4 class="text-xs-center" 
                @click="$refs.img.click()" 
                style="cursor: pointer;"
              >
                <input 
                  type="file" 
                  style="display:none;" 
                  accept="image/*" 
                  multiple  
                  @change="upload_img($event)" 
                  ref="img"
                >
                <v-card height="100%" class="grey lighten-4 paddign" > 
                  <img :src="this.img" width="100%">
                  <v-card-actions style="font-size:100%">
                    <span><i class="fas fa-image fa-2x"></i></span>
                    <v-spacer></v-spacer>
                    <span>รูปภาพ</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs4></v-flex>
                <span class="headline">แผนกวิชา {{t_dep}}</span>
              <v-flex xs12>
                
                <span class="headline">ที่ปรึกษากลุ่ม</span>
                <span class="cv-title" v-for="gro in itm" :key="gro"> {{gro.g_name}}</span>
              </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  maxlength="10"
                  counter
                  :rules="[rules.required, rules.counter]"
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  label="รหัสประจำตัวครู / บุคลากร"
                  name="t_code"
                  v-model="t_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  prepend-icon="fas fa-user fa-2x"
                  label="ชื่อ นามสกุล"
                  name="t_name"
                  v-model="t_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
           
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required, rules.counter]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-phone-square fa-2x"
                  label="เบอร์โทรศัพท์"
                  name="t_tel"
                  v-model="t_tel"
                ></v-text-field>
              </v-layout>
            </v-flex>
                       
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <!-- <v-btn flat color="red lighten-2" @click="teacher()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2" :disabled="!isEditing" @click="teacher_update(t_id)"><i class="fas fa-save fa-2x"></i></v-btn> -->
        </v-card-actions>
        <v-alert
          v-model="danger"
          dismissible
          :type="type_api"
        >
          {{alt_txt}}
        </v-alert>
    </v-card>
</template>
<script>
    export default {
        layout: 'teacher',
        data () {
          return {
            t_id:'',
            t_code:"",
            t_name:"",
            t_dep:"",
            t_tel:"",
            t_username:"",
            t_password:"",

            mst_1: null ||'กลุ่มการเรียนที่1',
            mst_2: null ||'กลุ่มการเรียนที่2',
            mst_3: null ||"กลุ่มการเรียนที่3",

            group:[],

            d_code:"",

            type_api:"",
            danger:false,
            loading: false,
            conf_del:false,
            isEditing:null,
            alt_txt:"",

            rules: {
              required: value => !!value || 'ห้ามว่าง.',
              // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
            },
            img:[],
            load_status:0,
            link_img:"/files/img/teachers/",
            itm:[],
            img_id:"",
          }
        },
        async created(){
          this.sh_teacher()
        },
        watch: {
        },
        methods:{
            conf_del(){this.conf_del=true},
            async teacher_del(t_id){
              let res=await this.$http.post('/teacher/teacher_del/',{
                t_code:this.t_code,
        				t_name:this.t_name,
        				t_dep:this.t_dep,
        				t_tel:this.t_tel,
        				t_username:this.t_username,
        				t_password:this.t_password,
                t_id:t_id,
                u_id:sessionStorage.getItem("username")
              })
              if(res.data.ok==true){this.$router.push({name:"manage-teacher"})}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            async sh_teacher(){
              let res=await this.$http.get('/teacher/sh_teacher/'+this.$route.query.t_id)
              this.t_id=this.$route.query.t_id
              this.t_code=res.data.datas[0].t_code
              this.t_name=res.data.datas[0].t_name
              this.t_dep=res.data.datas[0].d_name
              this.t_tel=res.data.datas[0].t_tel
              this.t_username=res.data.datas[0].t_username
              this.t_password=res.data.datas[0].t_password
              this.d_code=res.data.datas[0].d_code
              this.img=this.link_img+res.data.image[0].img_img
              this.itm=res.data.datas
              this.img_id=res.data.datas[0].img_id
              // console.log(res.data.datas)
            
            },
            async teacher_update(t_id){
              //console.log("t_id"+t_id)
              const formData = new FormData()
                formData.append('img-'+this.img_id,this.$refs.img.files[0])

                formData.append('t_code',this.t_code)
                formData.append('t_name',this.t_name)
                formData.append('t_dep',this.t_dep)
                formData.append('t_tel',this.t_tel)
                formData.append('u_id',sessionStorage.getItem("username"))
                formData.append('t_username',this.t_username)
                formData.append('t_password',this.t_password)
                formData.append('t_id',t_id)
                let res=await this.$http.post("/teacher/teacher_update",formData,{
                    onUploadProgress: uploadEvent => {
                      this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
                    }
                })
              // console.log(res.data)
                if(res.data.ok==true){this.load_status=0,this.$router.push({name:"manage-teacher"}),
                  this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
                }
            	 else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            upload_img(e){
              const image = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = e =>{              
                this.img=e.target.result;
                // console.log(this.img_side);
              };
            },
            teacher(){
              this.$router.push({name:"manage-teacher"})
            }
        }
    }
</script>