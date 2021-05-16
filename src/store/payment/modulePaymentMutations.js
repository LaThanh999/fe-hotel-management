export default {
  GET_PAYMENT(state, payload) {
    state.Payments = payload.orders;
  },
};
