import Vue from "vue";
import { Promise } from "es6-promise";
import Vuex from "vuex";
import JwtDecode from "jwt-decode";
import Global from "@/utils/Global";
import { ApplicationDecryptedToken } from "@/Types/GlobalType";
import { UserType } from "@/Types/UserType";
import Utils from "@/utils/Utils";
const axios = Global.instanceAxios;

Vue.use(Vuex);

const initialState: {
  errorMessage: string;
  status: string;
  token?: string;
  user?: UserType;
  userRole?: string;
} = {
  errorMessage: "",
  status: "",
  token: localStorage.getItem("token") || "",
  user: undefined,
  userRole: undefined,
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    notify_error(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.token;
      state.user = data.user;
      state.userRole = data.user.role || "USER_LOGGED";
    },
    auth_error(state) {
      state.status = "error";
      state.status = "";
      state.token = "";
      state.user = undefined;
      state.userRole = undefined;
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = undefined;
      state.userRole = undefined;
    },
  },
  actions: {
    welcomeBack({ commit }, token) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        if (token) {
          const tokenDecoded: ApplicationDecryptedToken =
            JwtDecode(token) || {};
          if (tokenDecoded.currentUser) {
            axios.defaults.headers.common["x-user-token"] = token;
            axios.defaults.headers.get["x-user-token"] = token;
            commit("auth_success", { token, user: tokenDecoded.currentUser });
            resolve({
              success: true,
              data: tokenDecoded,
            });
          } else {
            commit("auth_error");
            sessionStorage.removeItem("token");
            reject();
          }
        } else {
          commit("auth_error");
          sessionStorage.removeItem("token");
          reject();
        }
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Utils.postEncodedToBackend("/users/authenticate", user)
          .then((response) => {
            const { data } = response.data;
            const { token, role } = data;

            if (data && token) {
              const tokenDecoded: ApplicationDecryptedToken =
                JwtDecode(token) || {};

              if (tokenDecoded.currentUser) {
                tokenDecoded.currentUser.role = role;
                axios.defaults.headers.common["x-user-token"] = token;
                axios.defaults.headers.get["x-user-token"] = token;
                sessionStorage.setItem("token", token);
                commit("auth_success", {
                  token,
                  user: tokenDecoded.currentUser,
                });
                resolve({
                  success: true,
                  data: tokenDecoded,
                });
              } else {
                commit("auth_error");
                sessionStorage.removeItem("token");
                reject();
              }
            } else {
              commit("auth_error");
              sessionStorage.removeItem("token");
              reject();
            }
          })
          .catch(() => {
            commit("auth_error");
            sessionStorage.removeItem("token");
            reject();
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        sessionStorage.removeItem("token");
        delete axios.defaults.headers.common["x-user-token"];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.userRole,
    authStatus: (state) => state.status,
    getRole: (state) => state.userRole,
    user: (state) => state.user,
  },
});
