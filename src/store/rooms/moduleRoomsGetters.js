export default {
  getByRomStatus: ({ rooms }) => (id) => {
    if (id === 0) {
      return rooms;
    } else {
      return rooms.filter((el) => el.roomStatus == id);
    }
  },
  getByRoomType: ({ rooms }) => (id) => {
    if (id === 0) {
      return rooms;
    } else {
      return rooms.filter((el) => el.roomTypeId == id);
    }
  },
};
