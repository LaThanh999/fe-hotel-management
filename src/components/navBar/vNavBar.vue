<template>
  <v-app-bar app absolute elevate-on-scroll style="background-color: #f7f7e8">
    <v-text-field
      background-color="#CFD3CE"
      class="mx-4"
      append-icon="mdi-magnify"
      flat
      hide-details
      label="Search..."
      solo
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn @click="clickLogOut" text>
      <v-icon class="mr-2">mdi-logout</v-icon>
      Log Out
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "vNavBar",
  methods: {
    ...mapActions("auths", ["logout"]),
    clickLogOut() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped></style>
