<template>
  <div v-if="rooms.length > 0" class="mt-2 rooms">
    <v-row class="pa-6">
      <v-col cols="12" sm="12" class="text-center mb-4">
        <h1>Choose Room</h1>
      </v-col>
      <v-col v-for="room in rooms" :key="room.id" cols="4">
        <v-card-room-empty-add
          :checkValidation="checkValidation"
          :data="data"
          :room="room"
          @checkBookRoom="checkBookRoom = $event"
        ></v-card-room-empty-add>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VCardRoomEmptyAdd from "./vCardRoomEmptyAdd";
export default {
  name: "vRoomEmptyAdd",
  components: { VCardRoomEmptyAdd },
  props: {
    rooms: Array,
    data: Object,
    checkValidation: Function,
  },
  data: () => ({
    checkBookRoom: false,
  }),
  watch: {
    checkBookRoom(value) {
      if (value) {
        this.$emit("checkBookRoom", value);
      }
    },
  },
};
</script>

<style scoped></style>
