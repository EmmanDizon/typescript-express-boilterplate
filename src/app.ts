import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import Controller from "@/utils/init-controller";
import handleErrorMiddleWare from "./middleware/errors";
import database from "./config/database";
import logger from "./config/logger";

class App {
  public express: Application;

  constructor(public controllers: Controller[], public port: number) {
    this.express = express();

    this.dbConnection();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  private initMiddleware(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(morgan("dev"));
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private async dbConnection(): Promise<void> {
    await database(logger);
  }

  private initErrorHandling(): void {
    this.express.use(handleErrorMiddleWare);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      logger.info(`App listening on port ${this.port}`);
    });
  }
}

export default App;
