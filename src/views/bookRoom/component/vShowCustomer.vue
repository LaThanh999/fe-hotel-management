<template>
  <v-row class="my-6">
    <v-col cols="6" offset="3" class="border-info">
      <div class="d-flex justify-space-between mx-8 my-4">
        <span class="text-title">Name Customer:</span>
        <span class="text-value">{{ customer.name }}</span>
      </div>
      <div class="d-flex justify-space-between mx-8 my-4">
        <span class="text-title">Phone Number:</span>
        <span class="text-value">{{ customer.phoneNumber }}</span>
      </div>
      <div class="d-flex justify-space-between mx-8 my-4">
        <span class="text-title">Identity Card:</span>
        <span class="text-value">{{ customer.identityCard }}</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "vShowCustomer",
  props: {
    customer: Object,
  },
  created() {
    console.log(this.customer);
  },
};
</script>

<style scoped lang="scss">
.border-info {
  border: 1px solid #333;
  border-radius: 20px;
  .text-title {
    font-size: 20px;
    color: #333;
    font-family: inherit;
  }
  .text-value {
    font-size: 20px;
    color: #333333d1;
    font-family: cursive;
  }
}
</style>
