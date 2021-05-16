<template>
  <v-container>
    <v-form>
      <v-row v-if="!isCustomer" class="mt-4" ref="form" lazy-validation>
        <v-col cols="3" sm="3"></v-col>
        <v-col cols="4" sm="4">
          <v-text-field
            v-model="identityCard"
            type="number"
            :rules="[(v) => !!v || 'Name  not require']"
            required
            label="Identity Card"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="2" sm="2" class="mt-1">
          <v-btn
            @click="checkCustomer(identityCard)"
            :loading="loadingButton"
            elevation="2"
            large
          >
            Check
          </v-btn>
        </v-col>
        <v-col cols="3" sm="3"></v-col>
      </v-row>
      <v-row v-else>
        <v-show-customer :customer="customer"></v-show-customer>
      </v-row>
      <v-rooms-empty
        :dataBookRoom="dataBookRoom"
        :checkIsCustomer="isCustomer"
        :rooms="roomsEmpty"
        @sendDataInput="dataBookRoom = $event"
      ></v-rooms-empty>
    </v-form>
    <v-overlay :absolute="true" :value="checkLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import VRoomsEmpty from "./vRoomsEmpty";
import VShowCustomer from "./vShowCustomer";

export default {
  name: "vInputIdentityCard",
  components: { VShowCustomer, VRoomsEmpty },
  data: () => ({
    checkLoading: false,
    loadingButton: false,
    identityCard: null,
    customer: {},
    isCustomer: false,
    roomsEmpty: [],
    dataBookRoom: {
      amountPeople: null,
      checkInDate: "",
      checkOutDate: "",
      notes: "",
    },
    dataBookRoomDefault: {
      amountPeople: null,
      checkInDate: "",
      checkOutDate: "",
      notes: "",
    },
  }),
  async created() {
    this.checkLoading = true;
    await this.getAllRooms();
    this.roomsEmpty = this.getByRomStatus(1);
    this.checkLoading = false;
  },
  watch: {
    dataBookRoom(value) {
      const data = {
        customerId: this.customer.id,
        roomId: value.roomId,
        checkInDate: new Date(value.checkInDate).toISOString(),
        checkOutDate: new Date(value.checkOutDate).toISOString(),
        amountPeople: value.amountPeople,
        notes: value.notes,
      };
      this.checkLoading = true;
      this.bookRoom(data)
        .then(() => {
          this.$toast.success("Book Room Successfully");
          this.dataBookRoom = Object.assign({}, this.dataBookRoomDefault);
        })
        .catch((err) => {
          this.$toast.error(err.data.message);
        })
        .finally(() => {
          this.checkLoading = false;
        });
    },
  },
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapGetters("rooms", ["getByRomStatus"]),
  },
  methods: {
    ...mapActions("rooms", ["getAllRooms"]),
    ...mapActions("customers", ["checkCustomerByIdentityCard"]),
    ...mapActions("book", ["bookRoom"]),
    checkCustomer(identityCard) {
      this.loadingButton = true;
      this.checkCustomerByIdentityCard(identityCard)
        .then((res) => {
          this.customer = res.data.customer;
          this.isCustomer = true;
        })
        .catch((err) => {
          this.$toast.error(err.data.message);
        })
        .finally(() => {
          this.loadingButton = false;
        });
    },
  },
};
</script>

<style scoped></style>
