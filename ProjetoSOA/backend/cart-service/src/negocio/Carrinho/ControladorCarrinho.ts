import { Console } from "console";

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

  public async criarCarrinho(cliente: Usuario): Promise<Carrinho> {
    return await this.registroCarrinhos.adicionar(cliente);
  }

  public async pegarCarrinhoDe(clienteId: string): Promise<Carrinho> {
    return await this.registroCarrinhos.pegarCarrinhoDe(clienteId);
  }

  public async atualizarCarrinho(
    clienteId: string,
    item: Item,
    quantidadeDesejada: number
  ) {
    // Atualiza o carrinho.
    try {
      const carrinho = await this.registroCarrinhos.pegarCarrinhoDe(clienteId);
      const quantidadeCarrinho = carrinho.getQuantidade(item.getId());
      if (
        item &&
        item.getQuantidade() >= quantidadeCarrinho + quantidadeDesejada
      ) {
        carrinho.adicionarItem(new Item(item.getProduto(), quantidadeDesejada));
        await this.registroCarrinhos.atualizarCarrinho(carrinho);
      } else {
        throw new Error(
          `${item.getProduto().getNome()} nao tem ${
            quantidadeCarrinho + quantidadeDesejada
          } unidades em estoque.`
        );
      }
    } catch (error) {
      throw new Error(
        `Não foi possível atualizar o carrinho do cliente ${clienteId}`
      );
    }
  }
}

export default ControladorCarrinho;
