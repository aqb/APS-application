import { injectable } from "tsyringe";

import Cliente from "../../Cliente/Cliente";
import ItemEstoque from "../Estoque/ItemEstoque";
import Carrinho from "./Carrinho";
import RegistroCarrinhos from "./RegistroCarrinhos";

@injectable()
class ControladorCarrinho {
  private registroCarrinhos: RegistroCarrinhos;

  constructor(registroCarrinhos: RegistroCarrinhos) {
    this.registroCarrinhos = registroCarrinhos;
  }

  public pegarCarrinho(cliente: Cliente): Carrinho {
    return this.registroCarrinhos.pegarCarrinhoDe(cliente);
  }

  public atualizarCarrinho(
    cliente: Cliente,
    item: ItemEstoque,
    quantidade: number
  ) {
    // Atualiza o carrinho do cliente caso o produto desejado esteja disponivel em estoque.
    if (item.getQuantidade() >= quantidade) {
      const carrinho = this.pegarCarrinho(cliente);
      const produto = item.getProduto();
      this.registroCarrinhos.atualizarCarrinho(carrinho, produto, quantidade);
    }
  }
}

export default ControladorCarrinho;
