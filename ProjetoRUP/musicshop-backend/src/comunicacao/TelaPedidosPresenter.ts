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
    const pedidos = this.fachada.pegarPedido(clienteId);
    if (pedidos) {
      res.json(pedidos);
    } else {
      throw new Error("Não foi possível encontrar os pedidos.");
    }
  }
}

export default TelaPedidosPresenter;
