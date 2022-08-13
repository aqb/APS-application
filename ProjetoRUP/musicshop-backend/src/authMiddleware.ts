import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({ error: "No token provided" });
    return;
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    res.status(401).send({ error: "Token error" });
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).send({ error: "Token malformatted" });
    return;
  }

  const secret = "secret";

  verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    if (decoded) {
      req.body.clienteId = decoded.id;
    }

    return next();
  });
};
