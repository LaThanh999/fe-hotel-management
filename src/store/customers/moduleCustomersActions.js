import axios from "@/http/axios";

export default {
  getAllCustomer({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/customers")
        .then((res) => {
          commit("GET_ALL_CUSTOMERS", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  addCustomer({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/customers", payload)
        .then(() => {
          dispatch("getAllCustomer").then((res) => {
            resolve(res.data);
          });
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  removeCustomer({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/v1/customers/${payload}`)
        .then((res) => {
          dispatch("getAllCustomer");
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  getCustomerById(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/customers/${payload}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  editCustomer({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/v1/customers/${payload.id}`, payload.data)
        .then((res) => {
          dispatch("getAllCustomer");
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  checkCustomerByIdentityCard(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/customers/name/${payload}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};
