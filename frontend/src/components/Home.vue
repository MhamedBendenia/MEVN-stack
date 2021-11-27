<template>
  <ClientModal />
  <div class="container">
    <div class="row justify-content-md-center">
      <table class="table caption-top table-bordered">
        <caption id="caption">
          <h2 class="m-3 float-start">Clients</h2>
          <button
            class="btn btn-lg m-3 float-end bg-light"
            @click="showNewClientModal(true)"
          >
            New client
          </button>
        </caption>
        <thead class="table-light">
          <tr>
            <th class="col-md-2">Name</th>
            <th class="col-md-2">Email</th>
            <th class="col-md-2">Phone</th>
            <th class="col-md-4">Providers</th>
            <th class="col-md-1"></th>
            <th class="col-md-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" v-bind:key="client">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <template
                v-for="provider in client.providers"
                v-bind:key="provider"
              >
                {{ provider.name }},
              </template>
            </td>
            <td><a href="#" @click="showEditClient(client._id)">edit</a></td>
            <td><a href="#" @click="deleteClient(client._id)">delete</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import ClientModal from "./ClientModal.vue";

export default {
  components: {
    ClientModal,
  },
  data: () => {
    return {
      clients: null,
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_API + "/client")
      .then((response) => this.clients = response.data)
      .catch((err) => console.log("error:", err.message));
  },
  computed: {
    client_state: {
      get() {
        return this.$store.state.show_new_client_modal;
      },
    },
  },
  methods: {
    showNewClientModal(value) {
      this.$store.commit("setShowNewClientModal", value);
    },
    deleteClient(client_id) {
      axios
        .delete(process.env.VUE_APP_API + "/client/" + client_id)
        .catch((err) => console.log("error:", err.message));
    },
    showEditClient(client_id) {
      axios
        .get(process.env.VUE_APP_API + "/client/" + client_id)
        .then((response) => {
          this.$store.commit("setClientData", response.data);
          this.$store.commit("setIsEdit", true);
          this.showNewClientModal(true);
        })
        .catch((err) => console.log("error:", err.message));
    },
  },
  watch: {
    client_state(client_state) {
      if (!client_state) {
        axios
          .get(process.env.VUE_APP_API + "/client")
          .then((response) => (this.clients = response.data))
          .catch((err) => console.log("error:", err.message));
      }
    },
  },
};
</script>

<style scoped>
h2 {
  padding: 10px;
}
button {
  background-color: #ccc;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 6px;
  color: #000;
  border: none;
}
button:hover {
  box-shadow: 0px 0px 1px #777;
}

#caption {
  background-color: rgb(212, 238, 245);
  color: rgb(0, 122, 153);
  font-weight: bold;
}
</style>
