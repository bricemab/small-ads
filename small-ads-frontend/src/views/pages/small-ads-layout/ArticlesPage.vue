<template>
  <section>
    <b-loading :is-full-page="true" :active.sync="isDataLoading">
      <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin">
      </b-icon>
    </b-loading>
    <div>Page d'articles</div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Utils from "@/utils/Utils";
import { ApplicationError } from "@/Types/GlobalType";
import { ArticleType } from "@/Types/ArticleType";
import AclManager from "@/AclManager";
import { Permission } from "@/permissions";

@Component({})
export default class ArticlesPage extends Vue {
  isDataLoading = true;

  mounted() {
    const self = this;
    // Utils.postEncodedToBackend("/web-templates/list", {})
    //   .then((response) => {
    //     const responseData = response.data;
    //     if (responseData.success) {
    //       this.webTemplatesList = responseData.data.webTemplates;
    //       self.isDataLoading = false;
    //     }
    //   })
    //   .catch((error: ApplicationError) => {
    //     self.isDataLoading = false;
    //     console.error(error);
    //   });
    setTimeout(() => {
      self.isDataLoading = false;
    }, 3000);
  }

  created() {
    this.$emit("updateTitle", "layoutVSbooks.menu.webTemplates");
  }

  checkPermission(permission: string) {
    const { isAllowed } = AclManager.hasUserAccessToPermission(permission);
    return isAllowed;
  }

  get permissions() {
    return Permission;
  }
}
</script>

<style lang="scss" scoped></style>
