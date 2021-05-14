<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="100px"
      :src="getImageRoom(room.nameRoomType)"
    >
      <v-card-title>Room Type: {{ room.nameRoomType }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      Room Number: {{ room.roomNumber }}
    </v-card-subtitle>

    <v-card-text class="text--primary mt-2">
      <div>Price: {{ room.price }}$</div>

      <div>Room Status : {{ room.roomStatusMapping }}</div>
    </v-card-text>

    <v-card-actions class="flex justify-center">
      <v-btn color="blue-grey lighten-1" @click="clickEditRoom" text>
        Edit
      </v-btn>
      <v-btn color="blue-grey lighten-1" text @click="dialogRemove = true">
        Remove
      </v-btn>
    </v-card-actions>
    <v-edit-room
      :dialog="dialogEdit"
      :room="editRoom"
      :save="saveEditRoom"
      @changeDialog="dialogEdit = $event"
      @sendRoom="editRoom = $event"
    ></v-edit-room>
    <v-confirm :dialog="dialogRemove" :remove="saveRemoveRoom"></v-confirm>
    <v-loading :loading="dialogLoading"></v-loading>
  </v-card>
</template>

<script>
import VEditRoom from "./vEditRoom";
import { mapActions, mapState } from "vuex";
import VLoading from "../../../components/vLoading";
import VConfirm from "../../../components/vConfirm";

export default {
  name: "vCardRoom",
  components: { VConfirm, VLoading, VEditRoom },
  props: {
    room: Object,
  },
  data: () => ({
    dialogEdit: false,
    dialogRemove: false,
    dialogLoading: false,
    editRoom: {
      roomNumber: "",
      roomStatus: "",
      roomTypeId: "",
    },
    defaultEditRoom: {
      roomNumber: "",
      roomStatus: "",
      roomTypeId: "",
    },
  }),
  computed: {
    ...mapState("roomType", ["roomType"]),
  },
  methods: {
    ...mapActions("rooms", ["getRoomById", "editRoomSelect", "removeRoom"]),
    clickEditRoom() {
      this.dialogLoading = true;
      this.getRoomById(this.room.id)
        .then((res) => {
          delete res.room.id;
          this.editRoom = res.room;
          this.dialogEdit = true;
        })
        .finally(() => {
          this.dialogLoading = false;
        });
    },
    saveEditRoom() {
      this.dialogLoading = true;
      const { roomNumber, roomStatus, roomTypeId, notes } = this.editRoom;
      const roomTypeSelected = this.roomType.find((el) => el.id === roomTypeId);
      const { amountPeople, name, price, surchargeRate } = roomTypeSelected;
      const data = {
        id: this.room.id,
        data: {
          roomNumber,
          roomStatus,
          roomTypeId,
          notes,
          amountPeople,
          nameRoomType: name,
          price,
          surchargeRate,
        },
      };
      this.editRoomSelect(data)
        .then(() => {
          this.dialogEdit = false;
          this.$toast.success("Edit room successfully");
          this.editRoom = Object.assign({}, this.defaultEditRoom);
        })
        .catch((err) => {
          this.$toast.error(err.data.message);
        })
        .finally(() => {
          this.dialogLoading = false;
        });
    },
    saveRemoveRoom() {
      this.dialogLoading = true;
      this.removeRoom(this.room.id)
        .then(() => {
          this.$toast.success("Remove room successfully");
        })
        .catch((err) => {
          this.$toast.error(err.data.message);
        })
        .finally(() => {
          this.dialogLoading = false;
          this.dialogRemove = false;
        });
    },
    getImageRoom(type) {
      if (type == "Vip") {
        return require(`@/assets/room_vip.jpg`);
      } else if (type == "Normal") {
        return require(`@/assets/room_dexule.jpg`);
      } else {
        return require(`@/assets/room_family.jpg`);
      }
    },
  },
};
</script>

<style scoped></style>
