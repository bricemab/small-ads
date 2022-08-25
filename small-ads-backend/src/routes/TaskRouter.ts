import { Response, Router } from "express";
// @ts-ignore
import fetch from "node-fetch";
import { ApplicationRequest } from "../utils/Types";
import RequestManager from "../modules/Global/RequestManager";
import {
  AuthenticationErrors,
  GeneralErrors,
  TaskErrors
} from "../modules/Global/BackendErrors";
import AclManager from "../permissions/AclManager";
import { Permissions } from "../permissions/permissions";
import TasksManager from "../modules/Tasks/TasksManager";

const TasksRouter = Router();

TasksRouter.post(
  "/list",
  AclManager.routerHasPermission(Permissions.tasksManager.list),
  RequestManager.asyncResolver(
    async (
      request: ApplicationRequest<{
        token: string;
      }>,
      response: Response
    ) => {
      if (!request.userRole) {
        return RequestManager.sendResponse(response, {
          success: false,
          error: {
            code: AuthenticationErrors.ACCESS_NOT_AUTHORIZED,
            message:
              "You must provide an user role in order to access this route"
          }
        });
      }
      const { userRole } = request;

      const tasksResponse = await TasksManager.getList();
      if (!tasksResponse.success || !tasksResponse.data) {
        if (
          tasksResponse.error!.code ===
          GeneralErrors.OBJECT_NOT_FOUND_IN_DATABASE
        ) {
          return RequestManager.sendResponse(response, {
            success: true,
            data: {
              tasks: []
            }
          });
        }
        return RequestManager.sendResponse(response, {
          success: false,
          error: {
            code: TaskErrors.ERROR_WHILE_SEARCHING_TASK_IN_DATABASE,
            message: "An error has occurred while retriving user by email"
          }
        });
      }
      const { tasks } = tasksResponse.data;

      return RequestManager.sendResponse(response, {
        success: true,
        data: {
          tasks
        }
      });
    }
  )
);

TasksRouter.post(
  "/detail",
  AclManager.routerHasPermission(Permissions.tasksManager.detail),
  RequestManager.asyncResolver(
    async (
      request: ApplicationRequest<{
        token: string;
        data: {
          id: number;
        };
      }>,
      response: Response
    ) => {
      if (!request.userRole) {
        return RequestManager.sendResponse(response, {
          success: false,
          error: {
            code: AuthenticationErrors.ACCESS_NOT_AUTHORIZED,
            message:
              "You must provide an user role in order to access this route"
          }
        });
      }
      const { userRole } = request;

      if (!request.body.data || !request.body.data.id) {
        return RequestManager.sendResponse(response, {
          success: false,
          error: {
            code: GeneralErrors.INVALID_REQUEST,
            message: "This request is malformated or invalid"
          }
        });
      }

      const { id: taskId } = request.body.data;

      const taskResponse = await TasksManager.findOneById(taskId);
      if (!taskResponse.success || !taskResponse.data) {
        return RequestManager.sendResponse(response, {
          success: false,
          error: {
            code: AuthenticationErrors.ACCESS_NOT_AUTHORIZED,
            message:
              "You must provide an user role in order to access this route"
          }
        });
      }
      const { task } = taskResponse.data;

      return RequestManager.sendResponse(response, {
        success: true,
        data: {
          task
        }
      });
    }
  )
);

export default TasksRouter;
