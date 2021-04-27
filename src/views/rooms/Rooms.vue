<template>
  <v-container fluid>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="4">
        <v-combobox
          v-model="roomTypeSelect"
          :items="listRoomType"
          label="Room Type"
          item-text="name"
          item-value="id"
          chips
        >
        </v-combobox>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="4">
        <v-combobox
          v-model="roomStatusSelect"
          :items="listRoomStatus"
          label="Room Type"
          item-text="value"
          item-value="id"
          chips
        ></v-combobox>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <div class="d-flex justify-space-between mx-8">
      <div class="header">
        <h2>Rooms</h2>
      </div>
      <v-btn @click="dialogAdd = true" raised rounded>
        <v-icon left> mdi-plus </v-icon>
        Add Room
      </v-btn>
    </div>
    <div class="mt-2 rooms">
      <v-row class="pa-6">
        <v-col v-for="room in listRoom" :key="room.id" cols="4">
          <card-room :room="room"></card-room>
        </v-col>
      </v-row>
    </div>
    <v-add-room
      :dialog="dialogAdd"
      :room="newRoom"
      :save="saveAddRoom"
      @changeDialog="dialogAdd = $event"
      @sendRoom="newRoom = $event"
    ></v-add-room>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import constants from "@/constants";
import mapping from "@/constants/mapping.js";
import CardRoom from "./component/vCardRoom";
import VAddRoom from "./component/vAddRoom";
const { ROOM_STATUS_MAPPING } = mapping;

export default {
  name: "manageRooms",
  components: { VAddRoom, CardRoom },
  data: () => ({
    listRoom: [],
    listRoomType: [],
    listRoomStatus: [],
    dialogAdd: false,
    valid: true,
    newRoom: {
      roomNumber: null,
      roomStatus: null,
      roomTypeId: null,
      notes: null,
    },
    defaultNewRoom: {
      roomNumber: null,
      roomStatus: null,
      roomTypeId: null,
      notes: null,
    },
    roomTypeSelect: null,
    roomStatusSelect: null,
  }),
  async created() {
    // get api
    await this.getAllRooms();
    await this.getAllRoomType();
    // get list Room Status
    for (const [value, id] of Object.entries(constants.ROOM_STATUS)) {
      if (!id || !value) {
        continue;
      }
      this.listRoomStatus.push({ id, value: ROOM_STATUS_MAPPING[id] });
    }
    // set data
    this.listRoomType = this.$store.state.roomType.roomType;
    this.listRoom = this.rooms;
    this.listRoom = this.listRoom.map((el) => {
      el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
      return el;
    });
  },
  watch: {},
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapGetters("rooms", ["getByRomStatus"]),
  },
  methods: {
    ...mapActions("rooms", ["getAllRooms", "addRoom", "removeRoom"]),
    ...mapActions("roomType", ["getAllRoomType"]),
    saveAddRoom() {},
  },
};
</script>

<style scoped lang="scss">
.rooms {
  border: 1px solid #9e9e9ea3;
  border-radius: 22px;
}
</style>
