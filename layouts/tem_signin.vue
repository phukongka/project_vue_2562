<template>

  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
          <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
           </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
            >
              <v-list-tile-action v-if="child.icon" >
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
           <v-divider
            v-else-if="item.divider"
            :key="item.divider"
            dark
            class="my-3"
          ></v-divider>
          <v-list-tile v-else :key="item.text" :to="item.link">
            <v-list-tile-action v-if="!item.avatar">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-avatar v-if="item.avatar">
                  <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>

                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </template>
      </v-list>
       <v-divider></v-divider>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3" @click="home()">
        <v-toolbar-side-icon><img :src="require('@/static/image/new_logo_white.png')" class="icon_login" style="width:120%"></v-toolbar-side-icon>
        <span class="">CTC Vehicle</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-divider
        class="mx-3"
        inset
        vertical
      ></v-divider>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

    </v-toolbar>
    <v-content style="background-color:#cccccc">
      <v-container  xs12 >

            <nuxt/>
 
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    
    data: () => ({
      username:sessionStorage.getItem("username"),
      status:sessionStorage.getItem("status"),
      txt_search:"",
      page_search:"",
      num_noti:'10',
      dialog: false,
      drawer: null,
      items: [
      { heading: 'ผู้ใช้งาน' },
      { avatar:"/files/img/users/veh-u-default.jpg" ,text:sessionStorage.getItem("a_name")+' '+ sessionStorage.getItem("a_lname")  ,link: '../../manage/profile'},

      { divider: true },
      { icon: 'fas fa-home', text: 'หน้าแรก' ,link: '../../manage/home'}, 
      { icon: 'fas fa-clipboard', text: 'รายงาน' ,link: '../../manage/dashboard'},
      { icon: 'fas fa-book-open', text: 'การแจ้งหาย' ,link: '../../manage/missing'},
      { icon: 'fas fa-book-open', text: 'ข้อมูลผิดระเบียบ' ,link: '../../manage/object_control'},
      { icon: 'fas fa-sliders-h', text: 'ระบบ' ,link: '../../manage/system_ctrl'},
      { divider: true },
       { heading: 'จัดการข้อมูล' },
        { icon: 'fas fa-user-graduate', text: 'นักเรียน / นักศึกษา' ,link: '../../manage/student'},
        { icon: 'fas fa-chalkboard-teacher', text: 'ครู / บุคลากร' ,link: '../../manage/teacher'},
        { icon: 'fas fa-place-of-worship', text: 'แผนกวิชา' ,link: '../../manage/department'},
        { icon: 'fas fa-users', text: 'กลุ่มการเรียน' ,link: '../../manage/group'},
        { icon: 'fas fa-motorcycle', text: 'ยานพาหนะ' ,link: '../../manage/machines'},
        { icon: 'fas fa-wrench', text: 'อุปกรณ์เสริม' ,link: '../../manage/accessories'},
        
        // { divider: true },
        // { heading: 'การทำงาน' },
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'fas fa-book',
        //   text: 'บันทึกการทำงาน',
        //   model: false,
        //   children: [
        //     { icon:'fas fa-user-graduate' ,text: 'นักเรียน / นักศึกษา' ,link: '/manage/student_log/student_log'},
        //     { icon:'fas fa-chalkboard-teacher' ,text: 'ครู / บุคลากร' ,link: '/manage/teacher_log/teacher_log'},
        //     { icon:'fas fa-place-of-worship' ,text: 'แผนกวิชา' ,link: '/manage/department_log/log_department'},
        //     { icon:'fas fa-users', text: 'กลุ่มการเรียน' ,link: '/manage/group_log/group_log'},
        //     { icon:'fas fa-motorcycle' ,text: 'ยานพาหนะ' ,link: '/manage/machine_log/machine_log'},
        //     { icon:'fas fa-wrench' ,text: 'อุปกรณ์เสริม' ,link: '/manage/accessories_log/accessories_log'},
        //   ]
        // },
        { divider: true },
        { 
         icon: 'keyboard_arrow_up',
          'icon-alt': 'settings',
          text: 'ตั้งค่า', 
         model: false,
          children: [
            { icon:'fas fa-user-shield' ,text: 'ความปลอดภัย' ,link: '../../manage/security/security'},
       
          ]},
        // { icon: 'help', text: 'ช่วยเหลือ' },
        { icon: 'fas fa-sign-out-alt', text: 'ออกจากระบบ' ,link:"../../logout"},
        
      ],
      id:"",
    }),
    props: {
      source: String
    },
    created(){
       this.set_session()
    },
    beforeCreate() {
      if (!sessionStorage.getItem("username")|| !sessionStorage.getItem("password") || !sessionStorage.getItem("status")){
        this.$router.push({path: '/'})
      }else{

      }
      // if(sessionStorage.getItem("status")!="tch" || sessionStorage.getItem("status")!="bld" ){
      //   this.$router.push({path: '/'})
      // }
  },
  watch:{
    txt_search(val){
      this.search()
      console.log("page_search="+this.page_search)
    }
  },
   methods: {
     home(){
       this.$router.push({name:"manage-dashboard"})
     },
     set_session(){
       this.id=sessionStorage.getItem("id")
       console.log("id="+this.id)
       console.log("status="+sessionStorage.getItem("status"))
     },
     logout() {
       this.$router.push({path: 'manage'})
    },
      search(){
        console.log("txt_search="+this.txt_search)
      },
    }
  }
</script>
