export default {
  GET_ALL_CUSTOMERS(state, payload) {
    return (state.customers = payload.customers);
  },
};
