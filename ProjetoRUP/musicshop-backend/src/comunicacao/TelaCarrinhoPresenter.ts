import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada";

@injectable()
class TelaCarrinhoPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public pegarCarrinho(req: Request, res: Response) {
    const clienteId = req.body.clienteId;
    const carrinho = this.fachada.pegarCarrinho(clienteId);
    if (carrinho) {
      res.json(carrinho);
    } else {
      throw new Error(
        "Não foi possível encontrar o carrinho do cliente " + clienteId
      );
    }
  }

  public async realizarPedido(req: Request, res: Response) {
    const clienteId = req.body.clienteId;
    const metodoPagamento = req.body.metodoPagamento;
    const infoPagamento = req.body.infoPagamento;

    const response = await this.fachada.realizarPedido(
      clienteId,
      metodoPagamento,
      infoPagamento
    );
    res.json(response);
  }
}

export default TelaCarrinhoPresenter;
