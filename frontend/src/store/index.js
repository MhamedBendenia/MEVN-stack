import { createStore } from "vuex";

export default createStore({
  state: {
    show_new_client_modal: false,
    client_data: {},
    is_edit: false,
  },
  mutations: {
    setShowNewClientModal(state, value) {
      state.show_new_client_modal = value;
    },
    setClientData(state, value) {
      state.client_data = value;
    },
    setIsEdit(state, value) {
      state.is_edit = value;
    },
  },
  actions: {},
  modules: {},
});
