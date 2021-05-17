export default {
  getByRomStatus: ({ rooms }) => (id) => {
    if (id === 0 || !id) {
      return rooms;
    } else {
      return rooms.filter((el) => el.roomStatus == id);
    }
  },
  getByRoomType: ({ rooms }) => (id) => {
    if (id === 0 || !id) {
      return rooms;
    } else {
      return rooms.filter((el) => el.roomTypeId == id);
    }
  },
  getByRoomTypeAndStatus: ({ rooms }) => (id1, id2) => {
    return rooms.filter((el) => el.roomTypeId == id1 && el.roomStatus == id2);
  },
};
