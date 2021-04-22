import axios from "axios";
import constants from "@/constants";

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

export default instance;
