import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioCarrinhos from "../dados/Carrinho/IRepositorioCarrinhos";
import Carrinho from "./Carrinho/Carrinho";
import ControladorCarrinho from "./Carrinho/ControladorCarrinho";
import IFabricaRepositorios from "./IFabricaRepositorios";
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

  public criarCarrinho(cliente: Usuario): Carrinho {
    return this.controladorCarrinho.criarCarrinho(cliente);
  }

  public pegarCarrinho(clienteId: string): Carrinho {
    return this.controladorCarrinho.pegarCarrinhoDe(clienteId);
  }

  public adicionarAoCarrinho(
    clienteId: string,
    produtoId: string,
    quantidadeDesejada: number
  ) {
    this.controladorCarrinho.atualizarCarrinho(
      clienteId,
      produtoId,
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
