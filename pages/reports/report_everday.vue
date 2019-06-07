<template>
  <div>
    <h1>รายงานลงเวลาปฏิบัติงานประจำวัน</h1>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      sort-icon="mdi-menu-down"
    >
      <template v-slot:items="{ item }">
        <td>{{ item.teacher_name }}</td>
        <td class="text-xs-right">{{ item.teacher_dep }}</td>
        <td class="text-xs-right">{{ item.date_in }}</td>
        <td class="text-xs-right">{{ item.date_out }}</td>
        <td class="text-xs-right">{{ item.status }}</td>
        <td class="text-xs-right">{{ item.teacher_posi1 }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import moment from "moment";
const my_moment = moment("2019-06-05 09:00:00", "YYYY-MM-DD hh:mm:ss");
// ตัวอย่างการคำนวณ หาช่วงห่างของเวลา
// const my_moment = moment("2019-06-05 09:00:00", "YYYY-MM-DD hh:mm:ss");
// console.log("diff years ::==", moment().diff(my_moment, "years"));
// console.log("diff months ::==", moment().diff(my_moment, "months"));
// console.log("diff weeks ::==", moment().diff(my_moment, "weeks"));
// console.log("diff days ::==", moment().diff(my_moment, "days"));
// console.log("diff hours ::==", moment().diff(my_moment, "hours"));
// console.log("diff minutes ::==", moment().diff(my_moment, "minutes"));
// console.log("diff seconds ::==", moment().diff(my_moment, "seconds"));
export default {
  data() {
    return {
      user: {},
      headers: [
        {
          text: "ชื่อ-สกุล",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "แผนก", value: "calories" },
        { text: "เวลาเข้า", value: "fat" },
        { text: "เวลาออก", value: "carbs" },
        { text: "สถานะ", value: "protein" },
        { text: "หมายเหตุ", value: "iron" }
      ],
      desserts: []
    };
  },
  created() {
    this.showList();
    // this.addNewStudent({ code: "111", name: "" });
    this.calTime();
  },
  methods: {
    async showList() {
      let { data } = await this.$http.post(
        "http://localhost:9000/user/listuser_day",
        this.form
      );
      if (!data.ok) {
        //  ค้นหาไม่สำเร็จ
        console.log("Search failed");
        return;
      }
      console.log("Search ok");
      this.desserts = data.user; // api ส่งมา user: rows[0]  ฝั่ง web หยิบไปใช้ได้เลย
    },
    calTime() {
      let timeLate = moment().diff(my_moment, "minutes");
      if (timeLate > 30) {
        console.log("มาสาย");
      }
    }
  } // end method
};
</script>

