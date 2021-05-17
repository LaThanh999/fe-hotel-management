import axios from "../../http/axios";

import constants from "@/constants";

const { TOKEN } = constants;

export default {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/auth/login", {
          email: payload.username,
          password: payload.password,
        })
        .then((res) => {
          const { id, email, role } = res.data;
          commit("SET_ME", { id, email, role });
          commit("SET_TOKEN", {
            accessToken: res.data.token,
            refreshToken: res.data.refreshToken,
          });
          resolve(res);
          console.log(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  logout() {
    localStorage.removeItem(TOKEN.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN.REFRESH_TOKEN);
  },
};
