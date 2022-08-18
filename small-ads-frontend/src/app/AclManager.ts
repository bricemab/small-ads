import { Permissions } from "./permissions";
import { RolesAllowedPermissions } from "./rolesPermissions";
import {LocalStorageService} from "./services/LocalStorage/local-storage.service";
import {Roles} from "./roles";


export default class AclManager {
  public static hasUserAccessToPermission(routeRequiredPermission: string, localStore: LocalStorageService): {
    isAllowed: boolean;
    redirectionRoute: string | undefined;
  } {
    const data = localStore.getData("auth");
    let hasPermission = false;
    let redirectionRoute: string | undefined = "";
    const userRole: string = data.role;
    console.log(data)

    //Les routes spéciales sont gérées à part
    if (
      routeRequiredPermission &&
      routeRequiredPermission.includes("specialState.")
    ) {
      switch (routeRequiredPermission) {
        case Permissions.specialState.redirectToHome:
          hasPermission = false;
          switch (userRole) {
            case Roles.SUPER_ADMIN_USER:
              redirectionRoute = "/admin";
              break;
            default:
              // Error("Unknown role " + userRole + "detected, please specify it");
              redirectionRoute = "/home";
          }

          break;
        case Permissions.specialState.allowAll:
          hasPermission = true;
          break;
        case Permissions.specialState.userLoggedIn:
          if (data.isLoggedIn) {
            hasPermission = true;
          } else {
            redirectionRoute = "/login";
          }
          break;
        case Permissions.specialState.userLoggedOff:
          if (!data.isLoggedIn) {
            hasPermission = true;
          } else {
            redirectionRoute = "/home";
          }
          break;
        default:
          Error("Unkwown special permission, please specify it");
      }
    } else {
      if (RolesAllowedPermissions.hasOwnProperty(userRole)) {
        const userPermissions: (string | Object)[] =
          // @ts-ignore
          RolesAllowedPermissions[userRole];

        userPermissions.forEach((userPermission) => {
          if (typeof userPermission === "object") {
            if (
              Object.values(userPermission).includes(routeRequiredPermission)
            ) {
              hasPermission = true;
            }
          } else {
            if (userPermission === routeRequiredPermission) {
              hasPermission = true;
            }
          }
        });
      } else {
        Error("This role must be declared in permissions");
      }
    }

    console.log({
      isAllowed: hasPermission,
      redirectionRoute,
    })
    return {
      isAllowed: hasPermission,
      redirectionRoute,
    };
  }
}
