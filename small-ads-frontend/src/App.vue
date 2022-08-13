<template>
  <div style="height: 100%">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Global from "./utils/Global";
import Component from "vue-class-component";
import { ClientErrors, ApplicationResponse } from "@/Types/GlobalType";
import Utils from "@/utils/Utils";

@Component
export default class App extends Vue {
  get isLoggedIn() {
    return this.$store.getters.isLoggedIn;
  }

  created() {
    const self = this;
    Global.instanceAxios.interceptors.response.use(
      (response) => response,
      function (err) {
        const error = err.response;

        if (!error) {
          Utils.handleApplicationError(self, {
            code: ClientErrors.AXIOS_NO_RESPONSE,
            message: "The server could'nt be reached",
          });
        } else {
          const responseData: ApplicationResponse<any> = error.data;

          if (error.status !== 200 || !responseData.success) {
            if (responseData.error) {
              Utils.handleApplicationError(self, responseData.error);
            }
          }

          if (
            error.status === 401 &&
            error.config &&
            !error.config.__isRetryRequest
          ) {
            Utils.toastError(self, "Disconnected auto 401");
            return self.$store.dispatch("logout");
          }

          if (
            error.status === 403 &&
            error.config &&
            !error.config.__isRetryRequest
          ) {
            Utils.toastError(self, "auto 403");
            self.$router.push({ name: "unauthorized" });
          }
        }
        return error;
      }
    );
  }
}
</script>
<style lang="scss">
@import "./styles/App";
</style>
