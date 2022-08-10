import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";
import ItemEstoque from "../negocio/Produtos/Estoque/ItemEstoque";

@injectable()
class TelaProdutosPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  // TODO: Como retornar os itens?
  // public pesquisarProdutos(req: Request, res: Response): ItemEstoque[] {
  //   const nomeFiltro = req.body.nome;
  //   const itens = this.fachada.pesquisarProdutos(nomeFiltro);
  //   res.json(itens);
  // }
}

export default TelaProdutosPresenter;
