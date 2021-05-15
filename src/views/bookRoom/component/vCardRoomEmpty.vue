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
      <v-btn @click="clickBookRoom" color="blue-grey lighten-1" text>
        Book Room
      </v-btn>
    </v-card-actions>
    <v-form-book-room
      :dialog="dialogShowFormBook"
      :dataBookRoom="dataBookRoom"
      @changeDialog="dialogShowFormBook = $event"
      @sendDataInput="dataInput = $event"
    ></v-form-book-room>
  </v-card>
</template>

<script>
import VFormBookRoom from "./vFormBookRoom";

export default {
  name: "vCardRoomEmpty",
  components: { VFormBookRoom },
  props: {
    room: Object,
    checkIsCustomer: Boolean,
    dataBookRoom: Object,
  },
  data: () => ({
    dialogShowFormBook: false,
    dataInput: {},
  }),
  watch: {
    dataInput(value) {
      value.roomId = this.room.id;
      this.$emit("sendDataInput", value);
    },
  },
  methods: {
    getImageRoom(type) {
      if (type == "Vip") {
        return require(`@/assets/room_vip.jpg`);
      } else if (type == "Normal") {
        return require(`@/assets/room_dexule.jpg`);
      } else {
        return require(`@/assets/room_family.jpg`);
      }
    },
    clickBookRoom() {
      if (!this.checkIsCustomer) {
        this.$toast.error("Please input identity card");
      } else {
        this.dialogShowFormBook = true;
      }
    },
  },
};
</script>

<style scoped></style>
