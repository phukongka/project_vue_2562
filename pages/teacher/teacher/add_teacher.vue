
<template>
    <v-card @keypress.enter="teacher_add()">
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          เพิ่มข้อมูลครู / บุคลากร
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
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required, rules.counter]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  placeholder="รหัสประจำตัวครู / บุคลากร"
                  name="t_code"
                  v-model="t_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  prepend-icon="fas fa-user fa-2x"
                  placeholder="ชื่อ นามสกุล"
                  name="t_name"
                  v-model="t_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                 :rules="[rules.required, rules.counter]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-phone-square fa-2x"
                  placeholder="เบอร์โทรศัพท์"
                  name="t_tel"
                  v-model="t_tel"
                ></v-text-field>
              </v-layout>
            </v-flex>
           
            <v-flex xs12 >
              <v-select
                prepend-icon="fas fa-th"
                :items="department"
                item-value="d_code"
                label="แผนกวิชา"
                placeholder="แผนกวิชา"
                v-model="t_dep"
              >
               <template slot="selection" slot-scope="props">
                  {{ props.item.d_name }}
                </template>
                <template slot="item" slot-scope="props">
                  {{ props.item.d_name}}
                </template>
              </v-select>
            </v-flex>
            <v-flex xs4 v-for="num in 3" :key="num">
              <v-select
                prepend-icon="fas fa-th"
                :items="filter_group"
                item-value="g_code"
                :label="label_group+' '+num"
                placeholder="รหัสกลุ่มการเรียน"
                v-model="mst_1[num]"
              >
               <template slot="selection" slot-scope="props">
                  {{ props.item.g_name }}
                </template>
                <template slot="item" slot-scope="props">
                  {{ props.item.g_name}}
                </template>
              </v-select>
            </v-flex>

          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-btn flat color="red lighten-2" @click="teacher()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2" @click="teacher_add()"><i class="fas fa-save fa-2x"></i></v-btn>
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
              label_group:"กลุ่มการเรียนที่",
              t_code:"",
              t_name:"",
              t_dep:"",
              t_tel:"",

              mst_1: [],
              mst_2: null ||'กลุ่มการเรียนที่2',
              mst_3: null ||"กลุ่มการเรียนที่3",
              department:[],

              type_api:"",
              danger:false,
              loading: false,
              items: [],
              sh_gro1: null,
              sh_gro2: null,
              sh_gro3: null,
              group: [],
              rules: {
                required: value => !!value || 'ห้ามว่าง.',
                // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
              },
              img:[],
              load_status:0,
          
          }
    
        },
        computed:{
          filter_group(){
            return this.group.filter(x=>''+x.d_code===this.t_dep)
          }
        },
        watch: {
          // async t_dep(newValue){
          //   let res=await this.$http.post('/group/cus_select',{t_dep:newValue})
          //   // console.log(res.data.datas)
          //   this.group=res.data.datas
          // },

          //  std_prename(newValue){
          //   if(newValue=="นาย"){this.std_gender="ช"}else{this.std_gender="ญ"}
          // },
        },
        async created(){
          let res=await this.$http.get('/group/list')
          this.group=res.data.datas
          let res2=await this.$http.get('/department/list')
          this.department=res2.data.datas
        },
        methods: {

          async teacher_add(){
            if(this.t_code!='' && this.t_name!='' && this.t_dep!='' && this.t_tel!='' ){
                const formData = new FormData()
                formData.append('img',this.$refs.img.files[0])

                formData.append('t_code',this.t_code)
                formData.append('t_name',this.t_name)
                formData.append('t_dep',this.t_dep)
                formData.append('t_tel',this.t_tel)
                formData.append('mst_1',this.mst_1)
                formData.append('u_id',sessionStorage.getItem("username"))
                formData.append('u_table',"pk_teacher")

              let res=await this.$http.post("teacher/teacher_add",formData,{
                onUploadProgress: uploadEvent => {
                  this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
                }
              })
              if(res.data.ok==true){this.load_status=0,
                // this.$router.push({name:"manage-teacher"}),
                this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
              }
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
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