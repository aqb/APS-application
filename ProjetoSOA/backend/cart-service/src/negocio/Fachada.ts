import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioCarrinhos from "../dados/Carrinho/IRepositorioCarrinhos";
import Carrinho from "./Carrinho/Carrinho";
import ControladorCarrinho from "./Carrinho/ControladorCarrinho";
import IFabricaRepositorios from "./IFabricaRepositorios";
import Item from "./Item/Item";
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
    clienteId: string,
    item: Item,
    quantidadeDesejada: number
  ) {
    await this.controladorCarrinho.atualizarCarrinho(
      clienteId,
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
