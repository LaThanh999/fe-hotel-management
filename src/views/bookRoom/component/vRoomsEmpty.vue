<template>
  <div v-if="rooms.length > 0" class="mt-2 rooms">
    <v-row class="pa-6">
      <v-col cols="12" sm="12" class="text-center mb-4">
        <h1>Choose Room</h1>
      </v-col>
      <v-col v-for="room in rooms" :key="room.id" cols="4">
        <v-card-room-empty
          :dataBookRoom="dataBookRoom"
          :checkIsCustomer="checkIsCustomer"
          :room="room"
          @sendDataInput="dataInput = $event"
        ></v-card-room-empty>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VCardRoomEmpty from "./vCardRoomEmpty";
export default {
  name: "vRoomsEmpty",
  components: { VCardRoomEmpty },
  props: {
    rooms: Array,
    checkIsCustomer: Boolean,
    dataBookRoom: Object,
  },
  data: () => ({
    dataInput: {},
  }),
  watch: {
    dataInput(value) {
      this.$emit("sendDataInput", value);
    },
  },
};
</script>

<style scoped></style>
