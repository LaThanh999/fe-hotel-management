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
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          <span>{{ user.email }}</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn @click="clickLogOut" text>
            <v-icon class="mr-2">mdi-logout</v-icon>
            Log Out
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "vNavBar",
  data: () => ({
    user: {},
  }),
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions("auths", ["logout"]),
    clickLogOut() {
      this.logout();
      this.$router.push("/login");
    },
    getUserInfo() {
      const data = localStorage.getItem("userInfo");
      this.user = JSON.parse(data);
    },
  },
};
</script>

<style scoped></style>
