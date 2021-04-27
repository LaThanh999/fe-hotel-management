<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="100px"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
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
      <v-btn color="blue-grey lighten-1" text> Edit </v-btn>
      <v-btn color="blue-grey lighten-1" text> Remove </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "vCardRoom",
  props: {
    room: Object,
  },
};
</script>

<style scoped></style>
