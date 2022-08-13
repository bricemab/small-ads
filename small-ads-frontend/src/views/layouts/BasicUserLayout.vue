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
          <li>
            <router-link to="/ictvs/home" active-class="is-active" tag="a">
              <span class="icon"><i class="fa fa-home"></i></span
              >{{ $t("layoutICTS.menu.home") }}
            </router-link>
          </li>
          <li>
            <router-link to="/ictvs/students" active-class="is-active" tag="a">
              <span class="icon"><i class="fa fa-chalkboard-teacher"></i></span>
              {{ $t("layoutICTS.menu.students") }}
            </router-link>
          </li>
          <li>
            <router-link to="/ictvs/teachers" active-class="is-active" tag="a">
              <span class="icon"><i class="fa fa-home"></i></span>
              {{ $t("layoutICTS.menu.teachers") }}
            </router-link>
          </li>
          <li>
            <router-link to="/ictvs/classes" active-class="is-active" tag="a">
              <span class="icon"><i class="fa fa-graduation-cap"></i></span>
              {{ $t("layoutICTS.menu.classes") }}
            </router-link>
          </li>
          <li>
            <router-link to="/ictvs/groups" active-class="is-active" tag="a">
              <span class="icon"><i class="fa fa-users"></i></span>
              {{ $t("layoutICTS.menu.groups") }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/ictvs/exam-sessions"
              active-class="is-active"
              tag="a"
            >
              <span class="icon"><i class="fa fa-window-restore"></i></span>
              {{ $t("layoutICTS.menu.session_exam") }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/ictvs/firewall-policies"
              active-class="is-active"
              tag="a"
            >
              <span class="icon"><i class="fa fa-list-ol"></i></span>
              {{ $t("layoutICTS.menu.firewall_policies") }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/ictvs/remote-desktop"
              active-class="is-active"
              tag="a"
            >
              <span class="icon"><i class="fa fa-cloud"></i></span>
              {{ $t("layoutICTS.menu.remote_desktop") }}
            </router-link>
          </li>
          <li>
            <router-link to="/ictvs/help" active-class="is-active" tag="a">
              <span class="icon"><i class="fas fa-question-circle"></i></span>
              {{ $t("layoutICTS.menu.help") }}
            </router-link>
          </li>
          <li>
            <router-link to="/ictvs/system" active-class="is-active" tag="a">
              <span class="icon"><i class="fa fa-cogs"></i></span>
              {{ $t("layoutICTS.menu.system") }}
            </router-link>
            <ul style="display: none">
              <li>
                <router-link to="/ictvs/metas" active-class="is-active" tag="a">
                  {{ $t("layoutICTS.menu.metas") }}
                </router-link>
              </li>
              <li>
                <router-link
                  to="/ictvs/worker"
                  active-class="is-active"
                  tag="a"
                >
                  {{ $t("layoutICTS.menu.worker") }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="main-container">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-start">
            <p class="nav-title">{{ $t(title) }}</p>
          </div>
          <div class="navbar-end">
            <div class="current-user">Ta</div>
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
        </nav>
        <div class="main-view has-margin-top">
          <router-view @updateTitle="onUpdateTitle" />
        </div>
        <footer class="footer">
          <p style="font-size: 0.7rem; text-align: center">
            {{ $t("layoutICTS.footer.proposedBy") }}
            <a href="https://www.pcprofi.ch/">PCProfi Informatique SA</a> ©2019
          </p>
        </footer>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { i18n } from "@/locales/i18n";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      title: "No title",
    };
  },
  computed: {
    isLanguageFR: function () {
      return {
        "language-selected": i18n.locale === "fr",
      };
    },
    isLanguageDE: function () {
      return {
        "language-selected": i18n.locale === "de",
      };
    },
  },
  methods: {
    switchLanguage: (e: any) => {
      if (e.target) {
        i18n.locale = e.target.dataset.language;
      }
    },
    onUpdateTitle(newTitle: string) {
      this.title = newTitle;
    },
  },
});
</script>
<style scoped lang="scss">
.logo {
  width: 220px;
  margin: 30px auto;
}

.main-content {
  min-height: calc(100vh - 50px);
  background: #f3f3f2;
  position: relative;
}

.main-content > #side-menu {
  background: white;
  min-height: calc(100vh);
  width: 300px !important;
  position: fixed;
}

.main-content > .main-container {
  background: white;
  min-height: calc(100vh - 40px);
  width: calc(100% - 300px);
  right: 0;
  top: 0;
  position: absolute;
  padding: 0 20px;
}

.menu-list {
  margin-top: 30px;
}

.navbar {
  background: white;
  border-bottom: 3px $primary solid;
  padding: 30px 25px;
  position: fixed;
  width: calc(100% - 350px);
}

.navbar * {
  color: $dark-grey;
}

.navbar-end {
  padding: 10px 0;
  height: 20px;
}

.navbar-end > span {
  line-height: 1rem;
}

.main-view {
  padding: 20px 0;
  min-height: calc(100vh - 145px);
  margin-top: 95px;
}

.language-selected {
  color: $primary;
}

.language-option:hover,
.language-selected {
  color: $primary;
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
}

.language-option {
  cursor: pointer;
}

footer {
  text-align: center;
  width: 100%;
}
</style>
