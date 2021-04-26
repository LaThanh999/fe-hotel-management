import state from "../users/moduleUsersState";
import actions from "../users/moduleUsersActions";
import getters from "../users/moduleUsersGetters";
import mutations from "../users/moduleUsersMutations";

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
