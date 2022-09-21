import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../../negocio/Fachada";

@injectable()
class TelaCarrinhoPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public async realizarPedido(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    const carrinhoId = req.body.carrinhoId;
    const metodoPagamento = req.body.metodoPagamento;
    const infoPagamento = req.body.infoPagamento;

    const response = await this.fachada.realizarPedido(
      authHeader || "",
      carrinhoId,
      metodoPagamento,
      infoPagamento
    );
    res.json(response);
  }
}

export default TelaCarrinhoPresenter;
