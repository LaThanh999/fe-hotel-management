import axios from "@/http/axios";

export default {
  getAllRoomType({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/room-types")
        .then((res) => {
          commit("GET_ROOM_TYPE", res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addRoomType({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/room-types", payload)
        .then((res) => {
          dispatch("getAllRoomType");
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  removeRoomType({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/v1/room-types/${payload}`)
        .then((res) => {
          dispatch("getAllRoomType");
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  getRoomTypeById(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/room-types/${payload}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  editRoomType({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/v1/room-types/${payload.id}`, payload.data)
        .then((res) => {
          dispatch("getAllRoomType");
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};
