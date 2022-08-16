import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";

@injectable()
class TelaPedidosPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public pegarPedidos(req: Request, res: Response) {
    const clienteId = req.body.clienteId;
    const pedidos = this.fachada.pegarPedidos(clienteId);
    if (pedidos) {
      res.json(pedidos);
    } else {
      throw new Error("Não foi possível encontrar os pedidos.");
    }
  }

  public pegarPedido(req: Request, res: Response) {
    const pedidoId = req.params.id;
    const pedido = this.fachada.pegarPedido(pedidoId);
    if (pedido) {
      res.json(pedido);
    } else {
      throw new Error(`Não foi possível encontrar o pedido ${pedidoId}.`);
    }
  }
}

export default TelaPedidosPresenter;
