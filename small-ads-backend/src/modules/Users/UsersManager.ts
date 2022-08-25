import UserEntity from "./UserEntity";
import { ApplicationResponsePromise } from "../../utils/Types";
import Utils from "../../utils/Utils";
import { DataBaseUser } from "../Global/DatabaseTypes";
import { GeneralErrors } from "../Global/BackendErrors";

export default class UsersManager {
  static async findOneByEmail(
    email: string
  ): ApplicationResponsePromise<{ user: UserEntity }> {
    const userFromDatabase = Utils.castMysqlRecordToObject<DataBaseUser>(
      await Utils.getMysqlPool().execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      )
    );

    if (!userFromDatabase) {
      return {
        success: false,
        error: {
          code: GeneralErrors.OBJECT_NOT_FOUND_IN_DATABASE,
          message: "The account couldn't be found in database",
          details: {
            email
          }
        }
      };
    }

    return {
      success: true,
      data: {
        user: await UserEntity.fromDatabaseObject(userFromDatabase)
      }
    };
  }

  static async findOneById(
    id: number,
    isBypassArchived?: boolean
  ): ApplicationResponsePromise<{ user: UserEntity }> {
    let sql = "SELECT * FROM users WHERE id = ?";

    if (!isBypassArchived) {
      sql += " AND archived = 0";
    }

    const userFromDatabase = Utils.castMysqlRecordToObject<DataBaseUser>(
      await Utils.getMysqlPool().execute(sql, [id])
    );

    if (!userFromDatabase) {
      return {
        success: false,
        error: {
          code: GeneralErrors.OBJECT_NOT_FOUND_IN_DATABASE,
          message: "The account couldn't be found in database",
          details: {
            id
          }
        }
      };
    }

    return {
      success: true,
      data: {
        user: await UserEntity.fromDatabaseObject(userFromDatabase)
      }
    };
  }
}
