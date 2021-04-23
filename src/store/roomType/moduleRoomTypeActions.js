import axios from "@/http/axios";

export default {
  getAllRoomType({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/room-types")
        .then((res) => {
          resolve(res);
          commit("GET_ROOM_TYPE", res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
