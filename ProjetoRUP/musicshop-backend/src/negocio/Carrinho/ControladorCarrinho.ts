import { injectable } from "tsyringe";

import RegistroEstoque from "../Estoque/RegistroEstoque";
import Item from "../Item/Item";
import Carrinho from "./Carrinho";
import RegistroCarrinhos from "./RegistroCarrinhos";

@injectable()
class ControladorCarrinho {
  private registroCarrinhos: RegistroCarrinhos;
  private registroEstoque: RegistroEstoque;

  constructor(
    registroCarrinhos: RegistroCarrinhos,
    registroEstoque: RegistroEstoque
  ) {
    this.registroCarrinhos = registroCarrinhos;
    this.registroEstoque = registroEstoque;
  }

  public pegarCarrinhoDe(clienteId: string): Carrinho {
    return this.registroCarrinhos.pegarCarrinhoDe(clienteId);
  }

  public atualizarCarrinho(
    clienteId: string,
    produtoId: string,
    quantidadeDesejada: number
  ) {
    const item = this.registroEstoque.pegarItemPeloId(produtoId);
    const carrinho = this.pegarCarrinhoDe(clienteId);
    const quantidadeCarrinho = carrinho.getQuantidade(produtoId);
    if (
      item &&
      item.getQuantidade() >= quantidadeCarrinho + quantidadeDesejada
    ) {
      carrinho.adicionarItem(new Item(item.getProduto(), quantidadeDesejada));
      this.registroCarrinhos.atualizarCarrinho(carrinho);
    } else {
      throw new Error(
        `${item.getProduto().getNome()} nao tem ${
          quantidadeCarrinho + quantidadeDesejada
        } unidades em estoque.`
      );
    }
  }
}

export default ControladorCarrinho;
