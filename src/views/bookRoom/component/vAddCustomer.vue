<template>
  <v-form>
    <v-container>
      <v-row class="mt-4" ref="form" lazy-validation>
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="8" sm="8">
          <v-text-field
            v-model="customer.name"
            label="Name Customer"
            outlined
            clearable
            :rules="[(v) => !!v || 'Name  not require']"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="8" sm="8">
          <v-text-field
            v-model="customer.phoneNumber"
            label="Phone Number"
            outlined
            clearable
            :rules="[(v) => !!v || 'Phone Number not require']"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="8" sm="8">
          <v-text-field
            v-model="customer.identityCard"
            label="Identity Card"
            outlined
            clearable
            :rules="[(v) => !!v || 'Identity card not require']"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="8" sm="8">
          <v-textarea
            outlined
            name="input-7-4"
            v-model="customer.notes"
            label="Note"
          ></v-textarea>
        </v-col>
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="12" sm="12" class="mt-6 d-flex justify-center">
          <v-btn large x-large color="light-blue accent-3">
            Add Customer
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "vAddCustomer",
  data: () => ({
    customer: {
      name: "",
      phoneNumber: "",
      identityCard: "",
      notes: "",
    },
  }),
};
</script>

<style scoped></style>
