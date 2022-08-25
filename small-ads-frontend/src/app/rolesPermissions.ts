import { Permissions } from './permissions';

export const RolesAllowedPermissions = {
  ANONYMOUS_USER: [
    Permissions.tasksManager.list,
    Permissions.tasksManager.detail
  ],
  SUPER_ADMIN_USER: [Permissions.tasksManager],
  WORKER_USER: [Permissions.tasksManager.list],
  TASKS_SUPPLIER_USER: [Permissions.tasksManager.list],
  BOTH_USER: []
};
