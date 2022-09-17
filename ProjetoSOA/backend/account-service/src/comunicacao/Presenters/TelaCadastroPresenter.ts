import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../../negocio/Fachada";

@injectable()
class TelaCadastroPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public cadastro(req: Request, res: Response) {
    const usuario = req.body.usuario;
    this.fachada.efetuarCadastro(usuario);

    res.status(201).send();
  }
}

export default TelaCadastroPresenter;
