import { Request, Response } from "express";
import { injectable } from "tsyringe";

import CPF from "../../negocio/CPF/CPF";
import Email from "../../negocio/Email/Email";
import Fachada from "../../negocio/Fachada";
import Senha from "../../negocio/Senha/Senha";
import Usuario from "../../negocio/Usuario/Usuario";

@injectable()
class TelaCadastroPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public async cadastro(req: Request, res: Response) {
    const usuario = req.body.usuario;
    const novoUsuario = new Usuario(
      undefined,
      new Email(usuario.email),
      new Senha(usuario.senha),
      new CPF(usuario.cpf),
      usuario.perfil
    );
    await this.fachada.efetuarCadastro(novoUsuario);
    res.status(201).send();
  }
}

export default TelaCadastroPresenter;
