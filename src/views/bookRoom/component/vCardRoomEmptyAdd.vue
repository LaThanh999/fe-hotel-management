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
      <v-btn color="blue-grey lighten-1" @click="checkConfirm = true" text>
        Book Room
      </v-btn>
    </v-card-actions>
    <v-confirm
      :dialog="checkConfirm"
      @changeDialogConfirm="checkConfirm = $event"
      :remove="bookRoom"
    ></v-confirm>
    <v-loading :loading="checkLoading"></v-loading>
  </v-card>
</template>

<script>
import VConfirm from "../../../components/vConfirm";
import { mapActions } from "vuex";
import VLoading from "../../../components/vLoading";
export default {
  name: "vCardRoomEmptyAdd",
  components: { VLoading, VConfirm },
  props: {
    room: Object,
    data: Object,
    checkValidation: Function,
  },
  data: () => ({
    checkConfirm: false,
    checkLoading: false,
  }),
  methods: {
    ...mapActions("book", ["bookRoomByNewCustomer"]),
    ...mapActions("rooms", ["getAllRooms"]),
    getImageRoom(type) {
      if (type == "Vip") {
        return require(`@/assets/room_vip.jpg`);
      } else if (type == "Normal") {
        return require(`@/assets/room_dexule.jpg`);
      } else {
        return require(`@/assets/room_family.jpg`);
      }
    },
    bookRoom() {
      if (this.checkValidation()) {
        this.checkLoading = true;
        const input = {
          ...this.data,
          roomId: this.room.id,
        };
        this.bookRoomByNewCustomer(input)
          .then(() => {
            this.$toast.success("Book Room Successfully");
            this.getAllRooms();
            this.$emit("checkBookRoom", true);
          })
          .catch((err) => {
            this.$toast.error(err.data.message);
          })
          .finally(() => {
            this.checkLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>
