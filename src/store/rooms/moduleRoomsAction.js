import axios from "@/http/axios";

export default {
  getAllRooms({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/rooms")
        .then((res) => {
          commit("GET_ROOMS", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addRoom({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/rooms", payload)
        .then(() => {
          dispatch("getAllRooms").then((res) => resolve(res));
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  removeRoom({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/v1/rooms/${payload}`)
        .then((res) => {
          dispatch("getAllRooms");
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};
