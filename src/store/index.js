import Vue from "vue";
import Vuex from "vuex";
import auths from "./auths/moduleAuth";
import rooms from "./rooms/moduleRooms";
import roomType from "./roomType/moduleRoomType";
import users from "./users/moduleUsers";
import customers from "./customers/moduleCustomers";
import book from "./book/moduleBook";
import payment from "./payment/modulePayment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auths,
    rooms,
    roomType,
    users,
    customers,
    book,
    payment,
  },
});
