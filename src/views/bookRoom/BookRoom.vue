<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6 box-header">
      <span class="title-page mb-4">BOOK ROOM</span>
    </v-card-title>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat>
          <v-card-text>
            <v-add-customer v-if="tab == 0"></v-add-customer>
            <v-input-identity-card v-if="tab == 1"></v-input-identity-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import VAddCustomer from "./component/vAddCustomer";
import VInputIdentityCard from "./component/vInputIdentityCard";
export default {
  name: "BookRoom",
  components: { VInputIdentityCard, VAddCustomer },
  data: () => ({
    tab: 0,
    items: ["New Customer", "Old Customer"],
  }),
};
</script>

<style lang="scss" scoped></style>
