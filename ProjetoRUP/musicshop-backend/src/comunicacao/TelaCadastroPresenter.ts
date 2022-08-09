import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";

@injectable()
class TelaCadastroPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public cadastro(req: Request, res: Response) {
    const email = req.body.email;
    const senha = req.body.email;
    const cpf = req.body.cpf;

    this.fachada.efetuarCadastro(email, senha, cpf);

    res.status(201).send();
  }
}

export default TelaCadastroPresenter;
