<template>
    <div>
        <div>
       <h1>Human  Power</h1>
       <div>
           <label class="required">สาขา</label>
           <select v-model="form.majorId"  required>
              <option :value="0">--เลือก--</option>
             <option v-for ="m in majorList" :key="m.id" :value="m.id">{{m.name}}</option>
           </select>
           <div>
        <v-select
          :items="majorList"
          v-model="form.majorId"
          label="สาขา"
          class="input-group--focused"
          item-text="major_name"
          item-value="major_code"
        >
        </v-select>
           </div>
       </div>
        <div>
    
  </div>
       <div>
           <label>จำนวนที่ต้องการ</label>
       </div>
       <div>
           <label> เพศชาย {{form.male}} คน </label>
       </div>
       <div>
          <v-slider
          v-model="form.male"
          :thumb-size="24"
          :step = "1"
          :min="0"
          :max="100"
          :label="`เพศชาย (${form.male})`"
          thumb-label="always"
        ></v-slider>
       </div>
       <div>
       <label>เพศชาย</label>
       <input type="number" v-model.number="form.male" min="0">
       </div>
        <div>
        <label>หญิง</label>
       <input type="number" v-model.number="form.female" min="0">
       </div>
        <label>ไม่ระบุเพศ</label>
       <input type="number" v-model.number="form.common" min="0">
       </div>
       <div>
       <label>เริ่ม</label>
       <input type="date" v-model="form.reqStart">
       </div>
       <div>
       <label>หมายเหตุ</label>
       <textarea v-model="form.spacialCondition" placeholder="กรุณากรอกรายละเอียดเพิ่มเตืม" cols="30" rows="3"></textarea>
       </div>
       <div>
       <v-btn  color="success" @click="doSave" :disabled="!isValid">SAVE</v-btn>
              </div>
    </div>
</template>
<script>
 
export default {
    data() {
        return {
        form: {
            req_id: '',
            express: '',
            busineesId: '',
            majorId: '',
            occ_code: '',
            level: '',
            male: '',
            femal: '',
            common: '',
            orgDate: '',
            reqDate:'',
            changeReq: '',
            reqStart: '',
            reqEnd: '',
            ageRage: '',
            spacialCondition: '',
          },
          majorList: [
              {id: 1,name: 'major1'},
              {id: 2,name: 'major2'},
              {id: 3, name: 'major3'}
            ],
        }  
       }, //data
       computed: {
        isValid() {
         return this.form.majorId && (this.form.male || this.form.femal || this.form.common )
        }
       },
       created() { // Lifecycle  ของ Vue ทำงานต้องเรียงลพดับให้ดี ถัดจาก computed ควรเป็น lifecycle
        // library ยิง request มีหลายตัว  เช่น vue-resource  vue ตัวแปรไม่ควรตั้งขึ้นต้น ด้วย $  promise base
        // ที่แนะนำ คือ axios ไว้ยิง request  // promise base  เป็น thirth party ต้องทำ plugin ขึ้นมา 
        // จะนำมาใช้ตรงๆไม่ได้ จะทำให้หน้านั้นมีขนาดใหญ่
        // Library ชื่อ request  //  callback
       this.$http.get('http://localhost:9000/req/major').then(res =>  {
           //if (res.data.a == 1 ){  // ข้อมูลอยู่ใน data ตัวแปรหลัก  เปลี่่ยนชื่อไม่ได้ ข้อมูล get มาจาก server .data ข้อมูลส่งมาจาก server
              // {"a": 1, "b": 2}
            if (res.data.data ){  // ข้อมูลอยู่ใน data ตัวแปรหลัก  เปลี่่ยนชื่อไม่ได้ ข้อมูล get มาจาก server .data ข้อมูลส่งมาจาก server
            //  let arr = []
            //  แบบที่ 1 for(let i =0 ; i < res.data.data.length; i++){
            //      // arr.push({id: res.data.data[i].major_code, name:  res.data.data[i].major_code +'  '+res.data.data[i].major_name})
               
            //   }
          //    this.majorList = arr
            //   this.majorList = res.data.data.map( x =>{
            //       return {
            //           id: x.major_code,
            //           name: x.major_name,
            //       }
            //   })
            //เขียนนย่อ
            // แบบที่ 2   
            this.majorList = res.data.data.map( x =>({major_code: x.major_code, major_name: x.major_code +'  '+ x.major_name}))
            // แบบที่ 3 เปลี่ยนตัวแปรที่ v-selece ให้ตรงกับที่ server ส่งมา
            //this.majorList = res.data.data
          }
            
        })
             // ข้อมูลฝั่ง server ที่ ส่งมา echo json_encode(array('a' => 1, 'b' => 2))  
       },
       methods: {
           doSave() {
               console.log(JSON.parse(JSON.stringify(this.form)))
               // TODO: check
               // Content-type: x-www-

               // name=...&major_id=1& =>body เป็น RAW urlencoded
               // Content-type: text/json
               //
               //{'major_id':1, "male":5,....} => ojject
               //this.$http.post('http://localhost:3000/#/req/human', (this.form) //{ เราไม่ต้องแจกแจง} ส่งแบบนี้โครงสร้างซับซ้อนได้
               this.$http.post('http://localhost:9000/req/manpower', (this.form) //{ เราไม่ต้องแจกแจง} ส่งแบบนี้โครงสร้างซับซ้อนได้
                // ฝั่งรับ res.body 
                //  ทีละค่า เช่น major_id: this.major_id
                 //    major_id: 1,
                //    male: 5,
                //    female: 10,
                //    list: '',
                 //  list: ["xxxx", "yyyy",{id: 1,y: []}]
               ).then(res => {
                   if(!res.data.status){
                       // TODO: Show error
                       return
                   }
                     // TODO: Show success
               })
           },// doSave
       }, // methodes
    }
</script>
<style>
 .required::after{
     content: '*';
     color: red; 
 }
</style>
