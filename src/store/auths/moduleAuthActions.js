import axios from "../../http/axios";

export default {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/auth/login", {
          email: payload.username,
          password: payload.password,
        })
        .then((res) => {
          console.log(res.data);
          commit("SET_TOKEN", {
            accessToken: res.data.token,
            refreshToken: res.data.refreshToken,
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};
