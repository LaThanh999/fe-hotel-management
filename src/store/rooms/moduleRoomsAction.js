import axios from "@/http/axios";

export default {
  getAllRooms({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/rooms")
        .then((res) => {
          console.log(res)
          commit("GET_ROOMS", res.data.rooms);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
