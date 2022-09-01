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

  public criarPedido(req: Request, res: Response) {
    const clienteId = req.body.clienteId;
    const pedido = this.fachada.criarPedido(clienteId);
    if (pedido) {
      res.json(pedido);
    } else {
      throw new Error("Não foi possível criar o pedido.");
    }
  }

  public async finalizarPedido(req: Request, res: Response) {
    const metodoPagamento = req.body.metodoPagamento;
    const pedidoId = req.body.pedidoId;
    const clienteId = req.body.clienteId;
    const infoPagamento = req.body.infoPagamento;

    const response = await this.fachada.pagar(
      clienteId,
      pedidoId,
      metodoPagamento,
      infoPagamento
    );
    res.json(response);
  }
}

export default TelaCarrinhoPresenter;
