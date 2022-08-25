import TaskEntity from "./TaskEntity";
import { ApplicationResponsePromise } from "../../utils/Types";
import Utils from "../../utils/Utils";
import { DataBaseTask } from "../Global/DatabaseTypes";
import { GeneralErrors } from "../Global/BackendErrors";
import UserEntity from "../Users/UserEntity";

export default class TasksManager {
  static async findOneById(
    id: number
  ): ApplicationResponsePromise<{ task: object }> {
    const taskFromDatabase = Utils.castMysqlRecordToObject<DataBaseTask>(
      await Utils.getMysqlPool().execute("SELECT * FROM tasks WHERE id = ?", [
        id
      ])
    );

    if (!taskFromDatabase) {
      return {
        success: false,
        error: {
          code: GeneralErrors.OBJECT_NOT_FOUND_IN_DATABASE,
          message: "The task couldn't be found in database",
          details: {
            id
          }
        }
      };
    }

    const taskObject = await TaskEntity.fromDatabaseObject(taskFromDatabase);
    const task = {
      user: await taskObject.getUser(),
      ...taskObject
    };

    return {
      success: true,
      data: {
        task
      }
    };
  }

  static async getList(): ApplicationResponsePromise<{
    tasks: Array<object>;
  }> {
    const taskFromDatabase = Utils.castMysqlRecordsToArray<DataBaseTask>(
      await Utils.getMysqlPool().execute(
        "SELECT * FROM tasks where archived = 0"
      )
    );

    if (!taskFromDatabase) {
      return {
        success: false,
        error: {
          code: GeneralErrors.OBJECT_NOT_FOUND_IN_DATABASE,
          message: "The tasks couldn't be found in database",
          details: {}
        }
      };
    }

    const tasks = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const value of taskFromDatabase) {
      const taskObject = await TaskEntity.fromDatabaseObject(value);
      const task = {
        user: await taskObject.getUser(),
        ...taskObject
      };
      tasks.push(task);
    }

    return {
      success: true,
      data: {
        tasks
      }
    };
  }
}
