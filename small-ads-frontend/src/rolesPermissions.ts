import { Permission } from "@/permissions";

export const RolesAllowedPermissions = {
  USER_LOGGED: [
    Permission.emailGroupsManager,
    Permission.campaignsManager,
    Permission.mailTemplatesManager,
    Permission.webTemplatesManager,
  ],
};
