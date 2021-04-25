<template>
  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Rooms</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogAdd" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Add Room
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Room</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newRoom.roomNumber"
                        :rules="[(v) => !!v || 'Room Status not require']"
                        label="Room Number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="newRoom.roomTypeId"
                        :items="listRoomType"
                        item-value="id"
                        item-text="name"
                        label="Room Status"
                        :rules="[(v) => !!v || 'Room Type not require']"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newRoom.notes"
                        :rules="[(v) => !!v || 'Note not require']"
                        label="Note"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogAdd = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveAddRoom(newRoom)">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import constants from "@/constants";
import mapping from "@/constants/mapping.js";
const { ROOM_STATUS_MAPPING } = mapping;

export default {
  name: "manageRooms",
  data: () => ({
    headers: [
      { text: "Room No", value: "roomNumber" },
      { text: "Room Type", value: "nameRoomType" },
      { text: "Room Status", value: "roomStatusMapping" },
      { text: "Amount People", value: "amountPeople", align: "center" },
      { text: "Price", value: "price" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    data: [],
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
    this.data = this.rooms;
    this.data = this.data.map((el) => {
      el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
      return el;
    });
    //console.log(this.getByRomStatus(4));
  },
  watch: {
    dialogAdd(value) {
      if (!value) {
        this.$refs.form.resetValidation();
        this.newRoom = Object.assign({}, this.defaultNewRoom);
      }
    },
    rooms(val) {
      this.data = val;
      this.data = this.data.map((el) => {
        el.roomStatusMapping = ROOM_STATUS_MAPPING[el.roomStatus];
        return el;
      });
    },
  },
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapGetters("rooms", ["getByRomStatus"]),
  },
  methods: {
    ...mapActions("rooms", ["getAllRooms", "addRoom", "removeRoom"]),
    ...mapActions("roomType", ["getAllRoomType"]),
    // add new room
    saveAddRoom(data) {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        data.roomStatus = 1;
        this.addRoom(data)
          .then(() => {
            this.dialogAdd = false;
            this.$toast.success("Add room successfully");
          })
          .catch((err) => {
            this.$toast.error(err.data.message);
          });
      }
    },
  },
};
</script>

<style scoped></style>
