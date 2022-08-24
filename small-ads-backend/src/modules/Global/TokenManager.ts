import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import {
  ApplicationError,
  ApplicationRequest,
  ApplicationUserSessionToken,
  IntranetReject
} from "../../utils/Types";
import { AuthenticationErrors, GeneralErrors } from "./BackendErrors";
import RequestManager from "./RequestManager";
import Utils from "../../utils/Utils";
import { UserRole } from "../Users/UserRoles";

export default class TokenManager {
  static buildSessionToken(
    expressRequest: Request,
    response: Response,
    next: NextFunction
  ) {
    const request = expressRequest as ApplicationRequest<{
      data: {};
      token: string;
    }>;

    // eslint-disable-next-line no-shadow
    const { data, token } = request.body;
    const rawToken = request.headers["x-user-token"] as string;
    const backendToken = request.headers["x-access-token"] as string;

    //Verification du token d'accès au backend
    if (
      backendToken &&
      config.server.security.backendTokenSecretKey === backendToken
    ) {
      //Vérification si les data sont authentiques
      if (Utils.validateHmacSha256Signature(token, data) || true) {
        if (rawToken) {
          // Décode du token de connexion
          TokenManager.decodeToken(rawToken)
            .then((tokenData: ApplicationUserSessionToken) => {
              request.rawToken = rawToken;
              request.tokenDecryptedData = tokenData;
              request.userRole =
                tokenData.currentUser.role || UserRole.ANONYMOUS_USER;
              request.hasValidToken = true;
              next();
            })
            .catch((error: ApplicationError) => {
              Utils.manageError(error);
              RequestManager.sendResponse(response, {
                success: false,
                error
              });
            });
        } else {
          request.rawToken = "";
          request.hasValidToken = false;
          request.userRole = UserRole.ANONYMOUS_USER;
          next();
        }
      } else {
        return RequestManager.sendResponse(response, {
          success: false,
          error: {
            code: GeneralErrors.PACKET_NOT_AUTHENTIC,
            message: `The packet is not authentic`
          }
        });
      }
    } else {
      return RequestManager.sendResponse(response, {
        success: false,
        error: {
          code: AuthenticationErrors.AUTH_TOKEN_IS_NOT_AUTHENTIC,
          message: `Any valid token was provided`
        }
      });
    }
  }

  /*
   * Fonction qui retourne une promise avec le token décodé
   *
   * Parameter: token string
   * Return: Promise<ApplicationUserSessionToken>
   */

  // eslint-disable-next-line no-shadow
  static decodeToken(token: string): Promise<ApplicationUserSessionToken> {
    return new Promise<ApplicationUserSessionToken>(
      (resolve, reject: IntranetReject) => {
        if (token) {
          jwt.verify(
            token,
            config.server.security.jwtTokenSecretKey,
            (error, decodedToken) => {
              if (error) {
                console.log(error.message);
                if (error.name === "TokenExpiredError") {
                  reject({
                    code: AuthenticationErrors.AUTH_TOKEN_EXPIRED,
                    message: "The provided token is expired"
                  });
                } else {
                  reject({
                    code: AuthenticationErrors.AUTH_TOKEN_IS_NOT_AUTHENTIC,
                    message: "The provided token is not authentic"
                  });
                }
              } else {
                resolve(decodedToken as ApplicationUserSessionToken);
              }
            }
          );
        } else {
          reject({
            code: AuthenticationErrors.AUTH_NO_TOKEN_PROVIDED,
            message: "Any token was provided"
          });
        }
      }
    );
  }
}
