import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../../negocio/Fachada";

@injectable()
class TelaProdutoPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public adicionarCarrinho(req: Request, res: Response) {
    const clienteId = req.body.clienteId;
    const produtoId = req.body.produtoId;
    const quantidadeDesejada = req.body.quantidade;
    this.fachada.adicionarAoCarrinho(clienteId, produtoId, quantidadeDesejada);
    res.status(201).send();
  }

  public pegarProduto(req: Request, res: Response) {
    const produtoId = req.params.id;
    const item = this.fachada.pegarItemEstoque(produtoId);
    if (item) {
      res.json(item);
    } else {
      throw new Error("Não foi possível encontrar o produto " + produtoId);
    }
  }
}

export default TelaProdutoPresenter;
