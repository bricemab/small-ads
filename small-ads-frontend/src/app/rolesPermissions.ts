import { Permissions } from "./permissions";

export const RolesAllowedPermissions = {
  ANONYMOUS_USER: [
    Permissions.tasksManager.viewList
  ],
  SUPER_ADMIN_USER: [
    Permissions.tasksManager
  ],
  WORKER_USER: [
    Permissions.tasksManager.viewList
  ],
  TASKS_SUPPLIER_USER: [
    Permissions.tasksManager.viewList
  ],
  BOTH_USER: []
};
