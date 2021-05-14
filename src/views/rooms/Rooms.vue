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
    <div v-if="listRoom.length > 0" class="mt-2 rooms">
      <v-row class="pa-6">
        <v-col v-for="room in listRoom" :key="room.id" cols="4">
          <card-room :room="room"></card-room> </v-col
        >`
      </v-row>
    </div>
    <div v-else class="mt-4">
      <v-alert prominent type="error">
        <v-row align="center">
          <v-col class="grow"> Rooms is empty. </v-col>
        </v-row>
      </v-alert>
    </div>
    <v-add-room
      :dialog="dialogAdd"
      :room="newRoom"
      :save="saveAddRoom"
      @changeDialog="dialogAdd = $event"
      @sendRoom="newRoom = $event"
    ></v-add-room>
    <v-loading :loading="dialogLoading"></v-loading>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import constants from "@/constants";
import mapping from "@/constants/mapping.js";
import CardRoom from "./component/vCardRoom";
import VAddRoom from "./component/vAddRoom";
import VLoading from "../../components/vLoading";
const { ROOM_STATUS_MAPPING } = mapping;

export default {
  name: "manageRooms",
  components: { VLoading, VAddRoom, CardRoom },
  data: () => ({
    listRoom: [],
    listRoomType: [],
    listRoomStatus: [],
    dialogAdd: false,
    dialogLoading: false,
    valid: true,
    newRoom: {
      roomNumber: null,
      roomTypeId: null,
      notes: null,
    },
    defaultNewRoom: {
      roomNumber: null,
      roomTypeId: null,
      notes: null,
    },
    roomTypeSelect: null,
    roomStatusSelect: null,
  }),
  async created() {
    this.dialogLoading = true;
    // get api
    await this.getAllRooms();
    await this.getAllRoomType();
    // get list Room Status
    this.listRoomStatus.push({ id: 0, value: "All" });
    for (const [value, id] of Object.entries(constants.ROOM_STATUS)) {
      if (!id || !value) {
        continue;
      }
      this.listRoomStatus.push({ id, value: ROOM_STATUS_MAPPING[id] });
    }
    // set data
    this.listRoomType = this.$store.state.roomType.roomType;
    this.listRoomType = [{ id: 0, name: "All" }, ...this.listRoomType];
    this.listRoom = this.rooms;
    this.listRoom = this.listRoom.map((el) => {
      el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
      return el;
    });
    this.dialogLoading = false;
  },
  watch: {
    rooms(value) {
      this.listRoom = value;
      this.listRoom = this.listRoom.map((el) => {
        el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
        return el;
      });
    },
    roomTypeSelect(val) {
      this.listRoom = this.getByRoomType(val.id);
      this.listRoom = this.listRoom.map((el) => {
        el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
        return el;
      });
    },
    roomStatusSelect(val) {
      this.listRoom = this.getByRomStatus(val.id);
      this.listRoom = this.listRoom.map((el) => {
        el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
        return el;
      });
    },
  },
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapGetters("rooms", ["getByRomStatus", "getByRoomType"]),
  },
  methods: {
    ...mapActions("rooms", ["getAllRooms", "addRoom", "removeRoom"]),
    ...mapActions("roomType", ["getAllRoomType"]),
    saveAddRoom() {
      this.dialogLoading = true;
      const data = {
        ...this.newRoom,
        roomStatus: 1,
      };
      this.addRoom(data)
        .then(() => {
          this.$toast.success("Add room successfully");
          this.dialogAdd = false;
          this.newRoom = Object.assign({}, this.defaultNewRoom);
        })
        .catch((err) => {
          this.$toast.error(err.data.message);
        })
        .finally(() => {
          this.dialogLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.rooms {
  border: 1px solid #9e9e9ea3;
  border-radius: 22px;
}
</style>
