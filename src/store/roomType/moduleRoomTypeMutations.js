export default {
  GET_ROOM_TYPE(state, payload) {
    return (state.roomType = payload.data.roomTypes);
  },
};
