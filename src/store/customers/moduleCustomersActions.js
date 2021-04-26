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
};
