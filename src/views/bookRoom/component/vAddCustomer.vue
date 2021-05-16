<template>
  <v-form ref="form" lazy-validation>
    <v-container>
      <v-row class="mt-4">
        <v-col cols="6" sm="6" offset="3">
          <v-text-field
            v-model="data.name"
            label="Name Customer"
            outlined
            clearable
            :rules="[(v) => !!v || 'Name  not require']"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" offset="3">
          <v-text-field
            v-model="data.phoneNumber"
            label="Phone Number"
            outlined
            clearable
            :rules="[(v) => !!v || 'Phone Number not require']"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" offset="3">
          <v-text-field
            v-model="data.identityCard"
            label="Identity Card"
            outlined
            clearable
            :rules="[(v) => !!v || 'Identity card not require']"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" offset="3">
          <v-text-field
            type="number"
            :rules="[(v) => !!v || ' Amount People not require']"
            label="Amount People"
            outlined
            required
            min="1"
            v-model="data.amountPeople"
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" offset="3">
          <v-date-time-picker
            v-model="data.checkInDate"
            label="Select CheckOut Date"
          ></v-date-time-picker>
        </v-col>
        <v-col cols="6" sm="6" offset="3">
          <v-date-time-picker
            v-model="data.checkOutDate"
            label="Select CheckOut Date"
          ></v-date-time-picker>
        </v-col>
        <v-col cols="6" sm="6" offset="3">
          <v-textarea
            outlined
            name="input-7-4"
            v-model="data.notes"
            label="Note"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="mt-6">
          <v-room-empty-add
            :data="data"
            :checkValidation="checkValidation"
            :rooms="roomsEmpty"
            @checkBookRoom="checkBookRoom = $event"
          ></v-room-empty-add>
        </v-col>
      </v-row>
      <v-overlay :absolute="true" :value="checkLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
  </v-form>
</template>

<script>
import VDateTimePicker from "../../../components/vDateTimePicker";
import { mapActions, mapGetters, mapState } from "vuex";
import VRoomEmptyAdd from "./vRoomEmptyAdd";
export default {
  name: "vAddCustomer",
  components: { VRoomEmptyAdd, VDateTimePicker },
  data: () => ({
    data: {
      name: "",
      phoneNumber: "",
      identityCard: "",
      checkInDate: "",
      checkOutDate: "",
      amountPeople: null,
      roomId: null,
      notes: "",
    },
    dataDefault: {
      name: "",
      phoneNumber: "",
      identityCard: "",
      checkInDate: "",
      checkOutDate: "",
      amountPeople: null,
      roomId: null,
      notes: "",
    },
    roomsEmpty: [],
    checkLoading: false,
    checkBookRoom: false,
  }),
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapGetters("rooms", ["getByRomStatus"]),
  },
  watch: {
    rooms() {
      this.roomsEmpty = this.getByRomStatus(1);
    },
    checkBookRoom(value) {
      if (value) {
        this.data = Object.assign({}, this.dataDefault);
        this.$refs.form.reset();
      }
    },
  },
  async created() {
    this.checkLoading = true;
    await this.getAllRooms();
    this.roomsEmpty = this.getByRomStatus(1);
    this.checkLoading = false;
  },
  methods: {
    ...mapActions("rooms", ["getAllRooms"]),
    checkValidation() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
      } else {
        return this.$refs.form.validate();
      }
    },
  },
};
</script>

<style scoped></style>
