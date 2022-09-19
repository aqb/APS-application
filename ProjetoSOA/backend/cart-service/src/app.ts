import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { injectable } from "tsyringe";

import consul from "./config/consul";
import routes from "./routes";

@injectable()
class App {
  private server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.discovery();
  }

  private middlewares() {
    this.server.set("trust proxy", true);

    this.server.use(
      cors({
        credentials: true,
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

  private discovery() {
    consul.agent.service.register(
      {
        id: "cart-service",
        name: "cart-service",
        address: "cart-service",
        port: 3333,
        check: {
          http: "http://cart-service:3333/health",
          interval: "10s"
        }
      },
      err => {
        if (err) {
          console.log("Error registering service on Consul");
        }
      }
    );
  }

  public getServer() {
    return this.server;
  }
}

export default App;
