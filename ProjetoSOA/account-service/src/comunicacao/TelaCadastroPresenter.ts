import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada";

@injectable()
class TelaCadastroPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public cadastro(req: Request, res: Response) {
    // TODO: Criar um UserProps e passar para a fachada.
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const perfil = req.body.perfil;

    this.fachada.efetuarCadastro(email, senha, cpf, perfil);

    res.status(201).send();
  }
}

export default TelaCadastroPresenter;
