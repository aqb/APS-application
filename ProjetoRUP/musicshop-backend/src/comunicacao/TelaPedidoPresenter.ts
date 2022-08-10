import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";

@injectable()
class TelaPedidoPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public criarPedido(req: Request, res: Response) {
    this.fachada.criarPedido(req.body.cliente);
    res.status(203);
  }
}

export default TelaPedidoPresenter;
