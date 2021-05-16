<template>
  <v-dialog v-model="checkDialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="modal title">
        <span class="headline">Payment</span>
      </v-card-title>
      <v-card-text class="px-6 body-payment">
        <v-container>
          <div class="d-flex justify-space-between mt-4">
            <span class="text-payment">Name:</span>
            <span class="value-payment">
              {{ data.customerInfo && data.customerInfo.name }}
            </span>
          </div>
          <div class="d-flex justify-space-between mt-4">
            <span class="text-payment">Phone Number:</span>
            <span class="value-payment">
              {{ data.customerInfo && data.customerInfo.phoneNumber }}
            </span>
          </div>
          <div class="d-flex justify-space-between mt-4">
            <span class="text-payment">Identity Card:</span>
            <span class="value-payment">
              {{ data.customerInfo && data.customerInfo.identityCard }}
            </span>
          </div>
          <div class="d-flex justify-space-between mt-4">
            <span class="text-payment">CheckIn Date:</span>
            <span class="value-payment"> {{ data && data.checkInDate }} </span>
          </div>
          <div class="d-flex justify-space-between mt-4">
            <span class="text-payment">CheckOut Date:</span>
            <span class="value-payment"> {{ data && data.checkOutDate }} </span>
          </div>
          <div class="inline my-4"></div>
          <div class="d-flex justify-space-between mt-4">
            <span class="text-payment">Total:</span>
            <span class="value-payment"> {{ data && data.totalPrice }} $ </span>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions class="payment-footer">
        <v-btn
          style="font-size: 20px"
          large
          color="blue darken-1"
          text
          @click="checkDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "vFormPayment",
  props: {
    dialog: Boolean,
    data: Object,
  },
  data: () => ({
    checkDialog: false,
  }),
  watch: {
    dialog(value) {
      this.checkDialog = !!value;
    },
    checkDialog(value) {
      this.$emit("changeDialog", value);
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: center;
  border-bottom-style: dashed;
  background: #1976d24a;
}
.body-payment {
  background: #82b1ff2b;
  .text-payment {
    font-size: 20px;
    color: #424242d6;
    font-family: monospace;
    font-weight: bold;
  }
  .value-payment {
    font-size: 20px;
    color: #424242d6;
    font-family: cursive;
    font-weight: bold;
  }
  .inline {
    border-bottom: 1px solid #3333;
  }
}
.payment-footer {
  background: #82b1ff2b;
  display: flex;
  justify-content: center;
}
</style>
