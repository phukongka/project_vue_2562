<template>
  <v-app>
    <v-container>
       <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-layout
      align-center
      column
      justify-center
    >
    <v-spacer></v-spacer>
     <v-spacer></v-spacer>
      <h1 class="display-2 font-weight-thin mb-3">PERSONAL</h1>
      <h4 class="subheading">ระบบลงเวลาปฏิบัติงาน</h4>
      <h4 class="subheading">วิทยาลัยเทคนิคชัยภูมิ</h4>
    
      
       <v-content>
        <nuxt/>
      </v-content>

      <!-- ปุ่ม + เพื่อเพิ่มข้อมูลการติดต่อ -->
    <v-btn
      fab      
      color="white"      
      dark
      fixed
      @click="dialog = !dialog"
      style="margin-top:210px;"
    >
    
      <v-icon color="#22abb6">add</v-icon>
    </v-btn>

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
    </v-layout>
  </v-parallax>
     
    </v-container>
    
  </v-app>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
    })
  }
 </script>

