import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { injectable } from "tsyringe";

import routes from "./routes";

@injectable()
class App {
  private server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(
      cors({
        origin: "*"
      })
    );
    this.server.use(cookieParser());
    this.server.use(morgan("dev"));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  private routes() {
    this.server.use(routes);

    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: "Path Not Found" });
    });

    this.server.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({ message: err.message });
      }
    );
  }

  public getServer() {
    return this.server;
  }
}

export default App;
