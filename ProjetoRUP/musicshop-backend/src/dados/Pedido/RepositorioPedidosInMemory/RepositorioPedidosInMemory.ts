import { singleton } from "tsyringe";

import Cliente from "../../../negocio/Cliente/Cliente";
import Carrinho from "../../../negocio/Produtos/Carrinho/Carrinho";
import ItemEstoque from "../../../negocio/Produtos/Estoque/ItemEstoque";
import IRepositorioPedidos from "../IRepositorioPedidos";

@singleton()
class RepositorioPedidosInMemory implements IRepositorioPedidos {
  private itens: ItemEstoque[];

  constructor() {
    this.itens = [];
  }

  adicionar(cliente: Cliente, carrinho: Carrinho): void {
    throw new Error("Method not implemented.");
  }
}

export default RepositorioPedidosInMemory;
