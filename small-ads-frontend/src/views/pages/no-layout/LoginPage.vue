<template>
  <div class="columns">
    <div class="column is-one-third"></div>
    <div class="column is-one-third">
      <section class="section" style="margin-bottom: 50px">
        <img
          class="block-center logo"
          alt="logo"
          src="../../../assets/default_logo.png"
        />
      </section>
      <form action="">
        <section class="section">
          <b-field
            :label="$t('layoutVSbooks.pages.loginPage.user')"
            custom-class="intranet-field"
            :type="{ 'is-danger': hasError }"
            :message="{ 'Username is not available': hasError }"
          >
            <b-input
              @keyup.native.enter="tryLogin"
              size="is-medium"
              :placeholder="$t('layoutVSbooks.pages.loginPage.username')"
              v-model="usernameValue"
            ></b-input>
          </b-field>
          <b-field
            :label="$t('layoutVSbooks.pages.loginPage.password')"
            :type="{ 'is-danger': hasError }"
            :message="[
              { 'Password is too short': hasError },
              { 'Password must have at least 8 characters': hasError },
            ]"
          >
            <b-input
              size="is-medium"
              @keyup.native.enter="tryLogin"
              v-model="passwordValue"
              placeholder="Mot de passe"
              type="password"
            ></b-input>
          </b-field>
        </section>
        <section class="section">
          <b-button
            class="block-center has-margin-top"
            type="is-primary"
            size="is-medium"
            v-on:click="tryLogin"
            >Connexion
          </b-button>
        </section>
      </form>
      <div class="column"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import config from "@/config/config";
import Utils from "@/utils/Utils";
import { i18n } from "@/locales/i18n";
import { ApplicationError } from "@/Types/GlobalType";

@Component
export default class LoginPage extends Vue {
  hasError = false;
  public usernameValue: string = config.isDevModeEnabled
    ? "brice.mabillard@pcprofi.ch"
    : // ? "staff.pcp@cms-smz.ch"
      "";
  public passwordValue: string = config.isDevModeEnabled ? "1" : "";

  tryLogin() {
    if (this.usernameValue === "" || this.passwordValue === "") {
      Utils.toastError(
        this,
        i18n.t("layoutVSbooks.pages.loginPage.emptyFieldsLogin") as string
      );
    } else {
      const user = {
        email: this.usernameValue,
        password: this.passwordValue,
      };
      const self = this;
      this.$store
        .dispatch("login", user)
        .then((response: any) => {
          if (response.success === true) {
            self.$router.push({ name: "root" }).catch(() => {});
          } else {
            self.$store.dispatch("toastError", response);
          }
        })
        .catch((error: any) => {
          if (error.success === false) {
            self.$store.dispatch("toastError", error);
          }
        });
    }
  }
}
</script>
<style lang="scss">
img.logo {
  width: 300px;
  display: block;
}

.language-selected {
  color: $primary;
}

.section {
  padding: 0;
}
</style>
