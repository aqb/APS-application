import { injectable } from "tsyringe";

import Item from "../Item/Item";
import Produto from "../Produto/Produto";
import Carrinho from "./Carrinho";
import RegistroCarrinhos from "./RegistroCarrinhos";

@injectable()
class ControladorCarrinho {
  private registroCarrinhos: RegistroCarrinhos;

  constructor(registroCarrinhos: RegistroCarrinhos) {
    this.registroCarrinhos = registroCarrinhos;
  }

  public pegarCarrinhoDe(clienteId: string): Carrinho {
    return this.registroCarrinhos.pegarCarrinhoDe(clienteId);
  }

  public atualizarCarrinho(
    clienteId: string,
    produtoId: string,
    quantidadeDesejada: number
  ) {
    // TODO: Implementar comunicação com o serviço de estoque.
    const item = new Item(
      new Produto("1", "Guitarra", "Guitarra de rock", 100),
      13
    );

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
