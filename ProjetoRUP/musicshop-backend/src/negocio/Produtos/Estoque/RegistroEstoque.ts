import { inject, injectable } from "tsyringe";

import IRepositorioEstoque from "../../../dados/Estoque/IRepositorioEstoque";
import Produto from "../Produto";
import ItemEstoque from "./ItemEstoque";

@injectable()
class RegistroEstoque {
  private repositorioEstoque;

  constructor(
    @inject("RepositorioEstoque") repositorioEstoque: IRepositorioEstoque
  ) {
    this.repositorioEstoque = repositorioEstoque;
  }

  public adicionar(produto: Produto) {
    this.repositorioEstoque.adicionar(produto);
  }

  public getItensComNome(nome: string): ItemEstoque[] {
    return this.repositorioEstoque.getItensComNome(nome);
  }
}

export default RegistroEstoque;
