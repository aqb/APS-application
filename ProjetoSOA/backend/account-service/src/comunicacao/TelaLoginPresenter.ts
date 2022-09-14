import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada";

@injectable()
class TelaLoginPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public login(req: Request, res: Response) {
    const usuario = this.fachada.efetuarLogin(req.body.email, req.body.senha);
    if (usuario) {
      const token = this.fachada.registrarSessao(usuario);
      res.json({ token });
    } else {
      throw new Error("Credenciais inválidas");
    }
  }
}

export default TelaLoginPresenter;
