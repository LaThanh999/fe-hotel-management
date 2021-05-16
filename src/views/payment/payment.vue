<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6 box-header">
      <span class="title-page mb-4">PAYMENT</span>
    </v-card-title>
    <v-data-table :headers="headers" :items="data" :search="search">
      <template v-slot:item.payment="{ item }">
        <v-btn
          @click="clickPayment(item.id)"
          class="d-flex justify-center align-center"
          title="Payment"
        >
          <v-icon> mdi-cart </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-loading :loading="checkLoading"></v-loading>
    <v-confirm
      :dialog="checkConfirm"
      @changeDialogConfirm="checkConfirm = $event"
      :remove="clickConfirmPayment"
    ></v-confirm>
    <v-form-payment
      :dialog="checkFormPayment"
      :data="dataPayment"
      @changeDialog="checkFormPayment = $event"
    ></v-form-payment>
  </v-card>
</template>

<script>
import VLoading from "../../components/vLoading";
import { mapActions, mapState } from "vuex";
import VConfirm from "../../components/vConfirm";
import VFormPayment from "./component/vFormPayment";
export default {
  name: "payment",
  components: { VFormPayment, VConfirm, VLoading },
  data: () => ({
    search: "",
    headers: [
      { text: "Name", value: "customerInfo.name" },
      { text: "Phone", value: "customerInfo.phoneNumber" },
      { text: "Identity Card", value: "customerInfo.identityCard" },
      { text: "Checkin Date", value: "checkInDate" },
      { text: "Checkout Date", value: "checkOutDate" },
      { text: "Room Number", value: "roomInfo.roomNumber" },
      { text: "Payment", value: "payment" },
    ],
    data: [],
    checkLoading: false,
    checkConfirm: false,
    checkFormPayment: false,
    idPayment: null,
    dataPayment: {},
  }),
  watch: {
    Payments(value) {
      this.data = value.map((el) => ({
        ...el,
        checkInDate: new Date(el.checkInDate).toLocaleString(),
        checkOutDate: new Date(el.checkOutDate).toLocaleString(),
      }));
    },
  },
  async created() {
    this.checkLoading = true;
    await this.getAllOrderNotComplete();
    this.checkLoading = false;
  },
  computed: {
    ...mapState("payment", ["Payments"]),
  },
  methods: {
    ...mapActions("payment", ["getAllOrderNotComplete", "paymentComplete"]),
    clickPayment(item) {
      this.idPayment = item;
      this.checkConfirm = true;
    },
    clickConfirmPayment() {
      this.checkFormPayment = true;
      this.payment(this.idPayment);
    },
    payment(id) {
      this.paymentComplete({ orderId: id })
        .then((res) => {
          this.dataPayment = {
            ...res.order,
            checkInDate: new Date(res.order.checkInDate).toLocaleString(),
            checkOutDate: new Date(res.order.checkOutDate).toLocaleString(),
          };
        })
        .catch((err) => {
          this.dataPayment = {};
          this.$toast.error(err.data.message);
        });
    },
  },
};
</script>

<style scoped></style>
