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
              <v-col cols="12"> </v-col>
              <v-col cols="12">
                <v-text-field
                  input="email"
                  v-model="user.email"
                  :rules="[(v) => !!v || 'Email not require']"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.password"
                  type="password"
                  :rules="[(v) => !!v || 'Password  not require']"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.confirmPassword"
                  type="password"
                  :rules="[(v) => !!v || 'Confirm Password not require']"
                  label="Confirm Password Type"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user.name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="user.role"
                  :items="listRole"
                  item-value="id"
                  item-text="value"
                  label="Role"
                  :rules="[(v) => !!v || 'Role not require']"
                  required
                ></v-select>
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
import constants from "@/constants/index.js";
const { ROLE } = constants;

export default {
  name: "vAddUser",
  props: {
    dialog: Boolean,
    save: Function,
    user: Object,
  },
  data: () => ({
    title: "Add User",
    checkDialog: false,
    listRole: [],
  }),
  mounted() {
    for (const [value, id] of Object.entries(ROLE)) {
      if (!id || !value) {
        continue;
      }
      this.listRole.push({ id, value });
    }
  },
  computed: {},
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
      this.$emit("sendUser", this.user);
      this.save();
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  border-bottom: 1px solid #3333;
  justify-content: center;
  background: var(--title-modal) !important;
}
</style>
