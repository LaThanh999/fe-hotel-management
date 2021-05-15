<template>
  <v-dialog v-model="dialogConfirm" max-width="320">
    <v-card>
      <v-card-title class="headline"> Are you sure about that? </v-card-title>

      <v-card-text> You cannot reverse </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialogConfirm = false">
          Cancel
        </v-btn>

        <v-btn color="green darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "vConfirm",
  props: {
    dialog: Boolean,
    remove: Function,
  },
  data: () => ({
    dialogConfirm: false,
  }),
  watch: {
    dialog(value) {
      this.dialogConfirm = !!value;
    },
    dialogConfirm(value) {
      this.$emit("changeDialogConfirm", value);
    },
  },
  methods: {
    save() {
      this.remove();
      this.dialogConfirm = false;
    },
  },
};
</script>

<style scoped></style>
