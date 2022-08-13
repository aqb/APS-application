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

  public pegarItensEstoque(nomeFiltro?: string): ItemEstoque[] {
    return this.repositorioEstoque.pegarItensEstoque(nomeFiltro);
  }

  public pegarItemEstoquePeloId(id: string): ItemEstoque {
    return this.repositorioEstoque.pegarItemEstoquePeloId(id);
  }
}

export default RegistroEstoque;
