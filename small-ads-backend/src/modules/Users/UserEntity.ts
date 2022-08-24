import bcrypt from "bcrypt";
import moment, { Moment } from "moment";

import Utils from "../../utils/Utils";
import MysqlAbstractEntity from "../Global/MysqlAbstractEntity";
import { DataBaseUser } from "../Global/DatabaseTypes";
import { UserRole } from "./UserRoles";
import { GeneralErrors } from "../Global/BackendErrors";

export default class UserEntity extends MysqlAbstractEntity<boolean> {
  public id?: number;
  public email: string;
  public firstname: string;
  public lastname: string;
  public password: string;
  public role: UserRole;
  public archived: boolean;

  constructor(
    id: number | null,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    role: UserRole,
    archived: boolean
  ) {
    super();
    if (id) {
      this.id = id as number;
    }
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.role = role;
    this.archived = archived;
  }

  async validatePassword(password: string) {
    if (password && this.password) {
      return bcrypt.compare(password, this.password as string);
    }

    return false;
  }

  async save() {
    try {
      let responseData;
      if (!this.existsInDataBase) {
        responseData = await Utils.executeMysqlRequest(
          Utils.getMysqlPool().execute(
            "INSERT INTO `target_users` (`email`, `lastname`, `firstname`, `password`, `role`, `archived`) VALUES (?, ?, ?, ?, ?, ?)",
            [
              this.email,
              this.lastname,
              this.firstname,
              this.password,
              this.role,
              this.archived ? "1" : "0"
            ]
          )
        );

        this.id = responseData.insertId;
      } else {
        responseData = await Utils.executeMysqlRequest(
          Utils.getMysqlPool().execute(
            "UPDATE `target_users` SET `email`= ?, `lastname`= ?, `firstname`= ?, `password`= ?, `role`= ?, `archived`= ? WHERE `id`= ?",
            [
              this.email,
              this.lastname,
              this.firstname,
              this.password,
              this.role,
              this.archived ? "1" : "0",
              this.id
            ]
          )
        );
      }
      if (responseData.affectedRows === 0) {
        return {
          success: false,
          error: {
            code: GeneralErrors.DATABASE_REQUEST_ERROR,
            message: "The user has not been persisted in the database"
          }
        };
      }
      return {
        success: true,
        data: {
          targetUser: this
        }
      };
    } catch (e) {
      // @ts-ignore
      Utils.manageError(e);
      return {
        success: false,
        error: {
          code: GeneralErrors.DATABASE_REQUEST_ERROR,
          message: "An error has occurred while saving data"
        }
      };
    }
  }

  static fromDatabaseObject(databaseObject: DataBaseUser) {
    const user = new UserEntity(
      databaseObject.id,
      databaseObject.email,
      databaseObject.firstname,
      databaseObject.lastname,
      databaseObject.password,
      databaseObject.role,
      databaseObject.archived
    );
    user.existsInDataBase = true;

    return user;
  }

  toJSON(): Object {
    return {
      id: this.id,
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      role: this.role,
      archived: this.archived
    };
  }
}
