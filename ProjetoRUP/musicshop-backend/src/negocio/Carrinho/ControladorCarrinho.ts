import { injectable } from "tsyringe";

import Cliente from "../Cliente/Cliente";
import RegistroEstoque from "../Estoque/RegistroEstoque";
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
    const itemEstoque = this.registroEstoque.pegarItemEstoquePeloId(produtoId);
    const carrinho = this.pegarCarrinhoDe(clienteId);
    const quantidadeCarrinho = carrinho.getQuantidade(produtoId);
    if (
      itemEstoque &&
      itemEstoque.getQuantidade() >= quantidadeCarrinho + quantidadeDesejada
    ) {
      carrinho.adicionarProduto(itemEstoque.getProduto(), quantidadeDesejada);
      this.registroCarrinhos.atualizarCarrinho(carrinho);
    } else {
      throw new Error(
        `${itemEstoque
          .getProduto()
          .getNome()} nao tem ${quantidadeDesejada} unidades em estoque.`
      );
    }
  }
}

export default ControladorCarrinho;
