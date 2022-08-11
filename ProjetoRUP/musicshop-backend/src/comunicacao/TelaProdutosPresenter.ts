import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";

@injectable()
class TelaProdutosPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public pegarEstoque(req: Request, res: Response) {
    const nomeFiltro = req.query.nome?.toString();
    const itens = this.fachada.pegarItensEstoque(nomeFiltro);
    if (itens) {
      res.json(itens).send();
    } else {
      throw new Error("Não foi possível encontrar o produto " + nomeFiltro);
    }
  }
}

export default TelaProdutosPresenter;
