import axios from "axios";
const baseURL = "https://hotel-service-2021.herokuapp.com";

const instance = axios.create({
  baseURL,
});

export default instance;
