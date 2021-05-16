<template>
  <v-dialog v-model="checkDialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="modal">
        <span class="headline">Book Room</span>
      </v-card-title>
      <v-card-text class="px-6">
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  :rules="[(v) => !!v || ' Amount People not require']"
                  label="Amount People"
                  outlined
                  required
                  min="1"
                  v-model="dataInput.amountPeople"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-date-time-picker
                  label="Select CheckIn Date"
                  v-model="dataInput.checkInDate"
                >
                </v-date-time-picker>
              </v-col>
              <v-col cols="12">
                <v-date-time-picker
                  label="Select CheckOut Date"
                  v-model="dataInput.checkOutDate"
                >
                </v-date-time-picker>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  name="input-7-4"
                  v-model="dataInput.notes"
                  label="Note"
                ></v-textarea>
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
        <v-btn color="blue darken-1" text @click="clickSave"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VDateTimePicker from "../../../components/vDateTimePicker";
export default {
  name: "vFormBookRoom",
  components: { VDateTimePicker },
  props: {
    dialog: Boolean,
    dataBookRoom: Object,
  },
  data: () => ({
    checkDialog: false,
    dataInput: {},
  }),
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
    dataBookRoom(value) {
      this.dataInput = value;
    },
  },
  methods: {
    clickSave() {
      if (this.$refs.form.validate()) {
        this.$emit("sendDataInput", this.dataInput);
        this.checkDialog = false;
      } else {
        this.$refs.form.validate();
      }
    },
  },
};
</script>

<style scoped></style>
