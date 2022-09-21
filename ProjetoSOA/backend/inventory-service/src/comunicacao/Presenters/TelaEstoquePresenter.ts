import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../../negocio/Fachada";

@injectable()
class TelaEstoquePresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public async pegarEstoque(req: Request, res: Response) {
    const nomeFiltro = req.query.nome?.toString();
    const itens = await this.fachada.pegarItensEstoque(nomeFiltro);
    if (itens) {
      res.json(itens);
    } else {
      throw new Error("Não foi possível encontrar o produto " + nomeFiltro);
    }
  }
}

export default TelaEstoquePresenter;
