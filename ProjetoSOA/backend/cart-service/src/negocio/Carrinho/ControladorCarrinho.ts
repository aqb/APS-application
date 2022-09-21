import { injectable } from "tsyringe";

import Item from "../Item/Item";
import Produto from "../Produto/Produto";
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

  public async pegarCarrinho(carrinhoId: string): Promise<Carrinho> {
    return await this.registroCarrinhos.pegarCarrinho(carrinhoId);
  }

  public async atualizarCarrinho(
    clienteId: string,
    produtoId: string,
    quantidadeDesejada: number
  ) {
    // Comunicação com o serviço de estoque.
    const response = await comunicar("inventory-service", {
      url: "/produto/" + produtoId,
      method: "get",
      data: {
        produtoId,
        quantidadeDesejada
      }
    });
    const data = response.data;
    const produto = new Produto(
      data.produto.id,
      data.produto.nome,
      data.produto.descricao,
      data.produto.valor
    );
    const item = new Item(produto, data.quantidade);

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

  public async limparCarrinho(carrinhoId: string) {
    await this.registroCarrinhos.limparCarrinho(carrinhoId);
  }
}

export default ControladorCarrinho;
