import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World" });
});

export default routes;
