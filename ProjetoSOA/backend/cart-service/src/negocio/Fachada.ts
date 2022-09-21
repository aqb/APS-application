import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioCarrinhos from "../dados/Carrinho/IRepositorioCarrinhos";
import { comunicar } from "../services/comunicar";
import Carrinho from "./Carrinho/Carrinho";
import ControladorCarrinho from "./Carrinho/ControladorCarrinho";
import IFabricaRepositorios from "./IFabricaRepositorios";
import Item from "./Item/Item";
import Produto from "./Produto/Produto";
import Usuario from "./Usuario/Usuario";

@injectable()
@singleton()
class Fachada {
  private controladorCarrinho;

  constructor(
    @inject("FabricaRepositorios") fabricaRepositorios: IFabricaRepositorios
  ) {
    container.register<IRepositorioCarrinhos>("RepositorioCarrinhos", {
      useValue: fabricaRepositorios.criarRepositorioCarrinhos()
    });

    this.controladorCarrinho = container.resolve(ControladorCarrinho);
  }

  public async criarCarrinho(cliente: Usuario): Promise<Carrinho> {
    return await this.controladorCarrinho.criarCarrinho(cliente);
  }

  public async pegarCarrinho(clienteId: string): Promise<Carrinho> {
    return await this.controladorCarrinho.pegarCarrinhoDe(clienteId);
  }

  public async adicionarAoCarrinho(
    authenticatedUserId: string,
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

    await this.controladorCarrinho.atualizarCarrinho(
      authenticatedUserId,
      item,
      quantidadeDesejada
    );
  }

  public async realizarPedido(
    clienteId: string,
    metodoPagamento: string,
    infoPagamento: any
  ): Promise<void> {
    // TODO: Implementar comunicação com o serviço de pedido.
  }
}

export default Fachada;
