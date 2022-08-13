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
    const cliente = this.fachada.efetuarLogin(req.body.email, req.body.senha);
    if (cliente) {
      const token = this.fachada.registrarSessao(cliente);
      res.json({ token });
    } else {
      throw new Error("Result not found");
    }
  }
}

export default TelaLoginPresenter;
