import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

import auth from "../../config/auth";

@injectable()
class AuthMiddleware {
  public async verify(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ error: "No token provided" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return res.status(401).send({ error: "Token error" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: "Token malformatted" });
    }

    jwt.verify(token, auth.secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({ error: "Token invalid" });
      }

      req.params.authenticatedUserId = decoded.id;
      return next();
    });
  }
}

export default AuthMiddleware;
