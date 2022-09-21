import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../../negocio/Fachada";
import Item from "../../negocio/Item/Item";
import Produto from "../../negocio/Produto/Produto";

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

  public async removerItens(req: Request, res: Response) {
    const itensJSON = req.body.itens;
    const itens = itensJSON.map((item: any): Item => {
      const produto = new Produto(
        item.produto.id,
        item.produto.nome,
        item.produto.descricao,
        item.produto.valor
      );
      return new Item(produto, item.quantidade);
    });

    await this.fachada.removerItensEstoque(itens);
    res.status(201).send();
  }

  public async devolverItens(req: Request, res: Response) {
    const itensJSON = req.body.itens;
    const itens = itensJSON.map((item: any): Item => {
      const produto = new Produto(
        item.produto.id,
        item.produto.nome,
        item.produto.descricao,
        item.produto.valor
      );
      return new Item(produto, item.quantidade);
    });
    try {
      await this.fachada.devolverItensAoEstoque(itens);
      res.status(201).send();
    } catch (error) {
      throw new Error("Não foi possível remover os itens do estoque");
    }
  }
}

export default TelaEstoquePresenter;
