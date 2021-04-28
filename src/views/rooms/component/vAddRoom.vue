<template>
  <v-dialog v-model="checkDialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="modal">
        <span class="headline">Add New Room</span>
      </v-card-title>
      <v-card-text class="px-6">
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="room.roomNumber"
                  :rules="[(v) => !!v || 'Room number not require']"
                  label="Room Number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="room.roomTypeId"
                  :items="roomType"
                  :rules="[(v) => !!v || 'Room type not require']"
                  required
                  item-text="name"
                  item-value="id"
                  label="Room Type"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="room.notes" label="Notes"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="checkDialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="clickSave()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "vAddRoom",
  props: {
    dialog: Boolean,
    room: Object,
    save: Function,
  },
  data: () => ({
    checkDialog: false,
  }),
  computed: {
    ...mapState("roomType", ["roomType"]),
  },
  watch: {
    dialog(value) {
      this.checkDialog = value;
    },
    checkDialog(value) {
      this.$emit("changeDialog", value);
      if (!value) {
        this.$refs.form.resetValidation();
      }
    },
  },
  methods: {
    ...mapActions("roomType", ["getAllRoomType"]),
    clickSave() {
      if (this.$refs.form.validate()) {
        this.$emit("sendRoom", this.room);
        this.save();
      }
    },
  },
};
</script>

<style scoped></style>
