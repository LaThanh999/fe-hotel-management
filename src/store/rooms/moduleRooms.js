import state from "../rooms/moduleRoomsState";
import actions from "../rooms/moduleRoomsAction";
import getters from "../rooms/moduleRoomsGetters";
import mutations from "../rooms/moduleRoomsMutations";

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
