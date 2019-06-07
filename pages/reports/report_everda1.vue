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
        <td>{{ item.person_id }}</td>
        <td class="text-xs-right">{{ item.work_id }}</td>
        <td class="text-xs-right">{{ item.fat }}</td>
        <td class="text-xs-right">{{ item.carbs }}</td>
        <td class="text-xs-right">{{ item.protein }}</td>
        <td class="text-xs-right">{{ item.iron }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
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
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
    };
  },
  created() {
    this.showList();
    // this.addNewStudent({ code: "111", name: "" });
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
      this.desserts = data.user;
    }
    // addNewStudent({ code, name }) {
    //   if (code) {
    //   }
    // }
  }
};
</script>

