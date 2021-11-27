<template>
  <div v-if="this.show_new_client_modal">
    <!-- Modal -->
    <div
      class="modal"
      id="newClientModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newClientModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newClientModalLabel">New Client</h5>
          </div>
          <form @submit.prevent="addOrUpdateClient">
            <div class="modal-body">
              <div class="row mb-3">
                <label for="inputName" class="col-sm-2 offset-1 col-form-label"
                  >Name :</label
                >
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="inputName"
                    v-model="client.name"
                    required
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label for="inputEmail" class="col-sm-2 offset-1 col-form-label"
                  >Email :</label
                >
                <div class="col-sm-8">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    v-model="client.email"
                    required
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label for="inputPhone" class="col-sm-2 offset-1 col-form-label"
                  >Phone :</label
                >
                <div class="col-sm-8">
                  <input
                    type="tel"
                    class="form-control"
                    id="inputPhone"
                    v-model="client.phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="055-399-2440"
                    required
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="inputProviders"
                  class="col-sm-2 offset-1 col-form-label"
                  >Providers :</label
                >
                <div class="col-sm-6">
                  <input type="text" class="form-control" ref="inputProviders" />
                </div>
                <button class="btn col-sm-2" onclick="return false;" @click="addProvider()">Add Provider</button>
              </div>
              <div class="row mb-3">
                <ul class="list-group col-sm-6 offset-3">
                  <li class="list-group-item" v-for="provider in providers_list" v-bind:key="provider">
                      <div class="form-check">
                        <input class="form-check-input" v-model="selected_providers" type="checkbox" :value=provider._id >
                        <label class="form-check-label">
                          <div class="row">
                            <div class="col-8 offset-1" v-if="provider_editable == provider._id">
                              <input type="text" class="form-control" :ref=provider._id @keypress="updateProvider($event, provider)"/>
                            </div>
                            <div class="col-8 offset-1" v-else>
                              {{provider.name}}
                            </div>
                            <div class="col-1">
                              <img src="edit.svg" width="18" height="18" @click="editProvider(provider)"/>
                            </div>
                            <div class="col-1">
                              <img src="delete.svg" width="18" height="18" @click="deleteProvider(provider)"/>
                            </div>
                          </div>
                        </label>
                      </div>
                  </li>
              </ul>
              </div>
            </div>
            <template v-if="!this.$store.state.is_edit">
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary m-1"
                  data-dismiss="modal"
                  @click="show_new_client_modal = false"
                >
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary m-1">
                  Add Client
                </button>
              </div>
            </template>
            <template v-else>
              <div class="modal-footer justify-content-between">
                <button
                  id="delete"
                  type="button"
                  class="btn btn-danger"
                  @click="deleteClient(client._id)"
                >
                  Delete Client
                </button>
                <div>
                  <button
                    type="button"
                    class="btn btn-secondary m-1"
                    data-dismiss="modal"
                    @click="show_new_client_modal = false"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary m-1">
                    Save Client
                  </button>
                </div>
              </div>
            </template>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");

export default {
  data: () => {
    return {
      providers_list: [],
      selected_providers: [],
      provider_editable: false,
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_API + "/provider")
      .then((response) => {
        this.providers_list = response.data;
      })
      .catch((err) => console.log("error:", err.message));
  },
  computed: {
    show_new_client_modal: {
      get() {
        return this.$store.state.show_new_client_modal;
      },
      set(value) {
        this.$store.commit("setClientData", {});
        this.$store.commit("setIsEdit", false);
        this.$store.commit("setShowNewClientModal", value);
      },
    },
    client: {
      get() {
        return this.$store.state.client_data;
      },
      set(value) {
        this.$store.commit("setClientData", value);
      },
    },
  },
  methods: {
    addOrUpdateClient() {
      if (!this.$store.state.is_edit) {
        axios
          .post(process.env.VUE_APP_API + "/client", null, {
            params: this.client,
          })
          .then(() => {
            this.show_new_client_modal = false;
          })
          .catch((err) => console.log("error:", err.message));
      } else {
        delete this.client["providers"];
        axios
          .patch(process.env.VUE_APP_API + "/client/" + this.client._id, null, {
            params: this.client,
          })
          .catch((err) => console.log("error:", err.message));

        if (this.selected_providers.length != 0) {
          this.selected_providers.forEach((provider) => {
            axios
              .post(process.env.VUE_APP_API + "/client/attach", null, {
                params: {
                  client_id: this.client._id,
                  provider_id: provider,
                },
              })
              .then(() => {
                this.show_new_client_modal = false;
              })
              .catch((err) => console.log("error:", err.message));
          });
        }
      }
    },
    deleteClient(client_id) {
      axios
        .delete(process.env.VUE_APP_API + "/client/" + client_id)
        .then(() => (this.show_new_client_modal = false))
        .catch((err) => console.log("error:", err.message));
    },
    addProvider() {
      const name = this.$refs.inputProviders.value;
      if (name == "") return 
      axios
        .post(process.env.VUE_APP_API + "/provider", null, {
          params: {name: name}
        })
        .catch((err) => console.log("error:", err.message));
      axios
        .get(process.env.VUE_APP_API + "/provider")
        .then((response) => {
          this.providers_list = response.data;
        })
        .catch((err) => console.log("error:", err.message));
    },
    editProvider(provider) {
      this.provider_editable = provider._id
    },
    deleteProvider(provider) {
      axios
        .delete(process.env.VUE_APP_API + "/provider/" + provider._id)
        .then(() => {
          this.providers_list.pop(provider);
        })
        .catch((err) => console.log("error:", err.message));
    },
    updateProvider($event, provider){
      if ($event.key == "Enter"){
        axios
          .patch(process.env.VUE_APP_API + "/provider/" + provider._id, null,{
            params: {name: this.$refs[provider._id].value}
          })
          .then(() => this.provider_editable = null)
          .catch((err) => console.log("error:", err.message));
        
        axios
          .get(process.env.VUE_APP_API + "/provider")
          .then((response) => {
            this.providers_list = response.data;
          })
          .catch((err) => console.log("error:", err.message));
      }
    }
  },
  watch: {
    show_new_client_modal(show_new_client_modal) {
      this.selected_providers = [];
      if (show_new_client_modal){
        if (this.client.providers != null){
          this.client.providers.forEach((provider) => {
          this.selected_providers.push(provider._id);
        });
        }
      }
    },
  },
};
</script>

<style scoped>
h2 {
  padding: 10px;
}
button:not(#delete) {
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
.modal {
  display: block;
}
#newClientModalLabel {
  color: rgb(0, 122, 153);
  font-weight: bold;
}
.list-group{
    max-height: 200px;
    overflow-y:scroll;
    -webkit-overflow-scrolling: touch;
}
label{
  display: block;
}
</style>
