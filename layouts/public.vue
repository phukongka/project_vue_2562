<template>

  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
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
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="cyan"
      dark
      app
      fixed
    >
      <v-toolbar-title  style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Google Contacts</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    
    <!-- ส่วนเนื้อหา -->
    <v-content>
         <nuxt/>
    </v-content>

    <!-- ปุ่ม + เพื่อเพิ่มข้อมูลการติดต่อ -->
    <!-- <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn> -->

    <!-- Create form create contact -->
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      
    <v-footer color="cyan" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', text: 'ข้อมูลทั่วไป' },
        { icon: 'history', text: 'เวลาปฏิบัติงาน' },
        { icon: 'content_copy', text: 'กิจกรรมพิเศษ' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'ข้อมูลข่าวสาร',
          model: true,
          children: [
            { icon: 'add', text: 'เพิ่มข้อมูล' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'แผนกวิชา',
          model: false,
          children: [
            { text: 'ช่างยนต์' },
            { text: 'ช่างกล' },
            { text: 'ช่างเชื่อม' },
            { text: 'อิเล็กทรอนิกส์' },
            { text: 'ไฟฟ้า' },
            { text: 'ก่อสร้าง' },
            { text: 'โยธา' },
            { text: 'สถาปัตยกรรม' },
            { text: 'เทคนิคพื้นฐาน' },
            { text: 'เทคโนโลยีสารสนเทศ' },
            { text: 'บัญชี' },
            { text: 'คอมพิวเตอร์' },
            { text: 'การตลาด' },
            { text: 'เลขานุการ' },
            { text: 'สามัญ-สำพันธ์' }
          ]
        },
        { icon: 'settings', text: 'ตั้งค่า' },       
        { icon: 'phonelink', text: 'ติดต่อเรา' },
        { icon: 'fas fa-sign-out-alt', text: 'ออกจากระบบ' ,link:"./logout"},
        
      ]
    }
    },
    props: {
      source: String
    },
    created() {
    let user = window.sessionStorage.getItem("user"); // data is string
    console.log('user',user)
    if (!user) {
      return this.$router.replace("/");
    }
    //this.$store.dispatch("/home");
    this.user = JSON.parse(user); // แปลงกลับเป็น object ถ้า
    // เก็บใส่ store ไม่ต้องเขียนแบบนี้ทุกหน้า
    this.$router.replace("/signin");
  }, // created
   methods: {
      
   }
  };
</script>