import fs from "fs";
import path from "path";
import fileUpload from "express-fileupload";
import { createPool } from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import { Request, Response } from "express";
import Logger from "./utils/Logger";
import Utils from "./utils/Utils";
import UserRouter from "./routes/UserRouter";
import TasksRouter from "./routes/TaskRouter";
import GlobalStore from "./utils/GlobalStore";
import { GeneralErrors } from "./modules/Global/BackendErrors";
import TokenManager from "./modules/Global/TokenManager";
import config from "./config/config";

const morgan = require("morgan");
const express = require("express");

const app = express();
const setup = async () => {
  Logger.verbose(`Setup started`);
  app.use(
    morgan("combined", {
      stream: fs.createWriteStream(
        path.join(
          __dirname,
          `../logs/http/access_${Utils.generateCurrentDateFileName()}.log`
        ),
        {
          flags: "a"
        }
      )
    })
  );

  app.use(compression());
  app.use(fileUpload());
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cors());
  app.set("trust proxy", 1); // trust first proxy
  app.use(TokenManager.buildSessionToken);

  GlobalStore.addItem("config", config);

  const pool = await createPool({
    host: config.database.host,
    user: config.database.user,
    database: config.database.database,
    password: config.database.password,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
  });

  function keepAlive() {
    pool.getConnection((err, connection) => {
      if (err) {
        return;
      }
      connection.query("SELECT 1", (error, rows) => {
        connection.end();
        if (error) {
          console.log(`QUERY ERROR: ${error}`);
        }
      });
    });
  }

  setInterval(keepAlive, 1000 * 60 * 60);

  const promisePool = await pool.promise();
  GlobalStore.addItem("dbConnection", promisePool);
};
setup()
  .then(() => {
    Logger.verbose(`Setup finish with success`);
    app.use("/users", UserRouter);
    app.use("/tasks", TasksRouter);

    app.get("*", (req: Request, res: Response) => {
      res.json({ state: "Page dont exist" });
    });
    Logger.verbose(`Server starting`);
    app.listen(config.server.port, "0.0.0.0", () => {
      const protocol = config.isDevModeEnabled ? "http" : "http";
      Logger.info(
        `Small ADS BACKEND is now running on ${protocol}://${config.server.hostName}:${config.server.port}`
      );
    });

    app.on("error", (error: any) => {
      Utils.manageError({
        code: GeneralErrors.UNHANDLED_ERROR,
        message: `Error occurred in express: ${error}`
      });
    });
  })
  .catch(error => {
    Logger.warn(`Setup finish with errors`);
    Utils.manageError(error);
  });
