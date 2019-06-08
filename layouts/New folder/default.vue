<template>
  <v-app dark>
    <v-container>
      <v-navigation-drawer v-model="drawer" app right/>
      <v-toolbar app>
        <v-toolbar-title>Welcome {{user.name}}</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      </v-toolbar>
      <v-content>
        <nuxt/>
      </v-content>
    </v-container>
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
      user: {},
      drawer: true
    };
  },
  created() {
    let user = window.sessionStorage.getItem("user"); // data is string
    if (!user) {
     // return this.$router.replace("/login");
    }
    //this.$store.dispatch("/home");
    this.user = JSON.parse(user); // แปลงกลับเป็น object ถ้า
    // เก็บใส่ store ไม่ต้องเขียนแบบนี้ทุกหน้า
    this.$router.replace("/signin");
  } // created
};
</script>
