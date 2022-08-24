import { Response, Router } from "express";
// @ts-ignore
import fetch from "node-fetch";
import { ApplicationRequest } from "../utils/Types";
import RequestManager from "../modules/Global/RequestManager";
import {
  AuthenticationErrors,
  GeneralErrors
} from "../modules/Global/BackendErrors";
import AclManager from "../permissions/AclManager";
import { Permissions } from "../permissions/permissions";
import Utils from "../utils/Utils";

const TasksRouter = Router();

/* ============================================================================.
 * ACTIONS DE BASE.
 * =============================================================================.
 */

/*
 * Requete POST qui liste les WebTemplate
 *
 * Parameter: token string
 * Return: WebTemplate[]
 */
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
      const userRole = request.userRole;
      console.log(userRole);

      return RequestManager.sendResponse(response, {
        success: true,
        data: {
          asdf: "asdfasdf"
        }
      });
    }
  )
);

export default TasksRouter;
