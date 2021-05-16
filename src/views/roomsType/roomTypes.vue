<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6 box-header">
      <span class="title-page mb-4">ROOM TYPE</span>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="roomType"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Room Types</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog-room-type
            :title="title"
            :dialog="dialogAddEdit"
            :roomType="itemEdit"
            @changeDialog="dialogAddEdit = $event"
            :save="saveAddEditRoomType"
            @sendRoomType="itemResult = $event"
          ></v-dialog-room-type>
        </v-toolbar>
        <v-confirm
          :dialog.sync="dialogConfirm"
          @changeDialogConfirm="dialogConfirm = $event"
          :remove="saveRemoveRoomType"
        ></v-confirm>
        <v-loading :loading="checkLoading"></v-loading>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="clickEditRoomType(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="clickRemoveRoomType(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-loading :loading="true"></v-loading>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VDialogRoomType from "./components/vDialogRoomType";
import VLoading from "../../components/vLoading";
import VConfirm from "../../components/vConfirm";

export default {
  name: "roomTypes",
  components: { VConfirm, VLoading, VDialogRoomType },
  data: () => ({
    title: "Add Room Type",
    headers: [
      { text: "Name", value: "name" },
      { text: "Price", value: "price" },
      { text: "Amount People", value: "amountPeople" },
      { text: "Surcharge Rate", value: "surchargeRate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dialogAddEdit: false,
    dialogConfirm: false,
    itemRemove: {},
    itemEdit: {
      amountPeople: null,
      name: "",
      price: null,
      surchargeRate: null,
    },
    itemResult: {
      mountPeople: null,
      name: "",
      price: null,
      surchargeRate: null,
    },
    defaultItem: {
      mountPeople: null,
      name: "",
      price: null,
      surchargeRate: null,
    },
    checkEdit: false,
    idEdit: null,
    checkLoading: false,
    roomTypeUse: [],
  }),
  computed: {
    ...mapState("roomType", ["roomType"]),
    ...mapState("rooms", ["rooms"]),
  },

  watch: {
    dialogAddEdit(value) {
      if (!value) {
        this.title = "Add Room Type";
        this.itemEdit = Object.assign({}, this.defaultItem);
      }
    },
    rooms(val) {
      val.map((el) => {
        if (this.roomTypeUse.indexOf(el.roomTypeId) < 0) {
          this.roomTypeUse.push(el.roomTypeId);
        }
      });
    },
  },

  async created() {
    this.checkLoading = true;
    await this.getAllRoomType();
    await this.getAllRooms();
    this.checkLoading = false;
  },

  methods: {
    ...mapActions("roomType", [
      "getAllRoomType",
      "removeRoomType",
      "getRoomTypeById",
      "editRoomType",
      "addRoomType",
    ]),
    ...mapActions("rooms", ["getAllRooms"]),
    clickRemoveRoomType(data) {
      this.dialogConfirm = true;
      this.itemRemove = data;
    },
    saveRemoveRoomType() {
      if (this.roomTypeUse.indexOf(this.itemRemove.id) >= 0) {
        this.$toast.error("Can not remove room type is using");
        this.dialogConfirm = false;
      } else {
        const data = this.itemRemove;
        this.checkLoading = true;
        this.removeRoomType(data.id)
          .then(() => {
            this.$toast.success("Remove room type successfully");
          })
          .catch((err) => {
            this.$toast.error(err.data.message);
          })
          .finally(() => {
            this.dialogConfirm = false;
            this.checkLoading = false;
          });
      }
    },
    clickEditRoomType(data) {
      this.title = "Edit Room Type";
      this.idEdit = data.id;
      this.getRoomTypeById(this.idEdit).then((res) => {
        this.itemEdit = res.roomType;
        this.dialogAddEdit = true;
      });
    },
    saveAddEditRoomType() {
      this.checkLoading = true;
      const { name, price, amountPeople, surchargeRate } = this.itemResult;
      if (!this.idEdit) {
        this.addRoomType({
          nameRoomType: name,
          priceRoom: price,
          amountPeople,
          surchargeRate,
        })
          .then(() => {
            this.$toast.success("Add room type successfully");
            this.dialogAddEdit = false;
          })
          .catch((err) => {
            this.$toast.error(err.data.message[0]);
          })
          .finally(() => {
            this.checkLoading = false;
          });
      } else {
        const result = {
          id: this.idEdit,
          data: {
            nameRoomType: name,
            priceRoom: price,
            amountPeople: amountPeople,
            surchargeRate: surchargeRate,
          },
        };
        this.editRoomType(result)
          .then(() => {
            this.$toast.success("Edit room type successfully");
            this.dialogAddEdit = false;
          })
          .catch((err) => {
            this.$toast.error(err.data.message[0]);
          })
          .finally(() => {
            this.checkLoading = false;
            this.idEdit = null;
          });
      }
    },
    reset() {
      this.getAllRoomType();
    },
  },
};
</script>

<style lang="scss" scoped></style>
