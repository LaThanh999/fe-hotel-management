<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6 box-header">
      <span class="title-page mb-4">USER</span>
    </v-card-title>
    <v-row>
      <v-col cols="8" offset="2">
        <v-data-table
          :headers="headers"
          :items="data"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-confirm
                :dialog="dialogConfirmRemove"
                remove="saveRemove"
                @changeDialogConfirm="dialogConfirmRemove = $event"
              ></v-confirm>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-loading :loading="true"></v-loading>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-loading :loading="dialogLoading"></v-loading>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import mapping from "@/constants/mapping.js";
import VLoading from "../../components/vLoading";
import VConfirm from "../../components/vConfirm";
const { ROLE_MAPPING } = mapping;

export default {
  name: "users",
  components: { VConfirm, VLoading },
  data: () => ({
    headers: [
      { text: "Email", value: "email" },
      { text: "Role", value: "roleFormat" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    data: [],
    dialogLoading: false,
    dialogConfirmRemove: false,
    idRemove: null,
  }),
  mounted() {
    this.getAllUsers();
  },
  watch: {
    users() {
      this.data = this.getUserByRole(1).map((el) => {
        el.roleFormat = ROLE_MAPPING[el.role];
        return el;
      });
    },
  },
  computed: {
    ...mapState("users", ["users"]),
    ...mapGetters("users", ["getUserByRole"]),
  },
  methods: {
    ...mapActions("users", ["getAllUsers", "removeUser"]),
    deleteItem(data) {
      this.dialogConfirmRemove = true;
      this.idRemove = data.id;
    },
    saveRemove() {
      if (this.idRemove) {
        this.dialogLoading = true;
        this.removeUser(this.idRemove)
          .then(() => {
            this.$toast.success("Remove user successfully");
          })
          .catch((err) => {
            this.$toast.error(err.data.message);
          })
          .finally(() => {
            this.dialogConfirmRemove = false;
            this.dialogLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>
