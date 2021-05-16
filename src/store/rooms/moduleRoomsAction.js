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
  getRoomById(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/rooms/${payload}`)
        .then((res) => {
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
        .then((res) => {
          console.log("success");
          dispatch("getAllRooms");
          resolve(res.data);
        })
        .catch((err) => {
          console.log("err");
          reject(err);
        });
    });
  },
  editRoomSelect({ dispatch }, payload) {
    return new Promise((resolve, reject) =>
      axios
        .put(`/api/v1/rooms/${payload.id}`, payload.data)
        .then((res) => {
          dispatch("getAllRooms");
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        })
    );
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
