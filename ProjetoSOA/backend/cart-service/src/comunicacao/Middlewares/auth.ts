import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";

import { comunicar } from "../../services/comunicar";

@injectable()
class AuthMiddleware {
  public async verify(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const authenticationResponse = await comunicar("account-service", {
      url: "/me",
      headers: { authorization: authHeader || "" },
      validateStatus: status => status < 500
    });

    if (authenticationResponse.status !== 200) {
      return res.status(401).send({ error: "Token invalid" });
    }

    req.params.authenticatedUserId = authenticationResponse.data?.user?.id;
    return next();
  }
}

export default AuthMiddleware;
