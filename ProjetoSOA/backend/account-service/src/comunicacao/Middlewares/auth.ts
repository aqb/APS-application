import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

import auth from "../../config/auth";

@injectable()
class AuthMiddleware {
  public async verify(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies["access-token"];

    if (!token) {
      res.clearCookie("access-token");
      return res.status(401).send({ error: "No token provided" });
    }

    jwt.verify(token, auth.secret, (err: any, decoded: any) => {
      if (err) {
        res.clearCookie("access-token");
        return res.status(401).send({ error: "Token invalid" });
      }

      req.params.authenticatedUserId = decoded.id;
      return next();
    });
  }
}

export default AuthMiddleware;
