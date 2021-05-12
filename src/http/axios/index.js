import axios from "axios";
import constants from "@/constants";
import router from "@/router/index.js";

const baseURL = "https://hotel-service-2021.herokuapp.com";
const { TOKEN } = constants;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN.ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem(TOKEN.ACCESS_TOKEN);
      localStorage.removeItem(TOKEN.REFRESH_TOKEN);
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
