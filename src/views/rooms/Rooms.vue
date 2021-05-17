<template>
  <v-container fluid>
    <v-card-title class="text-center justify-center py-6 box-header">
      <span class="title-page mb-4">ROOMS</span>
    </v-card-title>
    <v-row>
      <v-col cols="4" offset="1">
        <v-combobox
          v-model="roomTypeSelect"
          :items="listRoomType"
          label="Room Type"
          item-text="name"
          item-value="id"
        >
        </v-combobox>
      </v-col>
      <v-col cols="4" offset="1">
        <v-combobox
          v-model="roomStatusSelect"
          :items="listRoomStatus"
          label="Room Status"
          item-text="value"
          item-value="id"
        ></v-combobox>
      </v-col>
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
    <div v-show="listRoom.length > 0 && showRooms" class="mt-2 rooms">
      <v-row class="pa-6">
        <v-col v-for="room in listRoom" :key="room.id" cols="4">
          <card-room :room="room"></card-room>
        </v-col>
      </v-row>
    </div>
    <div v-show="listRoom.length == 0 && showRooms" class="mt-4">
      <v-alert border="right" colored-border type="error" elevation="2">
        Not Find Room
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
    showRooms: false,
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
    this.showRooms = true;
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
      if (this.roomStatusSelect.id == 0 || !this.roomStatusSelect) {
        this.listRoom = this.getByRoomType(val.id);
      } else {
        this.listRoom = this.getByRoomTypeAndStatus(
          val.id,
          this.roomStatusSelect.id
        );
      }
      this.listRoom = this.listRoom.map((el) => {
        el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
        return el;
      });
    },
    roomStatusSelect(val) {
      if (this.roomTypeSelect.id == 0 || !this.roomTypeSelect) {
        this.listRoom = this.getByRomStatus(val.id);
      } else {
        this.listRoom = this.getByRoomTypeAndStatus(
          this.roomTypeSelect.id,
          val.id
        );
      }
      this.listRoom = this.listRoom.map((el) => {
        el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
        return el;
      });
    },
  },
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapGetters("rooms", [
      "getByRomStatus",
      "getByRoomType",
      "getByRoomTypeAndStatus",
    ]),
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
