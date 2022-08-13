import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import NoLayout from "./views/layouts/NoLayout.vue";

//pages
import LoginPage from "./views/pages/no-layout/LoginPage.vue";
import RegisterPage from "./views/pages/no-layout/RegisterPage.vue";
import NoPermissionPage from "./views/pages/no-layout/NoPermissionPage.vue";
import NotFoundPage from "./views/pages/no-layout/NotFoundPage.vue";
import ArticlesPage from "./views/pages/small-ads-layout/ArticlesPage.vue";
import VSboooksLayout from "@/views/layouts/VSboooksLayout.vue";
import { Permission } from "@/permissions";
import AclManager from "@/AclManager";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Vue.component("App", App),
      children: [
        {
          path: "/authentication",
          component: Vue.component("noLayout", NoLayout),
          children: [
            {
              path: "",
              redirect: "/login",
            },
            {
              path: "redirect",
              name: "root",
              meta: {
                permission: Permission.specialState.redirectToHome,
              },
            },
            {
              path: "login",
              name: "login",
              component: Vue.component("login", LoginPage),
              meta: {
                permission: Permission.specialState.userLoggedOff,
              },
            },
            {
              path: "register",
              name: "register",
              component: Vue.component("register", RegisterPage),
              meta: {
                permission: Permission.specialState.userLoggedOff,
              },
            },
            {
              path: "unauthorized",
              name: "unauthorized",
              component: Vue.component("noPermissionPage", NoPermissionPage),
              meta: {
                permission: Permission.specialState.allowAll,
              },
            },
            {
              path: "*",
              name: "not-found",
              component: Vue.component("NotFoundPage", NotFoundPage),
              meta: {
                permission: Permission.specialState.allowAll,
              },
            },
          ],
        },
        {
          path: "/",
          component: Vue.component("VSboooksLayout", VSboooksLayout),
          children: [
            {
              path: "/articles",
              name: "articles-list",
              component: Vue.component("articlesPage", ArticlesPage),
              meta: {
                permission: Permission.specialState.allowAll,
              },
            },
            {
              path: "/*",
              name: "not-found",
              component: Vue.component("NotFoundPage", NotFoundPage),
              meta: {
                permission: Permission.specialState.allowAll,
              },
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  let { isAllowed, redirectionRoute } = AclManager.hasUserAccessToPermission(
    // @ts-ignore
    to.meta.permission
  );

  if (isAllowed) {
    next();
  } else {
    next(redirectionRoute);
  }
});

export default router;
