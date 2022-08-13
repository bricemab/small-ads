<template>
  <div>
    <section class="main-content">
      <div id="side-menu">
        <div class="logo">
          <img
            class="block-center"
            alt="logo"
            src="../../assets/default_logo.png"
          />
        </div>
        <ul class="menu-list">
          <li v-if="checkPermission(permissions.emailGroupsManager.viewList)">
            <router-link
              to="/administration/email-groups"
              active-class="is-active"
              tag="a"
            >
              <span class="icon"><i class="fa fa-users"></i></span
              >{{ $t("layoutVSbooks.menu.emailGroups") }}
            </router-link>
          </li>
          <li v-if="checkPermission(permissions.webTemplatesManager.viewList)">
            <router-link
              to="/administration/web-templates"
              active-class="is-active"
              tag="a"
            >
              <span class="icon"><i class="fa fa-globe"></i></span
              >{{ $t("layoutVSbooks.menu.webTemplates") }}
            </router-link>
          </li>
          <li v-if="checkPermission(permissions.mailTemplatesManager.viewList)">
            <router-link
              to="/administration/mail-templates"
              active-class="is-active"
              tag="a"
            >
              <span class="icon"><i class="fa fa-envelope"></i></span
              >{{ $t("layoutVSbooks.menu.mailTemplates") }}
            </router-link>
          </li>
          <li v-if="checkPermission(permissions.campaignsManager.viewList)">
            <router-link
              to="/administration/campaigns"
              :active-class="activeClassCampaign"
              tag="a"
            >
              <span class="icon"><i class="fa fa-user-lock"></i></span
              >{{ $t("layoutVSbooks.menu.campaigns") }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="main-container">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-left">
            <p class="nav-title">{{ title }}</p>
          </div>
          <div class="navbar-right">
            <b-dropdown aria-role="list">
              <button class="current-user" slot="trigger">
                {{ userInitial }}
              </button>

              <b-dropdown-item @click="tryLogout" aria-role="listitem"
                >{{ $t("global.logout") }}
              </b-dropdown-item>
            </b-dropdown>

            <div class="language-chooser">
              <span
                @click="switchLanguage"
                v-bind:class="isLanguageFR"
                data-language="fr"
                class="title is-6 language-option"
                >FR</span
              >
              <span style="padding: 0 5px">|</span>
              <span
                v-on:click="switchLanguage"
                data-language="de"
                v-bind:class="isLanguageDE"
                class="title is-6 language-option"
                >DE</span
              >
            </div>
          </div>
          <div class="is-clearfix"></div>
        </nav>
        <div class="main-view">
          <router-view @updateTitle="onUpdateTitle" />
        </div>
        <footer class="footer">
          <p style="font-size: 0.7rem; text-align: center; padding: 10px 0">
            {{ $t("layoutVSbooks.footer.proposedBy") }}
            <a href="https://www.pcprofi.ch/">PCProfi Informatique SA</a> ©{{
              currentYear
            }}
          </p>
        </footer>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { i18n } from "@/locales/i18n";
import Vue from "vue";
import Utils from "@/utils/Utils";
import Component from "vue-class-component";
import config from "@/config/config";
import Global from "@/utils/Global";
import AclManager from "@/AclManager";
import { Permission } from "@/permissions";
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

  get config() {
    return config;
  }

  get userInitial() {
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

  onUpdateTitle(newTitle: string | { title: string; mustTranslate: boolean }) {
    if (typeof newTitle === "string") {
      this.title = i18n.t(newTitle) as string;
    } else {
      this.title = newTitle.title;
    }
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

  checkPermission(permission: string) {
    const { isAllowed } = AclManager.hasUserAccessToPermission(permission);
    return true;
  }

  get permissions() {
    return Permission;
  }

  get activeClassCampaign() {
    console.log(
      this.$route.path === "/administration/campaigns" ||
        this.$route.path.includes("/administration/campaign-result")
    );
    return this.$route.path === "/administration/campaigns" ||
      this.$route.path.includes("/administration/campaign-result")
      ? "is-active"
      : "";
  }
}
</script>
<style scoped lang="scss">
.logo {
  width: 220px;
  margin: 30px auto;
}

.main-content {
  height: 100%;
  width: 100%;
  background: #fcfcfb;
  position: relative;
}

.main-content > #side-menu {
  background: white;
  height: 100%;
  width: 300px !important;
  position: fixed;
  border-right: 1px solid #ebebeb;
}

.main-content > .main-container {
  height: 100%;
  width: calc(100% - 300px);
  right: 0;
  bottom: 20px;
  height: 100%;
  left: 300px;
  top: 0;
  position: absolute;
  padding: 0 20px;
}

.main-view {
  position: relative;
}

.menu-list {
  margin-top: 30px;
}

.navbar {
  border-bottom: 3px $primary solid;
  min-width: 340px;
  background: none;
}

.navbar * {
  color: $dark-grey;
}

.navbar-left {
  float: left;
  width: calc(100% - 160px);
  min-width: 100px;
}

.navbar-right {
  padding: 20px 15px;
  float: right;
  width: 160px;
}

.navbar-right > span {
  line-height: 1rem;
}

.nav-title {
  padding: 5px;
  line-height: 60px;
  font-size: 28px;
  font-family: "Roboto", sans-serif;
}

.language-selected {
  color: $secondary;
}

.language-option:hover,
.language-selected {
  color: $secondary;
}

.menu-list > li > a {
  font-family: "Roboto", sans-serif;
  padding-left: 30px;
  font-size: 0.9rem;
}

.menu-list > li > a > .icon {
  font-size: 1rem;
  margin-right: 15px;
}

.current-user {
  background: $primary;
  margin: -5px 20px;
  border-radius: 50%;
  line-height: 2rem;
  height: 2rem;
  width: 2rem;
  display: block;
  color: white;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  font-size: 0.7rem;
  cursor: pointer;
  border: none;
  outline: none;
}

.language-chooser {
  float: right;
}

.language-option {
  cursor: pointer;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
  padding: 0;
}
</style>
