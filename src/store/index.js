import Vue from "vue";
import Vuex from "vuex";
import auths from "./auths/moduleAuth";
import rooms from "./rooms/moduleRooms";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auths,
    rooms
  },
});
