import axios from "@/http/axios";

export default {
  getAllUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/users")
        .then((res) => {
          commit("GET_USERS", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addUser({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/users", payload)
        .then(() => {
          dispatch("getAllUsers").then((response) => {
            resolve(response);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  removeUser({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/v1/users/${payload}`)
        .then((res) => {
          dispatch("getAllUsers");
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};
