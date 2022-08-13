<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-end" style="padding: 15px 20px">
        <div class="language-chooser">
          <span
            @click="switchLanguage"
            v-bind:class="isLanguageFR"
            data-language="fr"
            class="title is-6 language-option"
            >FR
          </span>
          <span style="padding: 0 5px">|</span>
          <span
            v-on:click="switchLanguage"
            data-language="de"
            v-bind:class="isLanguageDE"
            class="title is-6 language-option"
            >DE
          </span>
        </div>
      </div>
    </nav>
    <div style="min-height: calc(100vh - 100px)">
      <router-view />
    </div>
    <footer class="footer">
      <p style="font-size: 0.7rem; text-align: center">
        Proposé par
        <a href="https://www.pcprofi.ch/">PCProfi Informatique SA</a> ©{{
          currentYear
        }}
      </p>
    </footer>
  </div>
</template>
<script lang="ts">
import { i18n } from "@/locales/i18n";
import Vue from "vue";
import Utils from "@/utils/Utils";
import Component from "vue-class-component";
import Global from "@/utils/Global";
import { UserType } from "@/Types/UserType";

@Component({})
export default class PcpLayout extends Vue {
  title: string;

  constructor() {
    super();
    this.title = "No title";
  }

  get isLanguageFR() {
    return {
      "language-selected": this.$i18n.locale === "fr",
    };
  }

  get currentYear() {
    const now = new Date();
    return now.getFullYear();
  }

  get userAcronym() {
    const user: UserType | undefined = this.$store.getters.user;
    return user ? Utils.buildAcronym(user.firstname, user.lastname) : "-";
  }
  get isLanguageDE() {
    return {
      "language-selected": this.$i18n.locale === "de",
    };
  }

  switchLanguage(e: any) {
    if (e.target) {
      i18n.locale = e.target.dataset.language;
    }
  }

  switchSite(newSiteKey: string) {
    Global.instanceAxios
      .post("/users/switch-site", { newSiteKey })
      .then(({ data: response }) => {
        if (response.success) {
          //Peut etre temporaire
          this.$store
            .dispatch("switchSite", response.data.newToken)
            .then(() => {
              window.location.reload();
            });
        }
      });
  }

  onUpdateTitle(newTitle: string) {
    this.title = newTitle;
  }

  tryLogout() {
    const self = this;
    this.$store
      .dispatch("logout")
      .then(() => {
        self.$router.push({ name: "login" });
      })
      .catch(() => {
        Utils.toastError(
          self,
          "Une erreur est survenue en essayant de se déconnecter"
        );
      });
  }
}
</script>
<style scoped lang="scss">
.language-option:hover,
.language-selected {
  color: $secondary;
}

.language-option {
  cursor: pointer;
}

footer {
  text-align: center;
  width: 100%;
}
</style>
