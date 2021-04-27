<template>
  <v-dialog v-model="checkDialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        {{ title }}
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
                  :rules="[(v) => !!v || 'Email not require']"
                  label="Email"
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
  name: "vAddRoom",
  props: {
    dialog: Boolean,
    room: Object,
    save: Function,
  },
  data: () => ({
    title: "Add Room",
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
      this.$emit("sendRoom", this.room);
      this.save();
    },
  },
};
</script>

<style scoped></style>
