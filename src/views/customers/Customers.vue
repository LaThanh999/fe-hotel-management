<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Customers</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Customers",
  components: {},
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Phone Number", value: "phoneNumber" },
      { text: "Identity Card", value: "identityCard" },
      { text: "Notes", value: "notes" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("customers", ["customers"]),
  },
  mounted() {
    this.getAllCustomer();
  },
  methods: {
    ...mapActions("customers", ["getAllCustomer"]),
  },
};
</script>

<style scoped></style>
