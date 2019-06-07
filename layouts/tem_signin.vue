<template>
  <v-app>
    <v-toolbar app right>
      <v-toolbar-title>Welcome {{user.name}}</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      drawer: true
    };
  },
  created() {
    let user = window.sessionStorage.getItem("user"); // data is string
    if (!user) {
      return this.$router.replace("/login");
    }
    //this.$store.dispatch("/home");
    this.user = JSON.parse(user); // แปลงกลับเป็น object ถ้า
    // เก็บใส่ store ไม่ต้องเขียนแบบนี้ทุกหน้า
    this.$router.replace("/home");
  } // created
};
</script>