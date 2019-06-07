<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
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
    <div class="text-xs-center pt-2">
      <v-btn color="primary" @click="toggleOrder">Toggle sort order</v-btn>
      <v-btn color="primary" @click="nextSort">Sort next column</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pagination: {
        sortBy: "fat"
      },
      selected: [],
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
  },
  methods: {
    toggleOrder() {
      this.pagination.descending = !this.pagination.descending;
    },
    nextSort() {
      let index = this.headers.findIndex(
        h => h.value === this.pagination.sortBy
      );
      index = (index + 1) % this.headers.length;
      index = index === 0 ? index + 1 : index;
      this.pagination.sortBy = this.headers[index].value;
    },
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
  } // end method
  // addNewStudent({ code, name }) {
  //   if (code) {
  //   }
  // }
};
</script>

