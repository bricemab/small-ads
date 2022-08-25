import moment, { Moment } from "moment";

import Utils from "../../utils/Utils";
import MysqlAbstractEntity from "../Global/MysqlAbstractEntity";
import { DataBaseTask, DataBaseUser } from "../Global/DatabaseTypes";
import { GeneralErrors } from "../Global/BackendErrors";
import { TaskStatus } from "./TaskStatus";
import UserEntity from "../Users/UserEntity";

export default class TaskEntity extends MysqlAbstractEntity<boolean> {
  public id?: number;
  public title: string;
  public description: string;
  public price: number;
  public time: string;
  public location: string;
  public imageId: number;
  public userId: number;
  public status: TaskStatus;
  public creationDate: Moment;
  public lastModificationDate: Moment;
  public archived: boolean;

  constructor(
    id: number | null,
    title: string,
    description: string,
    status: TaskStatus,
    price: number,
    time: string,
    location: string,
    imageId: number,
    userId: number,
    creationDate: Moment,
    lastModificationDate: Moment,
    archived: boolean
  ) {
    super();
    if (id) {
      this.id = id as number;
    }
    this.title = title;
    this.description = description;
    this.status = status;
    this.price = price;
    this.time = time;
    this.location = location;
    this.imageId = imageId;
    this.userId = userId;
    this.creationDate = creationDate;
    this.lastModificationDate = lastModificationDate;
    this.archived = archived;
  }

  async save() {
    try {
      let responseData;
      if (!this.existsInDataBase) {
        responseData = await Utils.executeMysqlRequest(
          Utils.getMysqlPool().execute(
            "INSERT INTO `tasks` (`title`, `description`, `status`, `price`, `time`, `location`, `image_id`, `user_id`, `creation_date`, `last_modification_date`, `archived`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              this.title,
              this.description,
              this.status,
              this.price,
              this.time,
              this.location,
              this.imageId,
              this.userId,
              this.creationDate,
              this.lastModificationDate,
              this.archived ? "1" : "0"
            ]
          )
        );

        this.id = responseData.insertId;
      } else {
        responseData = await Utils.executeMysqlRequest(
          Utils.getMysqlPool().execute(
            "UPDATE `tasks` SET `title`= ?, `description`= ?, `status`= ?, `price`= ?, `time`= ?, `location`= ?, `image_id`= ?, `user_id`= ?, `creation_date`= ?, `last_modification_date`= ?, `archived`= ? WHERE `id`= ?",
            [
              this.title,
              this.description,
              this.status,
              this.price,
              this.time,
              this.location,
              this.imageId,
              this.userId,
              this.creationDate,
              this.lastModificationDate,
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
            message: "The task has not been persisted in the database"
          }
        };
      }
      return {
        success: true,
        data: {
          task: this
        }
      };
    } catch (e) {
      // @ts-ignore
      Utils.manageError(e);
      return {
        success: false,
        error: {
          code: GeneralErrors.DATABASE_REQUEST_ERROR,
          message: "An error has occurred while saving the TaskEntity"
        }
      };
    }
  }

  static fromDatabaseObject(databaseObject: DataBaseTask) {
    const user = new TaskEntity(
      databaseObject.id,
      databaseObject.title,
      databaseObject.description,
      databaseObject.status,
      databaseObject.price,
      databaseObject.time,
      databaseObject.location,
      databaseObject.image_id,
      databaseObject.user_id,
      moment(databaseObject.creation_date),
      moment(databaseObject.last_modification_date),
      databaseObject.archived
    );
    user.existsInDataBase = true;

    return user;
  }

  async getUser(): Promise<UserEntity | false> {
    const userFromDatabase = Utils.castMysqlRecordToObject<DataBaseUser>(
      await Utils.getMysqlPool().execute("SELECT * FROM users where id = ?", [
        this.userId
      ])
    );

    if (!userFromDatabase) {
      return false;
    }

    return UserEntity.fromDatabaseObject(userFromDatabase);
  }

  toJSON(): Object {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      price: this.price,
      time: this.time,
      location: this.location,
      imageId: this.imageId,
      userId: this.userId,
      creationDate: this.creationDate,
      lastModificationDate: this.lastModificationDate,
      archived: this.archived
    };
  }
}
