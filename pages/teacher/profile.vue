
<template>
    <v-card @keypress.enter="profile_update()">
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          แก้ไขข้อมูลส่วนตัว
          <v-spacer></v-spacer>
          <v-btn
            color="green lighten-2"
            flat
            @click="isEditing = !isEditing"
          >
            <i v-if="isEditing" class="fas fa-times fa-2x"></i>
            <i v-else class="fas fa-edit fa-2x "></i>
          </v-btn>
         
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
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  prepend-icon="fas fa-user fa-2x"
                  maxlength="50"
                  counter
                  label="ชื่อ"
                  v-model="t_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
       
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-phone-square fa-2x"
                  label="เบอร์โทรศัพท์"
                  v-model="t_tel"
                ></v-text-field>
              </v-layout>
            </v-flex>
        
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-progress-circular
            v-if="loading==true"
            v-model="loading"
            :size="25"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2" :disabled="!isEditing" @click="profile_update()"><i class="fas fa-save fa-2x"></i></v-btn>
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
            id:sessionStorage.getItem("id"),
            status:sessionStorage.getItem("status"),
            t_name:"",
            t_tel:"",

            type_api:"",
            danger:false,
            loading:false,
            isEditing:null,
            alt_txt:"",
            rules: {
              required: value => !!value || 'ห้ามว่าง.',
            },

            img:[],
            load_status:"",
            link_img:"/files/img/teachers/",
            img_id:"",
            load_status:0,
          }
        },
        async created(){
          this.sh_profile()
        },
        methods:{
            async sh_profile(){
              let res=await this.$http.post('/teacher/sh_profile/',{id:this.id})
              // console.log(res.data)
              this.t_name=res.data.datas[0].t_name
              this.t_tel=res.data.datas[0].t_tel

              this.img=this.link_img+res.data.image[0].img_img
              this.img_id=res.data.image[0].img_id
           
            },
            async profile_update(){
              this.loading=true
              const formData = new FormData()
                formData.append('img-'+this.img_id,this.$refs.img.files[0])

                formData.append('t_name',this.t_name)
                formData.append('t_tel',this.t_tel)
                formData.append('id',this.id)

              let res=await this.$http.post("/teacher/profile_update",formData,{
                  onUploadProgress: uploadEvent => {
                    this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
                  }
              })
              this.loading=false
              if(res.data.ok==true){this.sh_profile(),this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
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
         
        }
    }
</script>