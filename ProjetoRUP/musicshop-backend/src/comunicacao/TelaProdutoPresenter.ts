import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";

@injectable()
class TelaProdutoPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public adicionarCarrinho(req: Request, res: Response) {
    const cliente = req.body.cliente;
    const item = req.body.item;
    const quantidade = req.body.quantidade;
    this.fachada.adicionarAoCarrinho(cliente, item, quantidade);
    res.status(203);
  }
}

export default TelaProdutoPresenter;
