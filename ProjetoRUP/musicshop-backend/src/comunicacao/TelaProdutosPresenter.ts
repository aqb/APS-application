import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";

@injectable()
class TelaProdutosPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public pesquisarProdutos(req: Request, res: Response) {
    const nomeFiltro = req.body.nome;
    const itens = this.fachada.pesquisarProdutos(nomeFiltro);
    res.json(itens).send();
  }
}

export default TelaProdutosPresenter;
