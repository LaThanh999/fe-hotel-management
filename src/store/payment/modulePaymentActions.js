import axios from "../../http/axios";

export default {
  getAllOrderNotComplete({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/orders/not-complete")
        .then((res) => {
          commit("GET_PAYMENT", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  paymentComplete({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/orders/completed", payload)
        .then((res) => {
          dispatch("getAllOrderNotComplete");
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};
