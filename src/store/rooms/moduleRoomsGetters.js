export default {
  getByRomStatus: ({ rooms }) => (id) => {
    return rooms.filter((el) => el.roomStatus == id);
  },
};
