import constants from "@/constants";

const { TOKEN } = constants;

export default {
  SET_TOKEN(_, payload) {
    localStorage.setItem(TOKEN.ACCESS_TOKEN, payload.accessToken);
    localStorage.setItem(TOKEN.REFRESH_TOKEN, payload.refreshToken);
  },
  SET_ME(_, payload) {
    localStorage.setItem("userInfo", JSON.stringify(payload));
  },
};
