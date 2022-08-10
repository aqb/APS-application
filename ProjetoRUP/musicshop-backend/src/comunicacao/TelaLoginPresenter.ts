import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";

@injectable()
class TelaLoginPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public login(req: Request, res: Response) {
    if (this.fachada.efetuarLogin(req.body.email, req.body.senha)) {
      res.status(200).send();
    } else {
      throw new Error("Result not found");
    }
  }
}

export default TelaLoginPresenter;
