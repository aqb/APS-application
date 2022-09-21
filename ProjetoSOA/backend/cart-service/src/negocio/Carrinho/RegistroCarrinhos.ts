import { inject, injectable } from "tsyringe";

import IRepositorioCarrinhos from "../../dados/Carrinho/IRepositorioCarrinhos";
import Usuario from "../Usuario/Usuario";
import Carrinho from "./Carrinho";

@injectable()
class RegistroCarrinhos {
  private repositorioCarrinhos;

  constructor(
    @inject("RepositorioCarrinhos") repositorioCarrinhos: IRepositorioCarrinhos
  ) {
    this.repositorioCarrinhos = repositorioCarrinhos;
  }

  public async adicionar(cliente: Usuario) {
    return await this.repositorioCarrinhos.adicionar(cliente);
  }

  public async pegarCarrinhoDe(clienteId: string): Promise<Carrinho> {
    return await this.repositorioCarrinhos.pegarCarrinhoDe(clienteId);
  }

  public async pegarCarrinho(carrinhoId: string): Promise<Carrinho> {
    return await this.repositorioCarrinhos.pegarCarrinho(carrinhoId);
  }

  public async atualizarCarrinho(carrinho: Carrinho) {
    await this.repositorioCarrinhos.atualizarCarrinho(carrinho);
  }

  public async limparCarrinho(carrinhoId: string) {
    await this.repositorioCarrinhos.limparCarrinho(carrinhoId);
  }
}

export default RegistroCarrinhos;
