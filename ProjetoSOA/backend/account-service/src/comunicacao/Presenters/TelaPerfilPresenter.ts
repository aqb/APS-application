import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../../negocio/Fachada";

@injectable()
class TelaPerfilPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public async me(req: Request, res: Response) {
    const usuario = await this.fachada.me(req.params.authenticatedUserId);

    res.status(200).json({ usuario });
  }
}

export default TelaPerfilPresenter;
