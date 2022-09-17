import { Request, Response } from "express";
import { injectable } from "tsyringe";

import auth from "../../config/auth";
import environment from "../../config/environment";
import Email from "../../negocio/Email/Email";
import Fachada from "../../negocio/Fachada";
import Senha from "../../negocio/Senha/Senha";

@injectable()
class TelaLoginPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public async login(req: Request, res: Response) {
    const email = new Email(req.body.email);
    const senha = new Senha(req.body.senha);
    const usuario = this.fachada.efetuarLogin(email, senha);

    if (!usuario) {
      throw new Error("Credenciais inválidas!");
    }

    const token = this.fachada.registrarSessao(usuario);

    res.cookie("access-token", token, {
      httpOnly: true,
      maxAge: 1000 * auth.expiresIn,
      sameSite: environment.isProduction ? "none" : "lax",
      path: "/",
      secure: environment.isProduction
    });

    res.status(200).json({ usuario });
  }
}

export default TelaLoginPresenter;
