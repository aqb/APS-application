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
    this.fachada.efetuarLogin(req.body.email, req.body.senha);
    // Lack the user parameter
    this.fachada.registrarSessao();
    res.status(203);
  }
}

export default TelaLoginPresenter;