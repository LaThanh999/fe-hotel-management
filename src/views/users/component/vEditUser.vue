<template>
  <v-dialog v-model="checkDialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Add Room Type
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
                  v-model="roomType.name"
                  :rules="[(v) => !!v || 'Name Room Type not require']"
                  label="Name Room Type"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="roomType.price"
                  :rules="[(v) => !!v || 'Price not require']"
                  label="Price Room"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="roomType.amountPeople"
                  :rules="[(v) => !!v || 'Amount People not require']"
                  label="Amount People"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="roomType.surchargeRate"
                  :rules="[(v) => !!v || 'Surcharge Rate not require']"
                  label="Surcharge Rate"
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
  name: "vEditUser",
};
</script>

<style scoped></style>
