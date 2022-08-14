import { inject, injectable } from "tsyringe";

import IRepositorioCarrinhos from "../../../dados/Carrinho/IRepositorioCarrinhos";
import Cliente from "../../Cliente/Cliente";
import Carrinho from "./Carrinho";

@injectable()
class RegistroCarrinhos {
  private repositorioCarrinhos;

  constructor(
    @inject("RepositorioCarrinhos") repositorioCarrinhos: IRepositorioCarrinhos
  ) {
    this.repositorioCarrinhos = repositorioCarrinhos;
  }

  public adicionar(cliente: Cliente) {
    this.repositorioCarrinhos.adicionar(cliente.getCarrinho());
  }

  public pegarCarrinhoDe(clienteId: string): Carrinho {
    return this.repositorioCarrinhos.pegarCarrinhoDe(clienteId);
  }

  public atualizarCarrinho(carrinho: Carrinho) {
    this.repositorioCarrinhos.atualizarCarrinho(carrinho);
  }

  public limparCarrinho(clienteId: string) {
    this.repositorioCarrinhos.limparCarrinho(clienteId);
  }
}

export default RegistroCarrinhos;
