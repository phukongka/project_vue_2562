<template>
  <div><v-card>
    <div class="cv_header padding-top-mn" >ข้อมูลครู / บุคลากร
      <v-btn
        color="green lighten-2"
        dark
        small
        fab
        @click="teacher_add()"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </div>
    <div class="cv_header padding-top-mn"> 
      <v-text-field
              label="ค้นหาข้อมูลครู / บุคลากร"
              append-icon="search"
              v-model="txt_search"
            ></v-text-field>
    </div>
   
    <v-spacer></v-spacer>
  <v-data-table
      :headers="headers"
      :items="teacher"
      :search="search"
      :pagination.sync="pagination"
      :loading=state
      prev-icon="fas fa-chevron-circle-left"
      next-icon="fas fa-chevron-circle-right"
      sort-icon="mdi-menu-down"
      rows-per-page-text="แสดง"
      :rows-per-page-items=rows_per_page
    >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <tr v-on:click="list_teacher(props.item.t_id)">
        <td class="text-xs-left">{{ props.item.t_code }}</td>
        <td class="text-xs-left">{{ props.item.t_name }}</td>
        <td class="text-xs-left">{{ props.item.t_dep }}</td>
        <!-- <td class="text-xs-left">{{ props.item.t_tel }}</td> -->
      </tr>
    </template>
     <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          ไม่พบข้อมูล :(
        </v-alert>
      </template>
  </v-data-table>
  </v-card>
  </div>
</template>

<script>
  export default {
    layout: 'teacher',
    data () {
      return {
        txt_search:"",
        state:false,
        search: '',
        pagination: {},
        selected: [],
        rows_per_page:[10,20,{"text":"แสดงทั้งหมด","value":-1}],//////////////////////////   teach me pleas!
        headers: [
          { text: 'รหัสประจำตัว', value: 'รหัสประจำตัวครู / บุคลากร',align: 'left',sortable: false, },
          { text: 'ชื่อ', value: 'ชื่อ',align: 'left',sortable: false,  },
          { text: 'แผนกวิชา', value: 'แผนกวิชา',align: 'left',sortable: false,  },
          // { text: 'เบอร์โทรศัพท์', value: 'เบอร์โทรศัพท์',align: 'left',sortable: false,  },
        ],
        teacher: []
      }
    },
    watch:{ 
      async txt_search(newValue){
        let s=newValue
        this.state=true
        let res=await this.$http.post('/teacher/search',{
          txt_search:s
        })
        // console.log(res.data)
        this.teacher=res.data.datas
        this.state=false
      }
    },
    async created(){
      this.state=true
     let res=await this.$http.get('/teacher/list')
    //  console.log(res.data.teacher)
     this.teacher=res.data.datas
     this.state=false
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods:{
      list_teacher(t_id){
        this.$router.push({path: '../manage/teacher/edit_teacher?t_id='+t_id})
      },
      teacher_add(){
        this.$router.push({path:"../manage/teacher/add_teacher"})
      }
    }
  }
</script>