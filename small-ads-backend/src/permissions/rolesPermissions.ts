import { Permissions } from "./permissions";

// eslint-disable-next-line import/prefer-default-export
export const RolesAllowedPermissions = {
  ANONYMOUS_USER: [
    Permissions.tasksManager.list,
    Permissions.tasksManager.detail
  ],
  SUPER_ADMIN_USER: [Permissions.tasksManager],
  WORKER_USER: [Permissions.tasksManager.list, Permissions.tasksManager.detail],
  TASKS_SUPPLIER_USER: [
    Permissions.tasksManager.list,
    Permissions.tasksManager.detail,
    Permissions.tasksManager.add,
    Permissions.tasksManager.edit
  ],
  BOTH_USER: []
};
