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

  public async criarCarrinho(cliente: Usuario): Promise<Carrinho> {
    return await this.controladorCarrinho.criarCarrinho(cliente);
  }

  public async pegarCarrinhoDoCliente(clienteId: string): Promise<Carrinho> {
    return await this.controladorCarrinho.pegarCarrinhoDe(clienteId);
  }

  public async pegarCarrinho(carrinhoId: string): Promise<Carrinho> {
    return await this.controladorCarrinho.pegarCarrinho(carrinhoId);
  }

  public async adicionarAoCarrinho(
    authenticatedUserId: string,
    produtoId: string,
    quantidadeDesejada: number
  ) {
    await this.controladorCarrinho.atualizarCarrinho(
      authenticatedUserId,
      produtoId,
      quantidadeDesejada
    );
  }

  public async limparCarrinho(carrinhoId: string) {
    await this.controladorCarrinho.limparCarrinho(carrinhoId);
  }
}

export default Fachada;
