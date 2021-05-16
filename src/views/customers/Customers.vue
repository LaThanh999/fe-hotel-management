<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6 box-header">
      <span class="title-page mb-4">CUSTOMERS</span>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="customers"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-add-edit-customer
            :dialog="dialogEditAdd"
            :title="title"
            :customer="customer"
            :save="saveAddEditCustomer"
            @changeDialog="dialogEditAdd = $event"
            @sendCustomer="customer = $event"
          ></v-add-edit-customer>
          <v-confirm
            :dialog.sync="dialogConfirm"
            @changeDialogConfirm="dialogConfirm = $event"
            :remove="saveRemove"
          ></v-confirm>
        </v-toolbar>
        <v-loading :loading="dialogLoading"></v-loading>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="clickEdit(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="clickRemove(item.id)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-loading :loading="true"></v-loading>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VAddEditCustomer from "./component/vAddEditCustomer";
import VLoading from "../../components/vLoading";
import VConfirm from "../../components/vConfirm";

export default {
  name: "Customers",
  components: { VConfirm, VLoading, VAddEditCustomer },
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Phone Number", value: "phoneNumber" },
      { text: "Identity Card", value: "identityCard" },
      { text: "Notes", value: "notes" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dialogEditAdd: false,
    dialogLoading: false,
    dialogConfirm: false,
    title: "Add new customer",
    customer: {
      name: "",
      phoneNumber: "",
      identityCard: "",
      notes: "",
    },
    defaultCustomer: {
      name: "",
      phoneNumber: "",
      identityCard: "",
      notes: "",
    },
    idEdit: null,
    idRemove: null,
  }),
  computed: {
    ...mapState("customers", ["customers"]),
  },
  mounted() {
    this.getAllCustomer();
  },
  watch: {
    idEdit(value) {
      if (value) {
        this.title = "Edit Customer";
      } else {
        this.title = "Add New Customer";
      }
    },
  },
  methods: {
    ...mapActions("customers", [
      "getAllCustomer",
      "addCustomer",
      "getCustomerById",
      "editCustomer",
      "removeCustomer",
    ]),
    saveAddEditCustomer() {
      this.dialogLoading = true;
      const data = {
        ...this.customer,
        type: 1,
      };
      if (!this.idEdit) {
        this.addCustomer(data)
          .then(() => {
            this.$toast.success("Add customer successfully");
            this.dialogEditAdd = false;
          })
          .catch((err) => {
            this.$toast.error(err.data.message);
          })
          .finally(() => {
            this.dialogLoading = false;
          });
      } else {
        const result = {
          id: this.idEdit,
          data,
        };
        this.editCustomer(result)
          .then(() => {
            this.$toast.success("Edit customer successfully");
            this.dialogEditAdd = false;
          })
          .catch((err) => {
            this.$toast.error(err.data.message);
          })
          .finally(() => {
            this.dialogLoading = false;
          });
      }
    },
    clickEdit(id) {
      this.dialogLoading = true;
      this.idEdit = id;
      this.getCustomerById(id)
        .then((res) => {
          this.customer = res.customer;
        })
        .catch((err) => {
          this.$toast.error(err.data.message);
        })
        .finally(() => {
          this.dialogEditAdd = true;
          this.dialogLoading = false;
        });
    },
    clickRemove(id) {
      this.idRemove = id;
      this.dialogConfirm = true;
    },
    saveRemove() {
      if (this.idRemove) {
        this.dialogLoading = true;
        this.removeCustomer(this.idRemove)
          .then(() => {
            this.$toast.success("Remove customer successfully");
          })
          .catch((err) => {
            this.$toast.error(err.data.message);
          })
          .finally(() => {
            this.dialogLoading = false;
            this.dialogConfirm = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>
