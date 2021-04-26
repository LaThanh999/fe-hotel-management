<template>
  <v-dialog v-model="checkDialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Add Customer
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="modal">
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text class="px-6">
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :rules="[(v) => !!v || 'Name Room Type not require']"
                  label="Name Room Type"
                  required
                ></v-text-field>
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
export default {
  name: "vAddEditCustomer",
  props: {
    title: String,
    dialog: Boolean,
    save: Function,
    customer: Object,
  },
  data: () => ({
    checkDialog: false,
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
  },
  methods: {
    clickSave() {
      this.$emit("sendCustomer", this.roomType);
      this.save();
    },
  },
};
</script>

<style scoped></style>
