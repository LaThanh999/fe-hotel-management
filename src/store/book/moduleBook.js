import state from "./moduleBookStates";
import actions from "./moduleBookActions";
import getters from "./moduleBookGetters";
import mutations from "./moduleBookMutations";

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
