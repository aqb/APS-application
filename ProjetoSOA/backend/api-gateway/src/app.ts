import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

import { getHost } from "../communication/host";
import services from "../communication/services";

class App {
  private server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.proxies();
  }

  private middlewares() {
    this.server.set("trust proxy", true);

    this.server.use(
      cors({
        credentials: true,
        origin: "*"
      })
    );
    this.server.use(morgan("dev"));
  }

  private proxies() {
    services.forEach(service => {
      this.server.use(
        service.path,
        createProxyMiddleware(service.path, {
          target: service.name,
          pathRewrite: (path: string) => path.replace(service.path, ""),
          changeOrigin: true,
          router: getHost(service.name)
        })
      );
    });

    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: "Path Not Found" });
    });

    this.server.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      }
    );
  }

  public getServer() {
    return this.server;
  }
}

export default App;
