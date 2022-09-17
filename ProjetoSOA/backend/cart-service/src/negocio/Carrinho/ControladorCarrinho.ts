import { injectable } from "tsyringe";

import { comunicar } from "../../services/comunicar";
import Item from "../Item/Item";
import Usuario from "../Usuario/Usuario";
import Carrinho from "./Carrinho";
import RegistroCarrinhos from "./RegistroCarrinhos";

@injectable()
class ControladorCarrinho {
  private registroCarrinhos: RegistroCarrinhos;

  constructor(registroCarrinhos: RegistroCarrinhos) {
    this.registroCarrinhos = registroCarrinhos;
  }

  public criarCarrinho(cliente: Usuario): Carrinho {
    return this.registroCarrinhos.adicionar(cliente);
  }

  public pegarCarrinhoDe(clienteId: string): Carrinho {
    return this.registroCarrinhos.pegarCarrinhoDe(clienteId);
  }

  public async atualizarCarrinho(
    clienteId: string,
    produtoId: string,
    quantidadeDesejada: number
  ) {
    // Comunicação com o serviço de estoque.
    const res = await comunicar("inventory-service", {
      url: "/item",
      method: "post",
      data: {
        produtoId
      }
    });

    // Atualiza o carrinho.
    try {
      const item = res.data as Item;
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
    } catch (error) {
      throw new Error(
        `Não foi poossível atualizar o carrinho do cliente ${clienteId}`
      );
    }
  }
}

export default ControladorCarrinho;
